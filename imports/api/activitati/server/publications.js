import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Activitati from '../activitati';

Meteor.publish('activitati.list', () => Activitati.find());

Meteor.publish('activitati.view', (_id) => {
  check(_id, String);
  return Activitati.find(_id);
});
