import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Activitati from './activitati';
import rateLimit from '../../modules/rate-limit.js';

export const adaugaActivitate = new ValidatedMethod({
  name: 'activitati.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    numeActivitate: { type: String },
    descriereActivitate: { type: String, optional: true },
    idadminActivitate: { type: String },
    idOras: { type: String },
    idSport: { type: String },
    anulata: { type: Boolean, optional: true },
    nrmaxParticipanti: { type: Number, optional: true },
    limitaParticipanti: { type: Boolean, optional: true },
    dataActivitate: { type: Date },
    dataActivitateadaugata: {type: Date},
    locatieLat: { type: Number, optional: true },
    locatieLng: { type: Number, optional: true },
  }).validator(),
  run(activitate) {
    return Activitati.upsert({ _id: activitate._id }, { $set: activitate });
  },
});


export const stergeActivitate = new ValidatedMethod({
  name: 'activitati.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Activitati.remove(_id);
  },
});


export const anuleazaActivitate = new ValidatedMethod({
  name: 'activitati.anuleaza',
  validate: new SimpleSchema({
    _id: { type: String },
    anulata: { type: Boolean },
  }).validator(),
  run(activitate) {
    return Activitati.update({ _id: activitate._id }, {
      $set: { anulata: activitate.anulata }
    }, { multi: true });
  },
});

rateLimit({
  methods: [
    adaugaActivitate,
    stergeActivitate,
    anuleazaActivitate,
  ],
  limit: 5,
  timeRange: 1000,
});
