import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './model/reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  {}, // initial state.
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
); 
ReactDOM.render((
 
 <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>), document.getElementById('root'));
registerServiceWorker();
