import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Grid, Container } from 'semantic-ui-react';
import { NavBar, SideMenu, toggleLogout } from './modules';
import { checkToken, logoutUser } from './modules/auth/actions';
import { Confirm } from 'semantic-ui-react';

/**
* AXIOS DEFAULTS SETUP
*/
axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ?
  'http://localhost:3001/api/v1' : 'https://givemethatidea.now.sh/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class App extends Component {
  componentWillMount() {
    if (this.props.auth.user) {
      this.props.checkToken();
    }
  }
  render() {
    const {
      children,
      location,
      auth,
      logoutUser,
      toggleLogout,
      modal: {
        logoutConfirm
      }
    } = this.props;
    const { user, token } = auth;
    if (user) {
      axios.defaults.headers.common['Authorization'] = token;
    }
    return (
      <div>
        <NavBar
          toggleLogout={toggleLogout}
          path={location.pathname}
          auth={user}
          logoutConfirm={logoutConfirm}
        />
        {user ? (
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column width={2}>
                <SideMenu path={location.pathname} />
              </Grid.Column>
              <Grid.Column width={1} />
              <Grid.Column width={13}>
                <Container>
                  {children}
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : (
          <div>
            {children}
          </div>
        )}
        <Confirm
          open={logoutConfirm.show}
          onCancel={toggleLogout}
          onConfirm={logoutUser}
          header={logoutConfirm.header}
          content={logoutConfirm.content}
          cancelButton={logoutConfirm.cancelButton}
          confirmButton={logoutConfirm.confirmButton}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
    modal: state.ui.modal
  }),
  { checkToken, logoutUser, toggleLogout }
)(App);
