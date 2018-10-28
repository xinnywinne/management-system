import axios from 'axios';

export const LOADED_MAPS = 'LOADED_MAPS';
export const LOADED_MAP = 'LOADED_MAP';

export function createLoadedMapsAction(maps) {
  return {
    type: LOADED_MAPS,
    data: maps
  };
};

export function createLoadedMapAction(map) {
  return {
    type: LOADED_MAP,
    data: map
  };
};

export function loadAllMaps() {
  return (dispatch) => {
    axios.get('/api/v1/maps').then((response) => {
      dispatch(createLoadedMapsAction(response.data));
    });
  }
}

export function loadMap(mapId) {
  return (dispatch) => {
    axios.get(`/api/v1/maps/${mapId}`).then((response) => {
      dispatch(createLoadedMapAction(response.data));
    });
  }
}
