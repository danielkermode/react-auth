import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './redux/store';
import { Provider } from 'react-redux';

const reactRoot = document.getElementById('app');
//redux setup
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  reactRoot
);
