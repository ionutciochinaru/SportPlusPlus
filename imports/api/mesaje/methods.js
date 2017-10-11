import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Mesaje from './mesaje';
import rateLimit from '../../modules/rate-limit.js';

export const adaugaMesaj = new ValidatedMethod({
  name: 'mesaje.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    mesaj: { type: String },
    idActivitate: { type: String },
    idUser: { type: String },
    data: { type: Date },
  }).validator(),
  run(mesaj) {
    return Mesaje.upsert({ _id: mesaj._id }, { $set: mesaj });
  },
});

rateLimit({
  methods: [
    adaugaMesaj,
  ],
  limit: 50,
  timeRange: 1000,
});
