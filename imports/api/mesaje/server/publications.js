import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Mesaje from '../mesaje';

Meteor.publish('mesaje.list', () => Mesaje.find());

Meteor.publish('mesaje.view', (_id) => {
  check(_id, String);
  return Mesaje.find(_id);
});
