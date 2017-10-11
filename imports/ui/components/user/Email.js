import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import container from '../../../modules/container';

const EmailUser = ({ user }) => ( user ?
    <span>
         <strong>{user.emails[0].address}</strong>
      </span> : ''
);

EmailUser.propTypes = {
  user: PropTypes.object,
};

export default container((props, onData) => {
  const idUser = props.idUser;
  const subscription = Meteor.subscribe('detaliiUser', idUser);

  if (subscription.ready()) {
    let user = Meteor.users.findOne({ _id: idUser });

    onData(null, { user });
  }
}, EmailUser);
