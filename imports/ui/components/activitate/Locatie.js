import React from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import container from '../../../modules/container';

const Locatie = withScriptjs(
  withGoogleMap(
    props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={12}
        defaultCenter={{lat: props.lat, lng: props.lng}}
        onClick={props.onMapClick}
      >
        {props.marker.map(marker => (
          <Marker
            {...marker}
            onRightClick={() => props.onMarkerRightClick(marker)}
          />
        ))}

      </GoogleMap>
    )
  )
);

Locatie.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  marker: PropTypes.array,
  centerToMarker: PropTypes.bool,
};

export default container((props, onData) => {
  if (props.centerToMarker == true) {
    const lat = props.marker[0].position.lat;
    const lng = props.marker[0].position.lng;

    onData(null, { lat, lng });
  } else {
    if (typeof Session.get('coordonateLatOrasUser') !== 'undefined' && typeof Session.get('coordonateLngOrasUser') !== 'undefined') {
      const lat = parseFloat(Session.get('coordonateLatOrasUser'));
      const lng = parseFloat(Session.get('coordonateLngOrasUser'));

      onData(null, { lat, lng });
    }
  }

}, Locatie);
