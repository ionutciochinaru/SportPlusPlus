import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { stergeActivitate, anuleazaActivitate } from '../../../api/activitati/methods';
import ParticipantiActivitati from '../../../api/participanti_activitati/participanti_activitati';
import container from '../../../modules/container';

const ButonStergeActivitate = props =>(
  <span>
    {(props.idadminActivitate === Meteor.userId() && props.nrParticipanti === 0) || Roles.userIsInRole(Meteor.userId(), 'admin') === true ?
        <span>
          <Button onClick={ () => handleRemove(props.idActivitate) } bsStyle="danger"><i className="fa fa-trash-o" aria-hidden="true"></i> Sterge</Button>
        </span>
      : props.idadminActivitate === Meteor.userId() && props.anulata === false?
        <span>
          <Button onClick={ () => handleCancel(props.idActivitate) } bsStyle="default"><i className="fa fa-ban" aria-hidden="true"></i> Anuleaza</Button>
        </span>
      :  (props.idadminActivitate === Meteor.userId() && props.anulata === true) ?
          <span>
          <Button disabled onClick={ () => handleCancel(props.idActivitate) } bsStyle="default"><i className="fa fa-ban" aria-hidden="true"></i> Activitate anulata</Button>
        </span>
      :''
    }
  </span>
);

ButonStergeActivitate.propTypes = {
  idActivitate: PropTypes.string,
  idadminActivitate: PropTypes.string,
  nrParticipanti: PropTypes.number,
  participantLogat: PropTypes.object,
  anulata: PropTypes.bool,
};

const handleRemove = (idActivitate) => {
  if (confirm('Esti sigur ca doresti stergerea acestei activitati?')) {
    stergeActivitate.call({ _id: idActivitate }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Activitatea a fost stearsa! Activitatea poate fi reactivata daca o editezi', 'success');
        browserHistory.push('/activitatile-mele');
      }
    });
  }
};

const handleCancel = (idActivitate) => {
  if (confirm('Esti sigur ca doresti sa anulezi activitatea?')) {
    const activitate = {
      _id: idActivitate,
      anulata: true
    };
    anuleazaActivitate.call(activitate, (error) => {
      if (error) {console.log(error);
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Activitatea a fost anulata!', 'success');
      }
    });
  }
};

export default container((props, onData) => {
  const idActivitate = props.idActivitate;
  const idadminActivitate = props.idadminActivitate;
  const anulata = props.anulata;
  let nrParticipanti = ParticipantiActivitati.find({ idActivitate: idActivitate }).count();
  let participantLogat = ParticipantiActivitati.findOne({ idActivitate: idActivitate, idParticipant: Meteor.userId() });

  onData(null, { idActivitate, idadminActivitate, nrParticipanti, participantLogat, anulata });
}, ButonStergeActivitate);


