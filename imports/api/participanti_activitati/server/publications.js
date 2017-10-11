import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import ParticipantiActivitati from '../participanti_activitati';

Meteor.publish('participanti_activitati.list', () => ParticipantiActivitati.find());

Meteor.publish('participanti_activitati.view', (_id) => {
  check(_id, String);
  return ParticipantiActivitati.find(_id);
});
