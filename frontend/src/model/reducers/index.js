import { combineReducers } from 'redux';
import {orders} from './orderReducer';
import {events} from './eventReducer';

const bigReducer = combineReducers({
  orders,
  events,
});

export default bigReducer;