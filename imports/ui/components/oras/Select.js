import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Orase from '../../../api/orase/orase';
import container from '../../../modules/container';

const SelectOrase = ({ orase, selected }) => (
  orase.length > 0 ? <FormControl name="oras" componentClass="select" defaultValue={selected} placeholder="Oras">
    {orase.map(({ _id, nume }) => (
      <option value={ _id } key={ _id }>
        { nume }
      </option>
    ))}
  </FormControl> : ''
);

SelectOrase.propTypes = {
  orase: PropTypes.array,
  selected: PropTypes.string,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('orase.list');
  if (subscription.ready()) {
    const orase = Orase.find().fetch();

    let selected = '';
    if (typeof props.selected !== 'undefined') {
      selected = props.selected;
    }

    onData(null, { orase, selected });
  }
}, SelectOrase);
