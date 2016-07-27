import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import NotFound from './components/NotFound';

export default (
  <Route path="/" component={App}>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/profile/:id" component={Profile} />
    <Route path="*" component={NotFound} />
  </Route>
);
