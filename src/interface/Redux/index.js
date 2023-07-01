import { createStore } from 'redux';
import Reducers from './Modules/rootReducer';

export const store = createStore(Reducers);