import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Sporturi = new Mongo.Collection('sporturi');
export default Sporturi;

Sporturi.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Sporturi.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Sporturi.schema = new SimpleSchema({
  nume: {
    type: String,
    label: 'Numele sportului.',
  },
  link: {
    type: String,
    label: 'Linkul sportului.',
  },
  img: {
    type: String,
    label: 'Imaginea sportului',
  },
});

Sporturi.attachSchema(Sporturi.schema);

if (Sporturi.find().count() === 0) {
  const sporturi = [
    {
      nume: 'Alergare',
      link: 'alergare',
       img: 'alergare.gif'
    },
    {
      nume: 'Ciclism',
      link: 'ciclism',
       img: 'ciclism.gif'
    },
    {
      nume: 'Fotbal',
      link: 'fotbal',
       img: 'fotbal.gif'
    },
    {
      nume: 'Tenis de camp',
      link: 'tenis-de-camp',
       img: 'tenisdecamp.gif'
    },
    {
      nume: 'Inot',
      link: 'inot',
       img: 'inot.gif'
    },
    {
      nume: 'Baschet',
      link: 'baschet',
       img: 'baschet.gif'
    }
  ];

  sporturi.forEach(({nume, link, img}) => {
    Sporturi.insert({nume, link, img});
  });
}
