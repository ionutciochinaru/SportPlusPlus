import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Checkbox } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Sporturi from '../../../api/sporturi/sporturi';
import container from '../../../modules/container';

const CheckboxesSporturi = ({ sporturi, sporturiSelectate }) => (
  sporturi.length > 0 ? <FormGroup>
    {sporturi.map(({ _id, nume }) => (
      <Checkbox name="sporturi[]" value={ _id } key={ _id } defaultChecked={ typeof sporturiSelectate !== 'undefined' && sporturiSelectate.indexOf(_id) >= 0 } >
        {nume}
      </Checkbox>
    ))}
  </FormGroup> : ''
);

CheckboxesSporturi.propTypes = {
  sporturi: PropTypes.array,
  sporturiSelectate: PropTypes.array,
};

export default container((props, onData) => {
  const sporturiSelectate = props.sporturiSelectate;
  const subscription = Meteor.subscribe('sporturi.list');
  if (subscription.ready()) {
    const sporturi = Sporturi.find().fetch();

    onData(null, { sporturi, sporturiSelectate });
  }
}, CheckboxesSporturi);
