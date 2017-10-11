import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import CardActivitate from './activitate/Card';
import Activitati from '../../api/activitati/activitati';
import Orase from '../../api/orase/orase';
import container from '../../modules/container';

const ListaActivitati = ({ activitati }) => (
  activitati.length > 0 ?
  <div>
    <Row className="show-grid">
      {activitati.map(({ _id, numeActivitate, descriereActivitate, nrmaxParticipanti, idSport, dataActivitate, anulata}) => (
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
      ))}
    </Row>
  </div> :
  <Alert bsStyle="warning">Nu sunt activitati adaugate.</Alert>
);

ListaActivitati.propTypes = {
  activitati: PropTypes.array,
};

export default container((props, onData) => {
  const linkOras = props.linkOras;
  const sporturiSelectate = props.sporturiSelectate;
  let data =  new Date();

  const subscriptionOras = Meteor.subscribe('orase.list');
  if (subscriptionOras.ready()) {
    const oras = Orase.findOne({ link: linkOras });
    const idOras = oras._id;

    const subscription = Meteor.subscribe('activitati.list');

    if (subscription.ready()) {
      if (sporturiSelectate.length > 0) {
        const activitati = Activitati.find({idOras: idOras, anulata: {$ne: true}, idSport: {$in: sporturiSelectate}}, {sort: {dataActivitate: 1}}).fetch();
        onData(null, { activitati });
      } else {
        const activitati = Activitati.find({idOras: idOras , anulata: {$ne: true}, dataActivitate: {$gte: data}}, {sort: {dataActivitate: 1}}).fetch();
        onData(null, { activitati });
      }
    }
  }

}, ListaActivitati);
