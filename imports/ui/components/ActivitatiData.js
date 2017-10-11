import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import ParticipantiActivitati from '../../api/participanti_activitati/participanti_activitati';
import Activitati from '../../api/activitati/activitati';
import container from '../../modules/container';
import CardActivitate from './activitate/Card';

const ActivitatiData = ({activitati}) => (
  <div>
    <Row className="show-grid">
        {activitati.length > 0 ?
          activitati.map(({_id, numeActivitate, descriereActivitate, nrmaxParticipanti, idSport, dataActivitate, anulata}) => (
            <CardActivitate
              key={ _id }
              idActivitate={ _id }
              numeActivitate={ numeActivitate }
              descriereActivitate={ descriereActivitate }
              nrmaxParticipanti={ nrmaxParticipanti }
              idSport={ idSport }
              dataActivitate={ dataActivitate }
              anulata={ anulata }
            />
          ))
          : Roles.userIsInRole(Meteor.userId(), 'admin') === false ?
            <Col xs={12}>
              <Alert bsStyle="warning">Nu participi la nicio activitate :(.</Alert>
            </Col>
          : Roles.userIsInRole(Meteor.userId(), 'admin') === true ?
            <Col xs={12}>
              <Alert bsStyle="warning">Nu sunt activitati adaugate :(.</Alert>
            </Col>
          :''
        }
    </Row>
  </div>
);

ActivitatiData.propTypes = {
  activitati: PropTypes.array,
};

export default container((props, onData) => {
  const dataStart = props.dataStart;
  const dataSfarsit = props.dataSfarsit;

  const subscription = Meteor.subscribe('participanti_activitati.list');
  if (subscription.ready()) {
    let participantiActivitati = [];
    if(Roles.userIsInRole(Meteor.userId(), 'admin') === false){
      participantiActivitati = ParticipantiActivitati.find({idParticipant: Meteor.userId()}).fetch();
    } else {
      participantiActivitati = ParticipantiActivitati.find({}).fetch();
    }

    const idActivitati = [];
    participantiActivitati.map(({_id, idActivitate}) => {
      idActivitati.push(idActivitate);
    });

    const subscriptionActivitati = Meteor.subscribe('activitati.list');
    if (subscriptionActivitati.ready()) {
      const activitati = Activitati.find({
        _id: {$in: idActivitati},
        dataActivitate: {$gte: dataStart, $lte: dataSfarsit}
      }, {sort: {dataActivitate: 1}}).fetch();
      onData(null, {activitati});
    }
  }

}, ActivitatiData);
