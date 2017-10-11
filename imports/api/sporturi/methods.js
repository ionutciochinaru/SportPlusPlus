import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Sporturi from './Sporturi';
import rateLimit from '../../modules/rate-limit.js';

export const adaugaSport = new ValidatedMethod({
  name: 'sporturi.upsert',
  validate: new SimpleSchema({
    nume: { type: String, optional: true },
    link: { type: String, optional: true },
     img: { type: String, optional: true },
  }).validator(),
  run(sporturi) {
    return Sporturi.upsert({ nume: sporturi.nume }, { $set: sporturi });
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
    adaugaSport,
    //updateOras,
  ],
  limit: 5,
  timeRange: 1000,
});
/**
 * Created by ionut on 13.05.2017.
 */
