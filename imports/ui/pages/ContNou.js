import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import handleSignup from '../../modules/signup';
import SelectOrase from '../components/oras/Select';

export default class ContNou extends React.Component {
  componentDidMount() {
    handleSignup({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    let data = Datetime.moment().subtract(15, 'years');
    let validDate = function( current ){
        return current.isBefore(data);
    };

    return (
      <div className="Signup">
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 4 }>
            <h4 className="page-header">Cont nou</h4>
            <form
              ref={ form => (this.signupForm = form) }
              onSubmit={ this.handleSubmit }
            >
              <Row>
                <Col xs={ 6 } sm={ 6 }>
                  <FormGroup>
                    <ControlLabel>Prenume</ControlLabel>
                    <FormControl
                      type="text"
                      ref="firstName"
                      name="firstName"
                      placeholder="First Name"
                    />
                  </FormGroup>
                </Col>
                <Col xs={ 6 } sm={ 6 }>
                  <FormGroup>
                    <ControlLabel>Nume</ControlLabel>
                    <FormControl
                      type="text"
                      ref="lastName"
                      name="lastName"
                      placeholder="Last Name"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <ControlLabel>Oras</ControlLabel>
                <SelectOrase />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Data nastere</ControlLabel>
                <Datetime dateFormat="DD-MM-YYYY" isValidDate={ validDate } defaultValue={Datetime.moment().subtract(15, 'years')} timeFormat={false} inputProps={{ name: 'dataNastere' }} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Adresa email</ControlLabel>
                <FormControl
                  type="text"
                  ref="emailAddress"
                  name="emailAddress"
                  placeholder="Email Address"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Parola</ControlLabel>
                <FormControl
                  type="password"
                  ref="password"
                  name="password"
                  placeholder="Password"
                />
              </FormGroup>
              <Button type="submit" bsStyle="success">Creeaza cont</Button>
            </form>
            <p>Ai deja cont ? <Link to="/login">Log In</Link>.</p>
          </Col>
        </Row>
      </div>
    );
  }
}
