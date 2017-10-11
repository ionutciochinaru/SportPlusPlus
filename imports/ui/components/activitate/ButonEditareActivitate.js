import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import container from '../../../modules/container';

const ButonEditareActivitate = props =>(
  <span>
    {(props.idadminActivitate === Meteor.userId()) || Roles.userIsInRole(Meteor.userId(), 'admin') === true ?
      <span>
        <Button onClick={ () => handleEdit(props.idActivitate) } bsStyle="primary">Edit <i className="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
      </span>
      : ''
    }
  </span>
);

ButonEditareActivitate.propTypes = {
  idActivitate: PropTypes.string,
  idadminActivitate: PropTypes.string,
};

const handleEdit = (idActivitate) => {
  browserHistory.push(`/activitati/${idActivitate}/edit`);
};

export default container((props, onData) => {
  const idActivitate = props.idActivitate;
  const idadminActivitate = props.idadminActivitate;

  onData(null, { idActivitate, idadminActivitate });
}, ButonEditareActivitate);


