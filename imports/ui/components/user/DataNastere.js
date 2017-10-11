import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import container from '../../../modules/container';

const DataNastere = ({ user }) => ( user ?
    <span>
         <strong>{user.profile.birthday}</strong>
    </span> : ''
);

DataNastere.propTypes = {
  user: PropTypes.object,
};

export default container((props, onData) => {
  const idUser = props.idUser;
  const subscription = Meteor.subscribe('detaliiUser', idUser);

  if (subscription.ready()) {
    let user = Meteor.users.findOne({ _id: idUser });

    onData(null, { user });
  }
}, DataNastere);
