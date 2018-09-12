import React, {Component} from 'react';
import {loadCustomerOrders, updateOrderStatus} from '../model/actions/orderAction';
import {connect} from 'react-redux';
import './OrderList.scss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';



class OrderList extends Component{

  constructor(props){
    super(props);
    this.props.dispatch(loadCustomerOrders());

  }

  handleChange = (Id) => {
    return (event) => {
      this.props.dispatch(updateOrderStatus(event.target.value, Id));
    }
  }

  render() {
    const orderlist = this.props.orders.map((order, orderIndex) => {
      return(
        <div className="cont">
      <ListItem key={orderIndex} dense button>
        <ListItemText className = "orderitem" primary= {order.Id +' ' + order.UserName} />
        <div className = "orderstatus">
          <FormControl >
            <InputLabel htmlFor="orderstatus">订单状态</InputLabel>
              <Select
                  value={order.Status}
                  onChange={this.handleChange(order.Id)}
                  inputProps={{
                    name: 'orders',
                    id: 'orderstatus',
                   }}
              >   
                <MenuItem value={1}>创建订单</MenuItem>
                <MenuItem value={2}>等待付款</MenuItem>
                <MenuItem value={3}>海外下单</MenuItem>
                <MenuItem value={3}>出票成功</MenuItem>
              </Select>
           </FormControl>
           </div>
           <div className = "button">
           <Button  variant="outlined" color="primary" >
             保存
           </Button>
           </div>
        
      </ListItem> 
      </div>
      );
      });

    return(
      <List>
        {orderlist}
      </List>
      );
    }
  }

  const mapStoreToProps = (state, ownProps) => {
    return {
      orders: state.orders
    }
  }

  export default connect(mapStoreToProps)(OrderList);