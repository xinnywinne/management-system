import {
  LOADED_TIMEZONES
} from '../actions/timezoneAction';

function timezones (state = [], action) {
  switch (action.type) {
    case LOADED_TIMEZONES:
      return action.data;
    default:
      return state;
  }
}

export {timezones};
