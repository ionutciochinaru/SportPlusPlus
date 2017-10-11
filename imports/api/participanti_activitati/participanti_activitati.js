import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const ParticipantiActivitati = new Mongo.Collection('participanti_activitati');
export default ParticipantiActivitati;

ParticipantiActivitati.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

ParticipantiActivitati.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

ParticipantiActivitati.schema = new SimpleSchema({
  idActivitate: {
    type: String,
    label: 'id-ul activitatii'
  },
  idParticipant: {
    type: String,
    label: 'id-ul participantului',
  },
  data: {
    type: Date,
    label: 'Data participare',
  },
});

ParticipantiActivitati.attachSchema(ParticipantiActivitati.schema);
