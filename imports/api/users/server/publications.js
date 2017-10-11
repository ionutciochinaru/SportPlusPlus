import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

const USER_FIELDS = {
  profile: 1
};

Meteor.publish('detaliiUser', function (userId) {
  check(userId, String);

  return Meteor.users.find(userId, { fields: USER_FIELDS });
});
