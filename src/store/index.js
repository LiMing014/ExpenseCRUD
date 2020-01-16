import { createStore } from 'redux';
import userReducer from '../containers/UserContainer/Redux/reducer';

const store = createStore (userReducer)

export default store;