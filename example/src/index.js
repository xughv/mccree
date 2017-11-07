import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

import vava, { Provider } from 'vava';

import { App } from './App';
import { user } from './redux/models';

const history = createHistory({ basename: '/' });

const store = vava.createStore({
  models: [
    user
  ],
  middleware: [
    routerMiddleware(history)
  ]
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route strict path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root')
);
