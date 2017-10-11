import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import container from '../../modules/container';
import Orase from '../../api/orase/orase';

const logout = () => {
  Object.keys(Session.keys).forEach(function(key){
    Session.set(key, undefined);
  });

  Session.keys = {};

  Meteor.logout();
  browserHistory.push('/login');
};

const contulMeu = () => browserHistory.push('/contul-meu');

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

const getIdOras = () => {
  const user = Meteor.user();
  return user ? `${user.profile.city}` : '';
};

const AuthenticatedNavigation = ( { numeOrasUser, linkOrasUser } ) => (
  <div>
    <Nav>
      {Roles.userIsInRole(Meteor.userId(), 'admin') === false ?
        <LinkContainer to={"/activitati-" + linkOrasUser}>

          <NavItem eventKey={ 2.1 } href={"/activitati-" + linkOrasUser}>
            { numeOrasUser ?
              'Activitati din ' + numeOrasUser : ''
            }
          </NavItem>
        </LinkContainer>
        :''
      }
      {Roles.userIsInRole(Meteor.userId(), 'admin') === false ?
        <LinkContainer to="/adauga-activitate">
          <NavItem eventKey={ 2.2 } href="/adauga-activitate">Adauga activitate</NavItem>
        </LinkContainer>
        :''
      }
      <LinkContainer to="/calendar-activitati">
        <NavItem eventKey={ 2.3 } href="/calendar-activitati">Calendar activitati</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={ 3 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 3.1 } onClick={ contulMeu }>Contul meu</MenuItem>
        <MenuItem eventKey={ 3.2 } onClick={ logout }>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

AuthenticatedNavigation.propTypes = {
  numeOrasUser: PropTypes.string,
};

export default container((props, onData) => {
  let numeOrasUser = '';
  let linkOrasUser = '';
  if (typeof Session.get('numeOrasUser') !== 'undefined') {
    numeOrasUser = Session.get('numeOrasUser');
    linkOrasUser = Session.get('linkOrasUser');
  } else {
    const subscription = Meteor.subscribe('orase.list');
    if (subscription.ready()) {
      const oras = Orase.findOne({_id: getIdOras()});

      numeOrasUser = oras ? `${oras.nume}` : '';
      linkOrasUser = oras ? `${oras.link}` : '';
      let coordonateLatOrasUser = oras ? `${oras.coordonateLat}` : '';
      let coordonateLngOrasUser = oras ? `${oras.coordonateLng}` : '';

      Session.set('numeOrasUser', numeOrasUser);
      Session.set('linkOrasUser', linkOrasUser);
      Session.set('coordonateLatOrasUser', coordonateLatOrasUser);
      Session.set('coordonateLngOrasUser', coordonateLngOrasUser);
    }
  }

  onData(null, { numeOrasUser, linkOrasUser });
}, AuthenticatedNavigation);
