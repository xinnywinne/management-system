import React, { Component } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router';
import Home from './home/Home';
import Login from './login/Login';
import Navigation from './component/Navigation'
import OrderList from './order/OrderList';
import EventList from './event/EventList';
import ArenaList from './arena/ArenaList';
import Arena from './arena/Arena';
import PerformerList from './performer/PerformerList';
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
            <Route exact path='/login' component={Login}/>
            <Route exact path='/orders' component={OrderList}/>
            <Route exact path='/events' component={EventList}/>
            <Route exact path='/arenas' component={ArenaList}/>
            <Route exact path='/arenas/:arena_id' component={Arena}/>
            <Route exact path='/performers' component={PerformerList}/>
          </Switch>
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
