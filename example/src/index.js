import React from 'react';
import ReactDOM from 'react-dom';
import vava, { Provider } from 'vava';

import { App } from './App';
import { user } from './redux/models';

const store = vava.createStore({
  models: [
    user
  ],
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
