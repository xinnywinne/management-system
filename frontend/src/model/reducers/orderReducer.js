import {
  LOAD_ORDERS
} from '../actions/orderAction';

function orders(state = [], action) {
  switch (action.type) {
    case LOAD_ORDERS: 
      return action.data;
    default:
      return state;
  }
}

export {orders};

