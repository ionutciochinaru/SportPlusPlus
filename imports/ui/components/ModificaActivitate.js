import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button, Checkbox } from 'react-bootstrap';
import Datetime from 'react-datetime';
import modificaActivitate from '../../modules/modifica-activitate.js';
import SelectOrase from '../components/oras/Select';
import SelectSporturi from './sport/Select';
import Locatie from './activitate/Locatie';

export default class ModificaActivitate extends React.Component {
  componentDidMount() {
    modificaActivitate({component: this});
    setTimeout(() => {
      document.querySelector('[name="numeActivitate"]').focus();
    }, 0);
  }

  constructor(props) {
    super();
    this.faraLimitaParticipanti = this.faraLimitaParticipanti.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
    const {activitate} = props;

    this.state = {
      limitaParticipanti: false,
      marker: [],
    };

    if (activitate) {
      this.state.limitaParticipanti = activitate.limitaParticipanti;

      if (activitate.locatieLat && activitate.locatieLng) {
        this.state.marker = [{
          position: {
            lat: activitate.locatieLat,
            lng: activitate.locatieLng,
          },
          defaultAnimation: 2,
          key: Date.now()
        }];
      }
    }
  }

  faraLimitaParticipanti() {
    this.setState({
      limitaParticipanti: !this.state.limitaParticipanti
    });
  };

  handleMapClick(event) {
    const nextMarker = [{
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
    }];

    this.setState({
      marker: nextMarker,
    });
  };

  handleMarkerRightClick(targetMarker) {
    this.setState({
      marker: [],
    });
  };

  render() {
    const {activitate} = this.props;

    const hidden = this.state.limitaParticipanti ? 'hidden' : '';

    let yesterday = Datetime.moment().subtract(1, 'day');
    let validDate = function( current ){
      return current.isAfter(yesterday);
    };

    return (<form
      ref={ form => (this.editForm = form) }
      onSubmit={ event => event.preventDefault() }
    >
      <Row className="show-grid">
        <Col md={10}>
          <FormGroup>
            <ControlLabel>Nume activitate</ControlLabel>
            <FormControl
              type="text"
              name="numeActivitate"
              defaultValue={ activitate && activitate.numeActivitate }
              placeholder="Alege un nume pentru activitatea ta"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={6}>
          <FormGroup>
            <ControlLabel>Oras</ControlLabel>
            <SelectOrase selected={ activitate && activitate.idOras } />
          </FormGroup>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={6}>
          <FormGroup>
            <ControlLabel>Alege sportul</ControlLabel>
            <SelectSporturi selected={ activitate && activitate.idSport } />
          </FormGroup>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={12}>
          <FormGroup>
            <ControlLabel>Numar maxim de participanti</ControlLabel>
            <FormControl className={`numar-participanti ${hidden}`} type="number" min="0" name="nrmaxParticipanti"
                         defaultValue={ activitate && activitate.nrmaxParticipanti }/>

            <Checkbox checked={ this.state.limitaParticipanti } value="1" name="limitaParticipanti" onChange={ this.faraLimitaParticipanti }>
                Fara limita de participanti
            </Checkbox>
          </FormGroup>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={2}>
          <FormGroup>
            <ControlLabel>Data si ora</ControlLabel>
            <Datetime isValidDate={ validDate } defaultValue={ activitate && activitate.dataActivitate } inputProps={{ name: 'dataActivitate' }} />
          </FormGroup>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={6}>
          <FormGroup>
            <ControlLabel>Locatie</ControlLabel>
            <Locatie
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIVQvWAzdWxUi3l9h0PUgCZKM6U9DI_0Q"
              loadingElement={
                <div style={{height: `250px`}}>
                  <i className="fa fa-spin 2s infinite linear"></i>
                </div>
              }
              containerElement={
                <div style={{height: `250px`}}/>
              }
              mapElement={
                <div style={{height: `250px`}}/>
              }
              onMapClick={this.handleMapClick}
              onMarkerRightClick={this.handleMarkerRightClick}
              marker={this.state.marker}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={6}>
          <FormGroup>
            <ControlLabel>Detalii activitate</ControlLabel>
            <FormControl
              componentClass="textarea"
              name="descriereActivitate"
              defaultValue={ activitate && activitate.descriereActivitate }
              placeholder="Locul de intalnire..."
            />
          </FormGroup>
        </Col>
      </Row>
      <Button type="submit" bsStyle="success">
        { activitate && activitate._id ? 'Save Changes' : 'Adauga activitate' }
      </Button>
    </form>);
  }
}

ModificaActivitate.propTypes = {
  activitate: PropTypes.object,
};
