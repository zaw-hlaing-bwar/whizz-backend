import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check, Match } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import { Customer } from '../schema/customer'
import { encrypt } from '../../modules/utils'
import { Roles } from 'meteor/alanning:roles';

SimpleSchema.defineValidationErrorTransform(error => {
    const ddpError = new Meteor.Error(error.message);
    // ddpError.error = 'validation-error';
    // ddpError.details = error.details;
    return ddpError;
  });
  

export function CustomerRgister() {
    try {
        const {
            fullName,
            email,
            deviceToken,
            imei
        } = this.bodyParams;

        if(Customer.findOne({userId: this.userId})) {
            return {
                error: {
                    code: 400,
                    message: 'customer already registered!'
                }
            }
        }
    
        const myMethodObjArgSchema = new SimpleSchema({
            fullName: { type: String },
            deviceToken: { type: String },
            imei: { type: String },
            email: { type: String, regEx: SimpleSchema.RegEx.Email, optional: true },
        }, { check });
    
        myMethodObjArgSchema.validate(this.bodyParams);
        
        Meteor.users.update({ _id: this.userId }, {$set : this.bodyParams});
        
        Roles.addUsersToRoles(this.userId, 'customer');

        Customer.insert({
            userId: this.userId,
            identifications: _.omit(this.bodyParams, ['deviceToken', 'imei']),
            createdAt: new Date()
        })

        return {
            status: true,
            message: 'customer register successful!'
        }
    } catch (error) {
        return {
            error: {
                code: 500,
                message: error.message
            }
        }
    }
}

export function loginUser() {
    try {
        const {
            username,
            password
        } = this.bodyParams;
    
        const myMethodObjArgSchema = new SimpleSchema({
            username: { type: String, min: 9 },
            password: { type: String }
        }, { check });
    
        myMethodObjArgSchema.validate(this.bodyParams);
        if(!ApiPassword.validate(this.bodyParams)) {
            console.log('not success')
            return {
                error: {
                    code: 400,
                    message: 'Username or password is invalid'
                }    
            }
        }

        // destroy older tokens
        Meteor.users.update({ username: username }, {$set : { "services.resume.loginTokens" : [] }});

        // Creates a stamped login token
        let user = Meteor.users.findOne({ username: username }, {
            fields: { _id: 1, email: 1 }
          });
        let stampedLoginToken = Accounts._generateStampedLoginToken();

        /**
         * Hashes the stamped login token and inserts the stamped login token 
         * to the user with the id specified, adds it to the field 
         * services.resume.loginTokens.$.hashedToken. 
         * (you can use Accounts._hashLoginToken(stampedLoginToken.token) 
         * to get the same token that gets inserted)
         */
        Accounts._insertLoginToken(user._id, stampedLoginToken);

        return {
            userId: user._id,
            toekn: stampedLoginToken.token,
            email: user.email
        }
    } catch (error) {
        return {
            error: {
                code: 500,
                message: error.message
            }
        }
    }
}

export function getUser() {
    try {
        return Meteor.users.findOne(this.userId, {
            fields: { services: 0 }
          })
    } catch (error) {
        return {
            error: {
                code: 500,
                message: error.message
            }
        }
    }
}