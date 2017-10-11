import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.js';
import Activitati from '../../ui/pages/Activitati.js';
import AdaugaActivitate from '../../ui/pages/AdaugaActivitate.js';
import EditActivitate from '../../ui/pages/EditActivitate.js';
import DetaliiActivitate from '../../ui/pages/DetaliiActivitate.js';
import Index from '../../ui/pages/Index.js';
import Login from '../../ui/pages/Login.js';
import NotFound from '../../ui/pages/NotFound.js';
import RecoverPassword from '../../ui/pages/RecoverPassword.js';
import ResetPassword from '../../ui/pages/ResetPassword.js';
import ContNou from '../../ui/pages/ContNou.js';
import ActivitatileMele from '../../ui/pages/ActivitatileMele.js';
import ContulMeu from '../../ui/pages/ContulMeu.js';
import SchimbaParola from '../../ui/pages/SchimbaParola.js';
import CalendarActivitati from '../../ui/pages/CalendarActivitati.js';

const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ Index } />
        <Route name="activitati-oras" path="/activitati-:linkOras" component={ Activitati } />
        <Route name="calendar-activitati" path="/calendar-activitati" component={ CalendarActivitati } onEnter={ authenticate } />
        <Route name="activitatile-mele" path="/activitatile-mele" component={ ActivitatileMele } onEnter={ authenticate } />
        <Route name="adauga-activitate" path="/adauga-activitate" component={ AdaugaActivitate } onEnter={ authenticate } />
        <Route name="edit-activitate" path="/activitati/:_id/edit" component={ EditActivitate } onEnter={ authenticate } />
        <Route name="detalii-activitate" path="/activitati/:_id" component={ DetaliiActivitate } />
        <Route name="login" path="/login" component={ Login } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="cont-nou" path="/cont-nou" component={ ContNou } />
        <Route name="contul-meu" path="/contul-meu" component={ ContulMeu } onEnter={ authenticate } />
        <Route name="schimba-parola" path="/schimba-parola" component={ SchimbaParola } onEnter={ authenticate } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root'),
  );
});
