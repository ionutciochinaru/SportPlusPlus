import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
//import { Factory } from 'meteor/dburles:factory';

const Activitati = new Mongo.Collection('activitati');
export default Activitati;

Activitati.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Activitati.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Activitati.schema = new SimpleSchema({
  numeActivitate: {
    type: String,
    label: 'Numele activitatii',
  },
  descriereActivitate: {
    type: String,
    label: 'Descrierea activitatii',
  },
  idOras: {
    type: String,
    label: 'Orasul ales de utilizator',
  },
  idSport: {
    type: String,
    label: 'Sportul ales de utilizator',
  },
  nrmaxParticipanti: {
    type: Number,
    label: 'Numarul ales de paricipanti dorit',
  },
  limitaParticipanti: {
    type: Boolean,
    label: 'True daca nu are limita de participanti',
  },
  dataActivitate: {
    type: Date,
    label: 'Data de adaugare a activitatii',
  },
  dataActivitateadaugata: {
    type: Date,
    label: 'Data in care a fost adaugata activitatea',
  },
  idadminActivitate: {
    type: String,
    label: 'Id-ul persoanei care a creat activitatea',
  },
  anulata: {
    type: Boolean,
    label: 'Starea activitatii',
  },
  locatieLat: {
    type: Number,
    label: 'Coordonate locatie',
    optional: true
  },
  locatieLng: {
    type: Number,
    label: 'Coordonate locatie',
    optional: true
  },
});

Activitati.attachSchema(Activitati.schema);
