import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from "react-router-dom";


class Navigation extends Component {

  constructor(props){
    super(props)
    this.state = {
      open: false,
    }
  }

  handleDrawerClose = () => {
    this.setState({open: false});
  }
  handleDrawerOpen = () => {
    this.setState({open: true});
  }

  handleMenuClick = (url) => {
    this.props.history.replace(url);
    this.setState({open: false});
  }

  render(){
    const drawer = (
      <Drawer open={this.state.open}>
        <IconButton onClick={this.handleDrawerClose}>
          <ChevronLeft/>
        </IconButton>
        <Divider />
        <ListItem button onClick={() => {this.handleMenuClick('/orders');}}>
          <ListItemText primary="订单状态管理" />
        </ListItem>
        <ListItem button onClick={() => {this.handleMenuClick('/performers');}}>
          <ListItemText primary="歌星/球队管理" />
        </ListItem>
        <ListItem button onClick={() => {this.handleMenuClick('/events');}}>
          <ListItemText primary="活动管理" />
        </ListItem>
        <ListItem button onClick={() => {this.handleMenuClick('/arenas');}}>
          <ListItemText primary="场馆管理" />
        </ListItem>
      </Drawer>
      );
    return (
    <div className="root">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton className="menuButton" onClick={this.handleDrawerOpen} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            海外票务管理
          </Typography>
        </Toolbar>
      </AppBar>
      {drawer}
    </div>
  );
  }

}



export default withRouter(Navigation);
