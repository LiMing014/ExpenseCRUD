import {
    ADD_EXPENSE,
    EDIT_EXPENSE,
    DELETE_EXPENSE,
    GET_EXPENSE,
    UPDATE_FIELD,
    INIT_EXPENSE,
} from './constants'

const initialState = {
    expenses: [],
    expense: {
        user: null,
        date: new Date(),
        description: '',
        amount: 0,
        comment: '',
    },
    loading: false
}
 
function expenseReducer(state = initialState, action) {
    switch(action.type) {
        case INIT_EXPENSE:
            return {
                ...state,
                expense: {
                    user: null,
                    date: new Date(),
                    description: '',
                    amount: 0,
                    comment: '',
                }
            }
        case ADD_EXPENSE:             
            return {
                ...state,
                loading: true,
                expenses: [...state.expenses, state.expense],
            }
        case EDIT_EXPENSE:
            let newExpenses = [...state.expenses];
            newExpenses[action.id] = state.expense;
            return {
                ...state,
                expenses: newExpenses
            };
        case UPDATE_FIELD:            
            return {
                ...state,
                expense: {
                    ...state.expense,
                    [action.fieldName]: action.fieldValue,
                }
            }
        case GET_EXPENSE: 
            return  {
                ...state,
                expense: state.expenses[action.expId],
            }
        case DELETE_EXPENSE:         
            state.expenses.splice(action.id, 1)
            return {
                ...state,
                expenses: state.expenses
            }                    
        default:
            return state;
    }
}

export default expenseReducer;