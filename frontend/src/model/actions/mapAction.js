import axios from 'axios';

export const LOADED_MAPS = 'LOADED_MAPS';
export const LOADED_MAP = 'LOADED_MAP';
export const LOADED_SECTIONS = 'LOADED_SECTIONS';

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

export function createLoadedSections(sections) {
  return {
    type: LOADED_SECTIONS,
    data: sections
  };
}

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

export function loadSections(mapId) {
  return (dispatch) => {
    axios.get(`/api/v1/maps/${mapId}/sections`).then((response) => {
      dispatch(createLoadedSections(response.data));
    });
  }
}

export function createMapSection(mapId, data) {
  return axios.post(`/api/v1/maps/${mapId}/sections`, data);
}
