import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase';
import {createStore,  compose, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import authReducers from './store/reducers/auth';
import donorsReducers from './store/reducers/donors';
import App from './App';
import './index.css';

// Initialize Firebase
const config = {

};
initializeApp(config);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  auth : authReducers,
  donors : donorsReducers
})

const store = createStore( reducers, composeEnhancers( applyMiddleware(thunk) ) );

const app = (
  <Provider store = {store}>
    <App />
  </Provider>
) 

ReactDOM.render(app, document.getElementById('root'));
