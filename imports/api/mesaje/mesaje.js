import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Mesaje = new Mongo.Collection('mesaje');
export default Mesaje;

Mesaje.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Mesaje.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Mesaje.schema = new SimpleSchema({
  mesaj: {
    type: String,
    label: 'Mesaj',
  },
  idActivitate: {
    type: String,
    label: 'Id-ul activitatii.',
  },
  idUser: {
    type: String,
    label: 'Id-ul userului.',
  },
  data: {
    type: Date,
    label: 'Data publicare mesaj.',
  },
});

Mesaje.attachSchema(Mesaje.schema);
