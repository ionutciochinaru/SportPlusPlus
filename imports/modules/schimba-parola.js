/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

let component;

const reseteaza = () => {
  const oldPassword = document.querySelector('[name="oldPassword"]').value;
  const newPassword = document.querySelector('[name="newPassword"]').value;
  Accounts.changePassword(oldPassword, newPassword, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push('/');
      Bert.alert('Password reset!', 'success');
    }
  });
};

const valideazaCampuri = () => {
  $(component.formSchimbaParola).validate({
    rules: {
      oldPassword: {
        required: true,
        minlength: 6,
      },
      newPassword: {
        required: true,
        minlength: 6,
      },
      repeatNewPassword: {
        required: true,
        minlength: 6,
        equalTo: '[name="newPassword"]',
      },
    },
    messages: {
      oldPassword: {
        required: 'Introduceti parola curenta a contului.',
        minlength: 'Use at least six characters, please.',
      },
      newPassword: {
        required: 'Enter a new password, please.',
        minlength: 'Use at least six characters, please.',
      },
      repeatNewPassword: {
        required: 'Repeat your new password, please.',
        equalTo: 'Hmm, your passwords don\'t match. Try again?',
      },
    },
    submitHandler() { reseteaza(); },
  });
};

export default function schimbaParola(options) {
  component = options.component;
  valideazaCampuri();
}
