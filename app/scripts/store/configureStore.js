import { createStore } from 'redux';
import navState from '../reducers/reducer';

var store = createStore(navState);

export default store