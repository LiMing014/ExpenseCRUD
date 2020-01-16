import { 
    ADD_EXPENSE,
    EDIT_EXPENSE,
    DELETE_EXPENSE,
    GET_EXPENSE,
    UPDATE_FIELD,
    INIT_EXPENSE,
} from './constants';

export function initExpense() {
    return { type: INIT_EXPENSE }
}

export function addExpense( ) {    
    return { type: ADD_EXPENSE }  //this action sends to reducer and it will be sent to saga
}

export function editExpense(id) {
    return { type: EDIT_EXPENSE, id }
}

export function deleteExpense( id ) {
    return { type: DELETE_EXPENSE, id }
}

export function getExpense( userId, expId ) {
    return { type: GET_EXPENSE, userId, expId }
}

export function updateField( fieldName, fieldValue) {
    return { type: UPDATE_FIELD, fieldName, fieldValue }
}