import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';
import { NavBar, SideMenu } from './modules';

/**
* AXIOS DEFAULTS SETUP
*/
axios.defaults.baseURL = 'http://localhost:3001/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const App = ({ children, location, user }) => (
  <div>
    <NavBar path={location.pathname} auth={user} />
    {console.log({ user })}
    {user ? (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={1}>
            <SideMenu />
          </Grid.Column>
          <Grid.Column width={15}>
            {children}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ) : (
      <div>
        {children}
      </div>
    )}
  </div>
);

export default connect(
  state => ({
    user: state.auth.user
  })
)(App);
