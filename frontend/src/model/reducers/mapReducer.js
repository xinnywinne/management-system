import {
  LOADED_MAPS,
  LOADED_MAP
} from '../actions/mapAction';

function maps (state = {}, action) {
  switch (action.type) {
    case LOADED_MAPS:
      return Object.assign({}, state, {all: action.data});
    case LOADED_MAP:
      return Object.assign({}, state, {map: action.data});
    default:
      return state;
  }
}

export {maps};
