import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Mesaje from '../../../api/mesaje/mesaje';
import { adaugaMesaj } from '../../../api/mesaje/methods';
import container from '../../../modules/container';
import NumeUser from '../user/Nume';
import Datetime from 'react-datetime';
import { FormControl, FormGroup, Button } from 'react-bootstrap';

const Chat = props =>(
    <div>
        <div className="mesaje">
            {props.mesaje.map(({ _id, mesaj, data, idUser }) => (
              <div className="mesaj" key={ _id }>
                <div className="text-right"><strong>{ mesaj }</strong></div>
                <div className="clearfix">
                  <div className="pull-left user"><NumeUser idUser={ idUser } /></div>
                  <div className="pull-right data">{ Datetime.moment(data).format("DD-MM-YYYY hh-mm") }</div>
                </div>
              </div>
            ))}
        </div>
      {Meteor.userId() ?
        <div className="adaugare-mesaj">
            <FormGroup controlId="formControlsTextarea">
              <FormControl name="mesaj" componentClass="textarea" placeholder="Introduce mesaj" />
            </FormGroup>
            <Button onClick={() => {
              adauga(props)
            }} bsStyle="success" className="pull-right">Send</Button>
        </div>
        : ''
      }
    </div>
);

Chat.propTypes = {
  idActivitate: PropTypes.string,
  mesaje: PropTypes.array,
};

const adauga = (props) => {
    //add mesaj - insert
    const mesajObj = {
      mesaj: document.querySelector('[name="mesaj"]').value.trim(),
      idActivitate: props.idActivitate,
      idUser: Meteor.userId(),
      data: new Date(),
    };

    if (mesajObj.mesaj !== '') {
      adaugaMesaj.call(mesajObj, (error, response) => {
        if (error) {
          Bert.alert('Eroare adaugare mesaj', 'danger');
        } else {
          document.querySelector('[name="mesaj"]').value = '';
        }
      });
    }
};

export default container((props, onData) => {
  const idActivitate = props.idActivitate;
  const subscription = Meteor.subscribe('mesaje.list');

  if (subscription.ready()) {
    const mesaje = Mesaje.find({idActivitate: idActivitate}).fetch();
    onData(null, { idActivitate, mesaje });
  }
}, Chat);


