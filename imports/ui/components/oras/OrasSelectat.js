import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Orase from '../../../api/orase/orase';
import container from '../../../modules/container';

const OrasSelectat = ({numeOras}) => {
  return numeOras ? <span><strong>{numeOras}</strong></span> : '';
};

const getIdOras = () => {
  const user = Meteor.user();
  return user ? `${user.profile.city}` : '';
};

OrasSelectat.propTypes = {
  numeOras: PropTypes.string,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('orase.list');
  if (subscription.ready()) {
    const oras = Orase.findOne({ _id: getIdOras() });

    onData(null, { numeOras: oras.nume });
  }
}, OrasSelectat);

