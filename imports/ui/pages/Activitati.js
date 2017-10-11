import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import CheckboxesSporturi from '../components/sport/Checkboxes';
import ListaActivitati from '../components/ListaActivitati';

export default class Activitati extends React.Component {
  constructor(props) {
    super();

    this.state = {
      linkOras: props.params.linkOras,
      sporturiSelectate: [],
    }
  }

  getChecked() {
    let sporturiSelectate = [];
    let checkboxes = document.querySelectorAll('[name="sporturi[]"]');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked === true) {
        sporturiSelectate.push(checkboxes[i].value.trim());
      }
    }

    this.setState({
      sporturiSelectate: sporturiSelectate
    });
  }

  render() {
    const popoverClickRootClose = (
      <Popover id="popover-trigger-click-root-close" title="Alege sport">
          { this.state.sporturiSelectate.length > 0 ? (
              <CheckboxesSporturi sporturiSelectate = {this.state.sporturiSelectate}/>
          ) : (
              <CheckboxesSporturi />
          )}
        <Button onClick={() => { this.getChecked() }} bsStyle="primary">Filtreaza</Button>
      </Popover>
    );

    return (
      <div>
        <Row>
          <Col xs={ 12 }>
            <div className="page-header clearfix">
              <h4 className="pull-left">Activitati</h4>

              <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverClickRootClose}>
                <Button className="butonFiltrare">Filtrare</Button>
              </OverlayTrigger>

              <Link to="/adauga-activitate">
                <Button
                  bsStyle="success"
                  className="pull-right"
                >Adauga o activitate noua</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <ListaActivitati linkOras={ this.state.linkOras } sporturiSelectate={ this.state.sporturiSelectate }/>
      </div>
    )
  };
}
