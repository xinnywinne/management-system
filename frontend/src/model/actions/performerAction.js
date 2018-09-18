import axios from 'axios';

export const LOADED_PERFORMERS = 'LOADED_PERFORMERS';


export function createLoadedPerformersAction(performers) {
  return {
    type: LOADED_PERFORMERS,
    data: performers
  };
};

export function loadAllPerformers(){
  return (dispatch) => {
    axios.get('/api/v1/performers').then((response) => {
      dispatch(createLoadedPerformersAction(response.data));
    });
  }
}
