import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import container from '../../../modules/container';
import {adaugaParticipantActivitate, stergeParticipantActivitate} from '../../../api/participanti_activitati/methods.js';
import ParticipantiActivitati from '../../../api/participanti_activitati/participanti_activitati';

const ButonParticipActivitate = props =>(
    <span>
    {Meteor.userId() ? (
      <span>
        {(props.nrmaxParticipanti === props.nrParticipanti && props.nrmaxParticipanti !== 0 ) || props.anulata === true || props.dataActivitate < props.expirat || Roles.userIsInRole(Meteor.userId(), 'admin') === true ?
          <span>
            <Button disabled bsStyle="default">Particip</Button>
          </span>
            :
          <span>
            {typeof props.participantLogat !== 'undefined' ?
                <Button onClick={() => {
                  adaugaParticipant(props)
                }} bsStyle="danger"><i className="fa fa-times" aria-hidden="true"></i> Nu particip</Button>
                :
                <Button onClick={() => {
                  adaugaParticipant(props)
                }} bsStyle="success"><i className="fa fa-check" aria-hidden="true"></i> Particip</Button>
            }
          </span>
        }
      </span>
    ) : '' }
    </span>
);

ButonParticipActivitate.propTypes = {
  idActivitate: PropTypes.string,
  nrParticipanti: PropTypes.number,
  nrmaxParticipanti: PropTypes.number,
  participantLogat: PropTypes.object,
  dataActivitate: PropTypes.instanceOf(Date),
  currentdate: PropTypes.instanceOf(Date),
  expirat: PropTypes.instanceOf(Date),
  anulata: PropTypes.bool,
};

const adaugaParticipant = (props) => {
  if (typeof props.participantLogat !== 'undefined') {
    //delete user - delete
    const participantActivitate = {
      _id: props.participantLogat._id
    };

    stergeParticipantActivitate.call(participantActivitate, (error, response) => {
      if (error) {
        Bert.alert('Eroare stergere participant', 'danger');
      }
    });
  } else {
    //add user - insert
    const participantActivitate = {
      idActivitate: props.idActivitate,
      idParticipant: Meteor.userId(),
      data: new Date(),
    };

    adaugaParticipantActivitate.call(participantActivitate, (error, response) => {
      if (error) {
        Bert.alert('Eroare adaugare participant', 'danger');
      }
    });
  }
};

export default container((props, onData) => {
  const idActivitate = props.idActivitate;
  let currentdate = new Date();
  let expirat = new Date();
  const dataActivitate = props.dataActivitate;
  const nrmaxParticipanti = props.nrmaxParticipanti;
  const anulata = props.anulata;

  const subscription = Meteor.subscribe('participanti_activitati.list');

  if (subscription.ready()) {
    let participantLogat = ParticipantiActivitati.findOne({ idActivitate: idActivitate, idParticipant: Meteor.userId() });
    let nrParticipanti = ParticipantiActivitati.find({ idActivitate: idActivitate }).count();

    onData(null, { idActivitate, nrParticipanti, nrmaxParticipanti, participantLogat, dataActivitate, currentdate, expirat, anulata });
  }

}, ButonParticipActivitate);


