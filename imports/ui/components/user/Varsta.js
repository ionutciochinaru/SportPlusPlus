import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import container from '../../../modules/container';

const Varsta = ({ varsta }) => ( varsta ?
    <span>
         <strong>{varsta}</strong>
    </span> : <span>'-'</span>
);

export default container((props, onData) => {
  const dataNastere = props.dataNastere;

  if (dataNastere !== '' && typeof dataNastere !== 'undefined') {
    let dataNastereArray = dataNastere.split('-');

    dataNastereObj = new Date(dataNastereArray[2], dataNastereArray[1]-1, dataNastereArray[0], 0, 0, 0, 0);

    let varsta = Datetime.moment().diff(dataNastereObj, 'years');

    onData(null, { varsta });
  }

}, Varsta);
