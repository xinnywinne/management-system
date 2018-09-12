import {
  LOAD_EVENTS
} from '../actions/eventAction';

function events (state = [], action) {
  switch (action.type) {
    case LOAD_EVENTS: 
      return action.data;
    default:
      return state;
  }
}

export {events};