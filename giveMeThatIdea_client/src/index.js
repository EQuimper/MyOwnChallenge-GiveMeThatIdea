import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { store } from './redux/store';
import Routes from './Routes';
import './index.css';

render(
  <Provider store={store}>
    <div>
      <Routes />
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="bounceIn"
        transitionOut="bounceOut"
        progressBar
      />
    </div>
  </Provider>,
  document.getElementById('root')
);
