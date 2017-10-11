import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Activitati from '../../api/activitati/activitati';
import ModificaActivitate from '../components/ModificaActivitate';
import NotFound from './NotFound';
import container from '../../modules/container';

const EditActivitate = ({ activitate }) => (activitate ? (
  <div className="EditDocument">
    <h4 className="page-header">Editing "{ activitate.numeActivitate }"</h4>
    <ModificaActivitate activitate={ activitate }/>
  </div>
) : <NotFound />);

EditActivitate.propTypes = {
  activitate: PropTypes.object,
};

export default container((props, onData) => {
  const idActivitate = props.params._id;
  const subscription = Meteor.subscribe('activitati.view', idActivitate);

  if (subscription.ready()) {
    const activitate = Activitati.findOne(idActivitate);
    onData(null, { activitate });
  }
}, EditActivitate);
