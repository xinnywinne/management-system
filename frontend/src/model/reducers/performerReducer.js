import {
  LOADED_PERFORMERS
} from '../actions/performerAction';

function performers (state = [], action) {
  switch (action.type) {
    case LOADED_PERFORMERS:
      return action.data;
    default:
      return state;
  }
}

export {performers};
