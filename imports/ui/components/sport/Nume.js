import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Sporturi from '../../../api/sporturi/sporturi';
import container from '../../../modules/container';

const NumeSport = ({ sport }) => (
  sport ? <span>
             { sport.nume }
         </span> : ''
);

NumeSport.propTypes = {
  sport: PropTypes.object,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('sporturi.list');
  if (subscription.ready()) {
    const sport = Sporturi.findOne({_id: props.id});

    onData(null, { sport });
  }
}, NumeSport);
