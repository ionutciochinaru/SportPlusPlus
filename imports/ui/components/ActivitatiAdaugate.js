import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import Activitati from '../../api/activitati/activitati';
import container from '../../modules/container';
import CardActivitate from './activitate/Card';

const ActivitatiAdaugate = ({ activitati }) => (
  <div>
    <Row className="show-grid">
      <Col xs={12}>
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
          <Alert bsStyle="warning">Nu ai adăugat nici o activitate :(.</Alert>
        }
      </Col>
    </Row>
    <Row>
      <Col>
        <Link to="/calendar-activitati" className="pull-right">Activități la care participi</Link>
      </Col>
    </Row>
  </div>

);

ActivitatiAdaugate.propTypes = {
  activitati: PropTypes.array,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('activitati.list');
  if (subscription.ready()) {
    const activitati = Activitati.find({idadminActivitate: Meteor.userId()}).fetch();

    onData(null, { activitati });

  }
}, ActivitatiAdaugate);
