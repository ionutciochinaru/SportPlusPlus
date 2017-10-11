import React from 'react';
import { FormGroup, Row, Col, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import ActivitatiData from '../components/ActivitatiData';

export default class CalendarActivitati extends React.Component {
  constructor(props) {
    super();

    let dataStartDefault = new Date();
    dataStartDefault.setHours(0, 0, 0, 0);

    let dataSfarsitDefault = new Date();
    dataSfarsitDefault.setMonth(dataSfarsitDefault.getMonth() + 1);
    dataSfarsitDefault.setHours(23, 59, 59, 0);

    this.state = {
      dataStart: dataStartDefault,
      dataSfarsit: dataSfarsitDefault,
    }
  }

  handleFiltrare() {
    let dataStart = document.querySelector('[name="dataStart"]').value.trim().split('-');
    let dataSfarsit = document.querySelector('[name="dataSfarsit"]').value.trim().split('-');

    dataStart = new Date(dataStart[2], dataStart[1]-1, dataStart[0], 0, 0, 0, 0);

    dataSfarsit = new Date(dataSfarsit[2], dataSfarsit[1]-1, dataSfarsit[0], 23, 59, 59, 0);

    this.setState({
      dataStart: dataStart,
      dataSfarsit: dataSfarsit
    });
  };

  render() {
    return (
      <div>
        <form
          onSubmit={ event => event.preventDefault() }
        >
          <Row>
            <Col sm={12}>
              <div className="page-header clearfix">
                {Roles.userIsInRole(Meteor.userId(), 'admin') === false ?
                  <h4 className="pull-left">Calendar activitati la care participi</h4>
                  :
                  <h4 className="pull-left">Calendar toate activitatile</h4>
                }
                <div className="form-inline pull-right">
                  <FormGroup>
                    <Datetime dateFormat="DD-MM-YYYY" defaultValue={this.state.dataStart}
                              inputProps={{name: 'dataStart', readOnly: true}} timeFormat={false}/>
                  </FormGroup>
                  &nbsp;-&nbsp;
                  <FormGroup>
                    <Datetime dateFormat="DD-MM-YYYY" defaultValue={this.state.dataSfarsit}
                              inputProps={{name: 'dataSfarsit', readOnly: true}} timeFormat={false}/>
                  </FormGroup>
                  &nbsp;
                  <Button onClick={() => {
                      this.handleFiltrare()
                  }} bsStyle="success">Cauta</Button>
                </div>
              </div>
            </Col>
          </Row>
        </form>
          <Row>
          <ActivitatiData dataStart={this.state.dataStart} dataSfarsit={this.state.dataSfarsit}/>
        </Row>
      </div>


  )
  };
}
