import React from 'react';
import PropTypes from 'prop-types';
import ParticipantiActivitati from '../../../api/participanti_activitati/participanti_activitati';
import container from '../../../modules/container';

const NrMaxParticipanti = props =>(
  <div className="locuri-participanti">
    <div className="nr-max-participanti">
      {props.nrmaxParticipanti > 0 ? (
          <span>{props.nrmaxParticipanti}</span>
          ) : (
          'Fără limită de participanți'
          )
      }
      <div className="titlu-sectiune">
        Număr maxim de participanți
      </div>
    </div>
    {props.nrmaxParticipanti > 0 ? (
      <div className="locuri-ramase">
        {props.nrparticipantiRamasi}
        <div className="titlu-sectiune">
          Locuri disponibile
        </div>
      </div>
    ) : '' }
  </div>
);

NrMaxParticipanti.propTypes = {
  nrmaxParticipanti: PropTypes.number,
  idActivitate: PropTypes.string,
  nrParticipanti: PropTypes.number,
  nrparticipantiRamasi: PropTypes.number,
};

export default container((props, onData) => {
  const nrmaxParticipanti = props.nrmaxParticipanti;
  const idActivitate = props.idActivitate;

  const subscription = Meteor.subscribe('participanti_activitati.view', idActivitate);

  if (subscription.ready()) {
    let nrParticipanti = ParticipantiActivitati.find({idActivitate: idActivitate}).count();
    let nrparticipantiRamasi = nrmaxParticipanti - nrParticipanti;

    onData(null, { idActivitate, nrmaxParticipanti, nrParticipanti, nrparticipantiRamasi });
  }
}, NrMaxParticipanti);


