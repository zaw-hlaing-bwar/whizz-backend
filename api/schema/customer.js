import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class CustomerCollection extends Mongo.Collection {
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

export const identificationSchema = new SimpleSchema({
    fullName: { type: String },
    email: { type: String, regEx: SimpleSchema.RegEx.Email, optional: true }
});

export const customerSchema = new SimpleSchema({
  userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  identifications: { type: identificationSchema, optional: true },
  createdAt: { type: Date, defaultValue: new Date() }
});

export const Customer = new CustomerCollection('customers');
Customer.attachSchema(customerSchema);
