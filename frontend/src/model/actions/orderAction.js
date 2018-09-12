import axios from 'axios'

export const LOAD_ORDERS = 'LOAD_ORDERS';

export function createLoadOrdersAction(orders) {
  return {
    type: LOAD_ORDERS,
    data: orders
  };
};

export function loadCustomerOrders(){
  return (dispatch) => {
    axios.get('/api/v1/orders').then((response) => {
      dispatch(createLoadOrdersAction(response.data.data));
    }); 
  }
}

export function updateOrderStatus(status, Id){
  return (dispatch) => {
    axios.put(`/api/v1/orders/${Id}`, {
      Status: status,
    }).then((response) => {
      dispatch(loadCustomerOrders()); 
    });
  };
}
