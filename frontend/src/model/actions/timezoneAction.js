import axios from 'axios';

export const LOADED_TIMEZONES = 'LOADED_TIMEZONES';


export function createLoadedTimezonesAction(timezones) {
  return {
    type: LOADED_TIMEZONES,
    data: timezones
  };
};

export function loadAllTimezones(){
  return (dispatch) => {
    axios.get('/api/v1/timezones').then((response) => {
      dispatch(createLoadedTimezonesAction(response.data));
    });
  }
}
