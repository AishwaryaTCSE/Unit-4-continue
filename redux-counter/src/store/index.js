import { createStore } from 'redux';
import counterReducer from './counterSlice';

const store = createStore(counterReducer);

export default store;
