import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import container from '../../modules/container';

const Footer = (hasUser) => (
  <Row>
      <Col xs={12}>
          Licenta @2017 - Ciochinaru Ionut Daniel
      </Col>
  </Row>
);

Footer.propTypes = {
  hasUser: PropTypes.object,
};

export default container((props, onData) => {
  onData(null, { hasUser: Meteor.user() });
}, Footer);
