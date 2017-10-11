import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Alert, Row, Col, Button } from 'react-bootstrap';
import ImgOras from './Img';
import container from '../../../modules/container';

const handleNav = link => browserHistory.push(`/activitati-${link}`);

const CardOras = (props) => (
  <Col xs={5} md={3}>
    <div className="cardEveniment">
        <ImgOras link={ props.link } />
        <h4 className="text-center">{ props.nume }</h4>
        <div className="text-center">
          <Button onClick={ () => handleNav(props.link) } className="butonDetalii" bsSize="small" bsStyle="primary">Vezi activitati</Button>
        </div>
    </div>
  </Col>
);

CardOras.propTypes = {
  idOras: PropTypes.string,
  nume: PropTypes.string,
  link: PropTypes.string,
};

export default container((props, onData) => {
  const idOras = props.idOras;
  const nume = props.nume;
  const link = props.link;

  onData(null, { idOras, nume, link });
}, CardOras);
