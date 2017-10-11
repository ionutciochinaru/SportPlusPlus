import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Row, Col, Image } from 'react-bootstrap';
import ActivitatiUser from '../components/ActivitatiUser';
import ActivitatiRecente from '../components/ActivitatiRecente';
import ListaOrase from '../components/oras/Lista';

const Index = () => (
  <div>
    <Row>
      <Col xs={12} lg={12}>
        <Image src={ '/img/extra/cover.png' } responsive thumbnail />
      </Col>
    </Row>

    {Meteor.userId() ?
      <ActivitatiUser />
      : ''
    }

    <ActivitatiRecente />

    <ListaOrase />
  </div>
);

export default Index;
