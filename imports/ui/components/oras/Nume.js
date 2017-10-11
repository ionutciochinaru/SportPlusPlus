import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Orase from '../../../api/orase/orase';
import container from '../../../modules/container';

const Nume = ({numeOras}) => {
  return numeOras ? <span><strong>{numeOras}</strong></span> : '';
};

Nume.propTypes = {
  numeOras: PropTypes.string,
};

export default container((props, onData) => {
  const idOras = props.idOras;
  const subscription = Meteor.subscribe('orase.list');

  if (subscription.ready()) {
    const oras = Orase.findOne({ _id: idOras });

    onData(null, { numeOras: oras.nume });
  }
}, Nume);

