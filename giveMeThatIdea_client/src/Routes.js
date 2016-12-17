import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { history } from './redux/store';
import App from './App';
import { LoginContainer, SignupContainer, CreateIdea, FeedIdea } from './modules';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
});

const Authenticated = UserIsAuthenticated(({ children }) => children);

export default () => (
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="/login" component={LoginContainer} />
      <Route path="/signup" component={SignupContainer} />
      <Route component={Authenticated}>
        <Route path="/ideas">
          <IndexRoute component={FeedIdea} />
          <Route path="new" component={CreateIdea} />
        </Route>
      </Route>
    </Route>
  </Router>
);
