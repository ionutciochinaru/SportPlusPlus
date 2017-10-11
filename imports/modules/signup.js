/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

let component;

const getUserData = () => ({
  email: document.querySelector('[name="emailAddress"]').value.trim(),
  password: document.querySelector('[name="password"]').value,
  profile: {
    name: {
      first: document.querySelector('[name="firstName"]').value.trim(),
      last: document.querySelector('[name="lastName"]').value.trim(),
    },
    city: document.querySelector('[name="oras"]').value,
    birthday: document.querySelector('[name="dataNastere"]').value.trim(),
  },
});

const signup = () => {
  const user = getUserData();

  Accounts.createUser(user, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push('/');
      Bert.alert('Bine ai venit!', 'success');
    }
  });
};

const validate = () => {
  $(component.signupForm).validate({
    rules: {
      firstName: {
        required: true,
      },
      lastName: {
        required: true,
      },
      oras: {
        required: true,
      },
      birthday: {
        required: true,
      },
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
    },
    messages: {
      firstName: {
        required: 'Introduceti prenumele.',
      },
      lastName: {
        required: 'Introduceti numele.',
      },
      oras: {
        required: 'Selectati un oras.',
      },
      birthday: {
        required: 'Selecteaza data ta de nastere.',
      },
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Nu ati introdus un email corect!',
      },
      password: {
        required: 'Introduceti o parola.',
        minlength: 'Parola trebuie sa fie de cel putin 6 caractere.',
      },
    },
    submitHandler() { signup(); },
  });
};

export default function handleSignup(options) {
  component = options.component;
  validate();
}
