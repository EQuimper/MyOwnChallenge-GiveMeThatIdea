import React from 'react';
import { Button } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

const styles = {
  root: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
}

const Page404 = () => (
  <div style={styles.root}>
    <h1>Page 404</h1>
    <Button primary onClick={() => browserHistory.push('/')}>ComeBack</Button>
  </div>
);

export default Page404;
