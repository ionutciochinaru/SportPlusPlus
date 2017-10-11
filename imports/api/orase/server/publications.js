import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Orase from '../orase';

Meteor.publish('orase.list', () => Orase.find());

Meteor.publish('orase.view', (_id) => {
  check(_id, String);
  return Orase.find(_id);
});
