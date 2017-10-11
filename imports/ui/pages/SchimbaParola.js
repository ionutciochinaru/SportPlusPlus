import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Row, Col, Alert, FormGroup, ControlLabel, FormControl, Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import MeniuContulMeu from '../components/MeniuContulMeu.js';
import schimbaParola from '../../modules/schimba-parola';

export default class SchimbaParola extends React.Component {
  componentDidMount() {
    schimbaParola({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="SchimbaProla">
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 4 }>
            <MeniuContulMeu />
          </Col>
          <Col xs={ 12 } sm={ 6 } md={ 8 }>
            <h4 className="page-header">Schimba parola</h4>
            <Alert bsStyle="info">
              Introduceti noua parola a contului.
            </Alert>
            <form
              ref={ form => (this.formSchimbaParola = form) }
              className="reset-password"
              onSubmit={ this.handleSubmit }
            >
              <FormGroup>
                <ControlLabel>Vechea parola</ControlLabel>
                <FormControl
                  type="password"
                  ref="oldPassword"
                  name="oldPassword"
                  placeholder="Vechea parola"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Noua parola</ControlLabel>
                <FormControl
                  type="password"
                  ref="newPassword"
                  name="newPassword"
                  placeholder="Noua parola"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Retipareste parola</ControlLabel>
                <FormControl
                  type="password"
                  ref="repeatNewPassword"
                  name="repeatNewPassword"
                  placeholder="Retipareste parola"
                />
              </FormGroup>
              <Button type="submit" bsStyle="success">Schimba parola</Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}
