import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MeniuContulMeu from '../components/MeniuContulMeu.js';
import ActivitatiAdaugate from '../components/ActivitatiAdaugate.js';


export default class ActivitatileMele extends React.Component {
  render() {
    return (
      <div className="ContulMeu">
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 4 }>
            <MeniuContulMeu />
          </Col>
          <Col xs={ 12 } sm={ 6 } md={ 8 }>
            <div className="page-header clearfix">
              <h4 className="pull-left">Activitati adaugate</h4>
            </div>
            <ActivitatiAdaugate />
          </Col>
        </Row>
      </div>
    );
  }
}
