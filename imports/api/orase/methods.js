import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Orase from './Orase';
import rateLimit from '../../modules/rate-limit.js';

export const adaugaOras = new ValidatedMethod({
  name: 'orase.upsert',
  validate: new SimpleSchema({
    nume: { type: String, optional: true },
    link: { type: String, optional: true },
  }).validator(),
  run(orase) {
    return Orase.upsert({ nume: orase.nume }, { $set: orase });
  },
});

/*export const updateOras = new ValidatedMethod({
  name: 'oras.update',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Oras.update(_id);
  },
});*/

rateLimit({
  methods: [
    adaugaOras,
    //updateOras,
  ],
  limit: 5,
  timeRange: 1000,
});
/**
 * Created by ionut on 13.05.2017.
 */
