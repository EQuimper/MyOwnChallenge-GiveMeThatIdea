import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { history } from './redux/store';
import App from './App';
import {
  LoginContainer,
  SignupContainer,
  CreateIdeaContainer,
  ResetPasswordContainer,
  ForgotPasswordContainer,
  FeedIdeasContainer
} from './modules';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
});

const VisibleOnlyNoUser = UserAuthWrapper({
  authSelector: state => state.auth.user,
  wrapperDisplayName: 'VisibleOnlyIfNotUser',
  predicate: user => !user,
  failureRedirectPath: '/ideas'
});

const Authenticated = UserIsAuthenticated(({ children }) => children);
const OnlyNotUser = VisibleOnlyNoUser(({ children }) => children);

export default () => (
  <Router history={history}>
    <Route path="/" component={App}>
      <Route component={OnlyNotUser}>
        <Route path="/login" component={LoginContainer} />
        <Route path="/signup" component={SignupContainer} />
        <Route path="/resetPassword/:resetToken" component={ResetPasswordContainer} />
        <Route path="/forgotPassword" component={ForgotPasswordContainer} />
      </Route>
      <Route component={Authenticated}>
        <Route path="/ideas">
          <IndexRoute component={FeedIdeasContainer} />
          <Route path="new" component={CreateIdeaContainer} />
        </Route>
      </Route>
    </Route>
  </Router>
);
