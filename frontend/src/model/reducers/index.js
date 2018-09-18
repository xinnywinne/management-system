import { combineReducers } from 'redux';
import {orders} from './orderReducer';
import {events} from './eventReducer';
import {timezones} from './timezoneReducer';
import {maps} from './mapReducer';
import {performers} from './performerReducer';


const bigReducer = combineReducers({
  orders,
  events,
  timezones,
  maps,
  performers,
});

export default bigReducer;
