import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Datetime from 'react-datetime';
import ParticipantiActivitati from '../../../api/participanti_activitati/participanti_activitati';
import container from '../../../modules/container';
import ParticipantActivitate from './ParticipantActivitate';

const ListaParticipanti = ({ participanti }) => (
  participanti.length > 0 ?
    <div className="lista-participanti">
      <ul className="list-group">
        {participanti.map(({ _id, idParticipant, data}) => (
          <li key={ _id } className="list-group-item">
              <ParticipantActivitate idParticipant={idParticipant}></ParticipantActivitate>
              <div className="text-right data">{ Datetime.moment(data).format("DD-MM-YYYY hh-mm") }</div>
          </li>
        ))}
      </ul>
    </div> :
    <Alert bsStyle="warning">Nu sunt participanți adăugați.</Alert>
);

ListaParticipanti.propTypes = {
  participanti: PropTypes.array,
};

export default container((props, onData) => {
  const idActivitate = props.idActivitate;
  const subscription = Meteor.subscribe('participanti_activitati.list');

  if (subscription.ready()) {
    const participanti = ParticipantiActivitati.find({idActivitate: idActivitate}).fetch();

    onData(null, { participanti });
  }

}, ListaParticipanti);


