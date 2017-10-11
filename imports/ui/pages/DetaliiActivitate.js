import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Activitati from '../../api/activitati/activitati';
import NotFound from './NotFound';
import container from '../../modules/container';
import Locatie from '../components/activitate/Locatie';
import Datetime from 'react-datetime';
import NumeSport from '../components/sport/Nume';
import ListaParticipanti from '../components/activitate/ListaParticipanti';
import ButonParticipActivitate from '../components/activitate/ButonParticipActivitate';
import ButonEditareActivitate from '../components/activitate/ButonEditareActivitate';
import ButonStergeActivitate from '../components/activitate/ButonStergeActivitate';
import NrMaxParticipanti from '../components/activitate/NrMaxParticipanti';
import Chat from '../components/activitate/Chat';

const DetaliiActivitate = ({ activitate }) => {
  if (activitate) {
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
    return activitate ? (
        <div className="activitate">
          <Row>
            <Col xs={ 12 }>
              <div className="page-header clearfix">
                <h4 className="pull-left">{ activitate.numeActivitate }</h4>

                <div className="butoane-activitate pull-right">
                  <ButonParticipActivitate className="pull-left" dataActivitate={ activitate.dataActivitate } anulata={activitate.anulata} idActivitate={activitate._id} nrmaxParticipanti={activitate.nrmaxParticipanti}/>
                  <ButonEditareActivitate className="pull-left" idActivitate={activitate._id} anulata={activitate.anulata} idadminActivitate={activitate.idadminActivitate}/>
                  <ButonStergeActivitate className="pull-left" idActivitate={activitate._id} anulata={activitate.anulata} idadminActivitate={activitate.idadminActivitate}/>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="coloane">
            <Col xs={12} md={5} className="detalii-container">
              <div className="detalii">
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
                    marker={this.state.marker}
                    centerToMarker={true}
                />
                <div className="data-activitate">
                  { Datetime.moment(activitate.dataActivitate).format("DD-MM-YYYY hh-mm") }
                  <div className="titlu-sectiune">
                    Dată activitate
                  </div>
                </div>
                <div className="nume-sport">
                  <NumeSport id={activitate.idSport} />
                  <div className="titlu-sectiune">
                    Sport
                  </div>
                </div>
                <NrMaxParticipanti idActivitate={activitate._id} nrmaxParticipanti={activitate.nrmaxParticipanti}/>
                <div className="descriere">
                    { activitate.descriereActivitate }
                </div>
              </div>
            </Col>
            <Col xs={12} md={4} className="chat-container">
              <div className="chat clearfix">
                <div className="titlu-main">Chat</div>
                <Chat idActivitate={activitate._id} />
              </div>
            </Col>
            <Col xs={12} md={3} className="participanti-container">
              <div className="participanti clearfix">
                <div className="titlu-main">Participanți</div>
                <ListaParticipanti idActivitate={activitate._id} />
              </div>
            </Col>
          </Row>
        </div>
    ) : <NotFound />;

};

DetaliiActivitate.propTypes = {
  activitate: PropTypes.object,
};

export default container((props, onData) => {
  const idActivitate = props.params._id;
  const subscription = Meteor.subscribe('activitati.view', idActivitate);

  if (subscription.ready()) {
    const activitate = Activitati.findOne(idActivitate);
    onData(null, { activitate });
  }

  const {activitate} = props;

  this.state = {
    marker: [],
  };

  if (activitate) {
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
}, DetaliiActivitate);
