import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase';
import {createStore,  compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import authReducers from './store/reducers/auth';
import donorsReducers from './store/reducers/donors';
import './index.css';
import App from './App';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBNYQLK9P1LK32jocz6Wds23Me6p0QrF_Y",
    authDomain: "blood-bank-app-a0a41.firebaseapp.com",
    databaseURL: "https://blood-bank-app-a0a41.firebaseio.com",
    projectId: "blood-bank-app-a0a41",
    storageBucket: "blood-bank-app-a0a41.appspot.com",
    messagingSenderId: "49661168274"
  };
initializeApp(config);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  auth : authReducers,
  donors : donorsReducers
})

const store = createStore( reducers, composeEnhancers() );

const app = (
  <Provider store = {store}>
    <App />
  </Provider>
) 

ReactDOM.render(app, document.getElementById('root'));
