import axios from 'axios';

export const LOADED_MAPS = 'LOADED_MAPS';


export function createLoadedMapsAction(maps) {
  return {
    type: LOADED_MAPS,
    data: maps
  };
};

export function loadAllMaps(){
  return (dispatch) => {
    axios.get('/api/v1/maps').then((response) => {
      dispatch(createLoadedMapsAction(response.data));
    });
  }
}
