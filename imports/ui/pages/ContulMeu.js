import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MeniuContulMeu from '../components/MeniuContulMeu.js';
import NumeUser from '../components/user/Nume';
import EmailUser from '../components/user/Email';
import DataNastereUser from '../components/user/DataNastere';
import OrasSelectat from '../components/oras/OrasSelectat';

export default class ContulMeu extends React.Component {
  render() {
    return (
      <div className="ContulMeu">
        <Row>

          <Col xs={ 12 } sm={ 6 } md={ 4 }>
            <MeniuContulMeu />
          </Col>
          <Col xs={ 12 } sm={ 6 } md={ 8 }>
            <h3>
             Nume cont: <NumeUser idUser={Meteor.userId()}/>
            </h3>
            <h3>
              Email cont: <EmailUser idUser={Meteor.userId()}/>
            </h3>
            <h3>
              Data nastere: <DataNastereUser idUser={Meteor.userId()}/>
            </h3>
            <h3>
              Oras: <OrasSelectat />
            </h3>
          </Col>
        </Row>
      </div>
    );
  }
}
