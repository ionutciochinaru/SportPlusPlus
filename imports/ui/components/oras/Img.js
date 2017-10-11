import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import container from '../../../modules/container';

const ImgOras = (props) => (
  <Image src={ '/img/orase/' + props.img } thumbnail responsive />
);

ImgOras.propTypes = {
  img: PropTypes.string,
};

export default container((props, onData) => {
  let link = props.link;
  const img = link + '.jpg';

  onData(null, { img });
}, ImgOras);
