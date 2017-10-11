import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Sporturi from '../../../api/sporturi/sporturi';
import container from '../../../modules/container';

const SelectSporturi = ({ sporturi, selected }) => (
  sporturi.length > 0 ? <FormControl name="sport" componentClass="select" defaultValue={selected} placeholder="Alege sport">
    {sporturi.map(({ _id, nume }) => (
      <option value={ _id }  key={ _id }>
        { nume }
      </option>
    ))}
  </FormControl> : ''
);

SelectSporturi.propTypes = {
  sporturi: PropTypes.array,
  selected: PropTypes.string,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('sporturi.list');
  if (subscription.ready()) {
    const sporturi = Sporturi.find().fetch();

    let selected = '';
    if (typeof props.selected !== 'undefined') {
      selected = props.selected;
    }

    onData(null, { sporturi, selected });
  }
}, SelectSporturi);
