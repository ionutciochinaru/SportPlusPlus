import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Datetime from "react-datetime";
import { Col, Button } from 'react-bootstrap';
import container from '../../../modules/container';
import NumeSport from '../sport/Nume';
import ImgSport from '../sport/Img';
import ParticipantiActivitati from '../../../api/participanti_activitati/participanti_activitati';

const handleNav = _id => browserHistory.push(`/activitati/${_id}`);

const Activitate = (props) => (
<Col xs={12} sm={4} md={3}>
    <div className="cardEveniment">
        <ImgSport id={ props.idSport } />
        <h4 className="numeActivitate">{ props.numeActivitate }</h4>
        <div className="detaliiActivitate">
            <div><strong>Sport:</strong> <span className="label label-success"><NumeSport id={ props.idSport } /></span></div>
            <div><strong>Locuri disponibile:</strong> <span className="label label-warning">
              {props.nrmaxParticipanti === 0 ?
                  'Fără limită'
                :
                  props.nrparticipantiRamasi
              }
                </span></div>
        </div>
        <div className="dataActivitate">
            <i className="fa fa-calendar-check-o" aria-hidden="true"></i>
            <strong>Dată activitate:</strong> { Datetime.moment(props.dataActivitate).format("DD-MM-YYYY") }
        </div>
        <div className="text-center">
          {   props.anulata === false && props.dataActivitateStart > props.data ?
              <Button onClick={ () => handleNav(props.idActivitate) } bsSize="small" bsStyle="primary"><i className="fa fa-eye" aria-hidden="true"></i> Detalii activitate</Button>
            : props.anulata === false && props.dataActivitateStart < props.data ?
              <Button onClick={ () => handleNav(props.idActivitate) } bsSize="small" bsStyle="danger"><i className="fa fa-exclamation-circle" aria-hidden="true"></i> Activitate expirată</Button>
            : props.anulata === true ?
              <Button onClick={ () => handleNav(props.idActivitate) } bsSize="small" bsStyle="default"><i className="fa fa-ban" aria-hidden="true"></i> Activitate anulată</Button>
                :''
          }
        </div>
    </div>
</Col>
);

Activitate.propTypes = {
  idActivitate: PropTypes.string,
  numeActivitate: PropTypes.string,
  descriereActivitate: PropTypes.string,
  nrmaxParticipanti: PropTypes.number,
  idSport: PropTypes.string,
  dataActivitate: PropTypes.instanceOf(Date),
  anulata: PropTypes.bool,
  nrParticipanti: PropTypes.number,
  nrparticipantiRamasi: PropTypes.number,
  data: PropTypes.instanceOf(Date),
  dataActivitateStart: PropTypes.instanceOf(Date),
};

export default container((props, onData) => {
  const idActivitate = props.idActivitate;
  const numeActivitate = props.numeActivitate;
  const descriereActivitate = props.descriereActivitate;
  const nrmaxParticipanti = props.nrmaxParticipanti;
  const idSport = props.idSport;
  const dataActivitate = props.dataActivitate;
  const dataActivitateStart = props.dataActivitate;
  const anulata = props.anulata;
  let data = new Date();

  const subscription = Meteor.subscribe('participanti_activitati.view', idActivitate);

  if (subscription.ready()) {
    let nrParticipanti = ParticipantiActivitati.find({idActivitate: idActivitate}).count();
    let nrparticipantiRamasi = nrmaxParticipanti - nrParticipanti;

    onData(null, { data, idActivitate, nrmaxParticipanti, nrParticipanti, nrparticipantiRamasi, numeActivitate, descriereActivitate, idSport, dataActivitate, anulata, dataActivitateStart });
  }

}, Activitate);
