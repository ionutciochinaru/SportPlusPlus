import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

const logout = () => Meteor.logout(() => browserHistory.push('/login'));

const MeniuContulMeu = () => (
  <Panel collapsible defaultExpanded header="Contul meu">
    <ListGroup fill>
      <ListGroupItem>
        <Link to="/contul-meu">Contul meu</Link>
      </ListGroupItem>
      <ListGroupItem>
        <Link to="/activitatile-mele">Activitati adaugate</Link>
      </ListGroupItem>
      <ListGroupItem>
        <Link to="/schimba-parola">Schimba parola</Link>
      </ListGroupItem>
      <ListGroupItem>
        <a href="#" onClick={ logout }>Logout</a>
      </ListGroupItem>
    </ListGroup>
  </Panel>
);

export default MeniuContulMeu;
