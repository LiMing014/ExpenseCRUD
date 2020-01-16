import {
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
    GET_USER,
    UPDATE_FIELD,
    INIT_USER,
} from './constants'

const initialState = {
    users: [],
    user: {
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
    },
    loading: false
}
 
function userReducer(state = initialState, action) {
    switch(action.type) {
        case INIT_USER:
            return {
                ...state,
            user: {
                firstName: '',
                lastName: '',
                userName: '',
                password: '',
            },          
        }
        case ADD_USER:             
            return {
                ...state,
                loading: true,
                users: [...state.users, state.user],
            }
        case EDIT_USER:
            let newUsers = [...state.users];
            newUsers[action.id] = state.user;
            return {
                ...state,
                users: newUsers
            };
        case UPDATE_FIELD:
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.fieldName]: action.fieldValue,
                }
            }
        case GET_USER: 
            return  {
                ...state,
                user: state.users[action.id],
            }
        case DELETE_USER:         
            state.users.splice(action.id, 1)
            return {
                ...state,
                users: state.users
            }                    
        default:
            return state;
    }
}

export default userReducer;