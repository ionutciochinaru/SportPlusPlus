/* eslint-disable no-undef */

import {browserHistory} from 'react-router';
import {Bert} from 'meteor/themeteorchef:bert';
import {adaugaActivitate} from '../api/activitati/methods.js';
import {adaugaParticipantActivitate} from '../api/participanti_activitati/methods.js';
import './validation.js';

let component;

const salveaza = () => {
    const {activitate} = component.props;

    const confirmation = activitate && activitate._id ? 'Activitate salvata!' : 'Activitate adaugata!';
    let limitaParticipanti = false;

    let anulata = false;
    const dataActivitateadaugata = new Date();

    if (document.querySelector('[name="limitaParticipanti"]:checked') !== null || document.querySelector('[name="nrmaxParticipanti"]').value.trim() === '') {
        limitaParticipanti = true;
    }

    let nrmaxParticipanti = 0;
    if (document.querySelector('[name="nrmaxParticipanti"]').value.trim() !== '' && limitaParticipanti === false) {
        nrmaxParticipanti = parseInt(document.querySelector('[name="nrmaxParticipanti"]').value.trim());

        if (nrmaxParticipanti < 0) {
            nrmaxParticipanti = 0;
            limitaParticipanti = true;
        }
    }

    const activitateNoua = {
        numeActivitate: document.querySelector('[name="numeActivitate"]').value.trim(),
        descriereActivitate: document.querySelector('[name="descriereActivitate"]').value.trim(),
        idadminActivitate: Meteor.userId(),
        idOras: document.querySelector('[name="oras"]').value.trim(),
        idSport: document.querySelector('[name="sport"]').value.trim(),
        anulata: anulata,
        nrmaxParticipanti: nrmaxParticipanti,
        limitaParticipanti: limitaParticipanti,
        dataActivitate: new Date(document.querySelector('[name="dataActivitate"]').value.trim()),
        dataActivitateadaugata : dataActivitateadaugata,
};

    let marker = component.state.marker;
    if (marker.length > 0 && typeof marker[0].position !== 'undefined') {
        if (typeof marker[0].position.lat !== 'function' && typeof marker[0].position.lng !== 'function') {
            activitateNoua.locatieLat = parseFloat(marker[0].position.lat);
            activitateNoua.locatieLng = parseFloat(marker[0].position.lng);
        } else {
            activitateNoua.locatieLat = parseFloat(marker[0].position.lat());
            activitateNoua.locatieLng = parseFloat(marker[0].position.lng());
        }
    } else {
        activitateNoua.locatieLat = null;
        activitateNoua.locatieLng = null;
    }

    if (activitate && activitate._id) activitateNoua._id = activitate._id;

    let idActivitate = null;
    adaugaActivitate.call(activitateNoua, (error, response) => {
        if (error) {
            Bert.alert(error.reason, 'danger');
        } else {
            idActivitate = response.insertedId;

            if (!activitate && idActivitate !== null) {
                adaugaParticipant(idActivitate);
            }

            component.editForm.reset();
            Bert.alert(confirmation, 'success');
            browserHistory.push(`/activitati/${idActivitate || activitate._id}`);
        }
    });
};

const adaugaParticipant = (idActivitate) => {
    const participantActivitate = {
        idActivitate: idActivitate,
        idParticipant: Meteor.userId(),
        data: new Date(),
    };

    adaugaParticipantActivitate.call(participantActivitate, (error, response) => {
        if (error) {
            Bert.alert('Eroare adaugare participant', 'danger');
        }
    });
};

const validate = () => {
    $(component.editForm).validate({
        rules: {
            numeActivitate: {
                required: true,
            },
            descriereActivitate: {
                required: true,
            },
            idOras: {
                required: true,
            },
            idSport: {
              required: true,
            },
            dataActivitate: {
                required: true,
            },
        },
        messages: {
            numeActivitate: {
                required: 'Intraduce numele activitatii',
            },
            descriereActivitate: {
                required: 'Descrie activitatea',
            },
            idOras: {
                required: 'Alege orasul dorit',
            },
            idSport: {
              required: 'Alege sportul dorit',
            },
            dataActivitate: {
                required: 'Alege data si ora activitatii',
            },
        },
        submitHandler() {
            salveaza();
        },
    });
};

export default function modificaActivitate(options) {
    component = options.component;
    validate();
}
