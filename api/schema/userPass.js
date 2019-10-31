import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class UserPassCollection extends Mongo.Collection {
  insert(doc, callback) {
    return super.insert(doc, callback);
  }
  update(doc, modifier) {
    return super.update(doc, modifier);
  }
  remove(selector) {
    return super.remove(selector);
  }
}

export const userPassSchema = new SimpleSchema({
  userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  pass: { type: String },
  createdAt: { type: Date, defaultValue: new Date() }
});

export const UserPass = new UserPassCollection('user-pass');
UserPass.attachSchema(userPassSchema);
