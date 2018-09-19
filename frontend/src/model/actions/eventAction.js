import axios from 'axios'

export const LOAD_EVENTS = 'LOAD_EVENTS';

export function createLoadEventsAction(events) {
  return {
    type: LOAD_EVENTS,
    data: events
  };
};

export function loadEvents(){
  return (dispatch) => {
    axios.get('/api/v1/events').then((response) => {
      dispatch(createLoadEventsAction(response.data.data));
    });
  }
}

export function updateEvent(eventId, data) {
  return axios.put('/api/v1/events/' + eventId, data);
}
