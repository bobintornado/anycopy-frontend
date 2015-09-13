import Root from './components/Root';
import React from 'react';
import { Provider } from 'react-redux';

import store from './store/configureStore'

// Every time the state changes, log it
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

const targetEl = document.getElementById('root');

React.render(
  <Provider store={store}>
    {() => <Root />}
  </Provider>,
  targetEl
);