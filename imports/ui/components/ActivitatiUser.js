import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import ParticipantiActivitati from '../../api/participanti_activitati/participanti_activitati';
import Activitati from '../../api/activitati/activitati';
import container from '../../modules/container';
import CardActivitate from './activitate/Card';

const ActivitatiUser = ({ activitati }) => (
  <div>
    {Roles.userIsInRole(Meteor.userId(), 'admin') === false ?
      <Row className="show-grid">
        <Col xs={12}>
          <div className="page-header clearfix">
            <h4 className="pull-left">Activități la care participi</h4>
          </div>
          <Row>
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
              :
              <Col xs={12}>
                <Alert bsStyle="warning">Nu participi la nicio activitate :(.</Alert>
              </Col>
            }
          </Row>
        </Col>
      </Row>
      :''
    }
  </div>

);

ActivitatiUser.propTypes = {
  activitati: PropTypes.array,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('participanti_activitati.list');
  let data = new Date();
  if (subscription.ready()) {
    const participantiActivitati = ParticipantiActivitati.find({idParticipant: Meteor.userId()}).fetch();

    const idActivitati = [];
    participantiActivitati.map(({_id, idActivitate}) => {
      idActivitati.push(idActivitate);
    });

    const subscriptionActivitati = Meteor.subscribe('activitati.list');
    if (subscriptionActivitati.ready()) {
      const activitati = Activitati.find({ _id: { $in: idActivitati }, anulata: {$ne: true}, dataActivitate: {$gte: data} }, {sort: {dataActivitate: 1}, limit:4}).fetch();

      onData(null, { activitati });
    }
  }
}, ActivitatiUser);
