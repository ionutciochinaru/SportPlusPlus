import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Alert, Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Activitati from '../../api/activitati/activitati';
import container from '../../modules/container';
import CardActivitate from './activitate/Card';

const handleNav = _id => browserHistory.push(`/activitati/${_id}`);

const ActivitatiRecente = ({ activitati }) => (
    <Row className="show-grid">
      <Col xs={12}>
        <div className="page-header clearfix">
          <h4 className="pull-left">Activităţi recent adăugate</h4>
        </div>
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
          <Alert bsStyle="warning">Nu sunt activități adăugate.</Alert>
        }
      </Col>
    </Row>
);

ActivitatiRecente.propTypes = {
  activitati: PropTypes.array,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('activitati.list');
  if (subscription.ready()) {
    const activitati = Activitati.find({}, {sort: {dataActivitateadaugata : -1}, limit:4}).fetch();
    onData(null, { activitati });
  }
}, ActivitatiRecente);
