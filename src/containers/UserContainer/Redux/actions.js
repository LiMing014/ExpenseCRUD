import { 
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
    GET_USER,
    UPDATE_FIELD,
    INIT_USER
} from './constants';

export function initUser() {
    return { type: INIT_USER }
}

export function addUser() {
    return { type: ADD_USER }  //this action sends to reducer and it will be sent to saga
}

export function editUser(id) {
    return { type: EDIT_USER, id }
}

export function deleteUser( id ) {
    return { type: DELETE_USER, id }
}

export function getUser( id ) {
    return { type: GET_USER, id }
}

export function updateField( fieldName, fieldValue) {
    return { type: UPDATE_FIELD, fieldName, fieldValue }
}