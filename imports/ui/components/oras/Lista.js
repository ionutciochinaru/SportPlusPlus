import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Row, Col } from 'react-bootstrap';
import Orase from '../../../api/orase/orase';
import CardOras from './Card';
import container from '../../../modules/container';

const ListaOrase = ({ orase }) => (
  <Row className="show-grid">
    <Col xs={12}>
      <div className="page-header clearfix">
        <h4 className="pull-left">Activități din alte orașe </h4>
      </div>
      <Row>
      {orase.map(({ _id, nume, link }) => (
        <CardOras
          key={ _id }
          idOras={ _id }
          nume={ nume }
          link={ link }
        />
      ))}
      </Row>
    </Col>
  </Row>
);

ListaOrase.propTypes = {
  orase: PropTypes.array,
};

export default container((props, onData) => {
  const subscription = Meteor.subscribe('orase.list');
  if (subscription.ready()) {
    const orase = Orase.find({}, {sort: {nume: 1}}).fetch();

    onData(null, { orase });
  }
}, ListaOrase);
