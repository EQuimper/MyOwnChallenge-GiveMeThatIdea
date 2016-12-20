import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';
import { NavBar, SideMenu } from './modules';
import { checkToken, logoutUser } from './modules/auth/actions';

/**
* AXIOS DEFAULTS SETUP
*/
axios.defaults.baseURL = 'http://localhost:3001/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// export const instance = axios.create({
//   baseURL: 'http://localhost:3001/api/v1',
// });

// axios.interceptors.response.use((
//   res => console.log({ res }),
//   err => console.log({ err })
// ));

// axios.interceptors.response.use(
//   undefined,
//   // res => {
//   //   console.log({ res });
//   // },
//   err => {
//     console.log({ err });
//   }
// );

console.log(axios.defaults.headers);

class App extends Component {
  componentWillMount() {
    if (this.props.auth.user) {
      this.props.checkToken();
    }
  }
  render() {
    const { children, location, auth, logoutUser } = this.props;
    const { user, token } = auth;
    if (user) {
      axios.defaults.headers.common['Authorization'] = token;
    }
    return (
      <div>
        <NavBar path={location.pathname} auth={user} logoutUser={logoutUser} />
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
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  { checkToken, logoutUser }
)(App);
