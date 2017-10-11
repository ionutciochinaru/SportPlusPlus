import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Orase = new Mongo.Collection('orase');
export default Orase;

Orase.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Orase.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Orase.schema = new SimpleSchema({
  nume: {
    type: String,
    label: 'Numele orasului.',
  },
  link: {
    type: String,
    label: 'Linkul orasului.',
  },
  coordonateLat: {
    type: String,
    label: 'Coordonate harta - latitudine'
  },
  coordonateLng: {
    type: String,
    label: 'Coordonate harta - longitudine'
  }
});

Orase.attachSchema(Orase.schema);

if (Orase.find().count() === 0) {
  const orase = [
    {
      nume: 'Constanta',
      link: 'constanta',
      coordonateLat: '44.175789',
      coordonateLng: '28.635623'
    },
    {
      nume: 'Bucuresti',
      link: 'bucuresti',
      coordonateLat: '44.4379269',
      coordonateLng: '26.024598'
    },
    {
      nume: 'Cluj',
      link: 'cluj',
      coordonateLat: '46.7834818',
      coordonateLng: '23.6165153'
    },
    {
      nume: 'Brasov',
      link: 'brasov',
      coordonateLat: '45.6567549',
      coordonateLng: '25.5866925'
    }
  ];

  orase.forEach(({nume, link, coordonateLat, coordonateLng}) => {
    Orase.insert({nume, link, coordonateLat, coordonateLng});
  });
}
