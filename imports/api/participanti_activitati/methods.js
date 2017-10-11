import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import ParticipantiActivitati from './participanti_activitati';
import rateLimit from '../../modules/rate-limit.js';

export const adaugaParticipantActivitate = new ValidatedMethod({
  name: 'participanti_activitati.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    idActivitate: { type: String },
    idParticipant: { type: String },
    data: { type: Date },
  }).validator(),
  run(participantActivitate) {
    return ParticipantiActivitati.upsert({ idActivitate: participantActivitate.idActivitate, idParticipant: participantActivitate.idParticipant }, { $set: participantActivitate });
  },
});

export const stergeParticipantActivitate = new ValidatedMethod({
  name: 'participanti_activitati.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    ParticipantiActivitati.remove(_id);
  },
});

rateLimit({
  methods: [
    adaugaParticipantActivitate,
    stergeParticipantActivitate,
  ],
  limit: 5,
  timeRange: 1000,
});
