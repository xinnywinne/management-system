import React, { Component } from 'react';
//import './App.css';
import { Route, Switch } from 'react-router';
import Home from './home/Home';
import Navigation from './component/Navigation'
import OrderList from './order/OrderList';
import EventList from './event/EventList';
//import axios from 'axios'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink
  },
});

//axios.defaults.withCredentials = true;


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Navigation></Navigation>
        <div className="app-container">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/orders' component={OrderList}/>
            <Route exact path='/events' component={EventList}/>
          </Switch>
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
