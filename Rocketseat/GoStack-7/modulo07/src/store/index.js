import { createStore } from 'redux';
import combineReducers from './modules/rootReducer';

const store = createStore(combineReducers);

export default store;
