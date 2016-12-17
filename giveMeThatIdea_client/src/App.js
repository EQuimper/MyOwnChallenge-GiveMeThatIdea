import React from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';
import { NavBar, SideMenu } from './modules';

/**
* AXIOS DEFAULTS SETUP
*/
axios.defaults.baseURL = 'http://localhost:3001/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const App = ({ children, location }) => (
  <div>
    <NavBar path={location.pathname} />
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
  </div>
);

export default App;
