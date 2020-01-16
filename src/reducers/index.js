import { combineReducers } from 'redux';
import userReducer from '../containers/UserContainer/Redux/reducer';
import expenseReducer from '../containers/ExpenseContainer/Redux/reducer';
//Here we can connect many reducers

export default combineReducers({
    userReducer: userReducer,
    expenseReducer: expenseReducer,
})
