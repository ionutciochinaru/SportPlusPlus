import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Button, OverlayTrigger } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import container from '../../../modules/container';
import VarstaUser from '../../components/user/Varsta';
import OrasUser from '../../components/oras/Nume';

const ParticipantActivitate = ({ participant }) => (
  <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverBottom(participant)}>
    <strong>{participant.profile.name.first} {participant.profile.name.last}</strong>
  </OverlayTrigger>
);

const popoverBottom = (participant) => (
  <Popover id="popover-positioned-bottom" title="Detalii cont">
    Oras: <OrasUser idOras={participant.profile.city} /> <br/><br/>
    Varsta: <VarstaUser dataNastere={participant.profile.birthday} />
  </Popover>
);


ParticipantActivitate.propTypes = {
  participant: PropTypes.object,
};

export default container((props, onData) => {
  const idParticipant = props.idParticipant;

  const subscription = Meteor.subscribe('detaliiUser', idParticipant);
  if (subscription.ready()) {
    let participant = Meteor.users.findOne({ _id: idParticipant });

    onData(null, { participant });
  }

}, ParticipantActivitate);


