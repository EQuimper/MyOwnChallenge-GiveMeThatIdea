import React from 'react';
import { Loader } from 'semantic-ui-react';

const LoadingScreen = () => (
  <div style={{ height: '100vh' }}>
    <Loader active size="massive">Loading</Loader>
  </div>
);

export default LoadingScreen;
