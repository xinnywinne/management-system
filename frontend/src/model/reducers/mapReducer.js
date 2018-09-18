import {
  LOADED_MAPS
} from '../actions/mapAction';

function maps (state = [], action) {
  switch (action.type) {
    case LOADED_MAPS:
      return action.data;
    default:
      return state;
  }
}

export {maps};
