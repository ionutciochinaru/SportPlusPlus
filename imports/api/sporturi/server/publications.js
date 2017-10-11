import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Sporturi from '../sporturi';

Meteor.publish('sporturi.list', () => Sporturi.find());

Meteor.publish('sporturi.view', (_id) => {
  check(_id, String);
  return Sporturi.find(_id);
});
