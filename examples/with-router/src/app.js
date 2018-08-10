import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { Provider } from 'react-redux';
import { createStore } from 'mccree';

import {
  userModel
} from './redux/models';

import {
  Home,
  Test,
} from './scenes';


const history = createHistory({ basename: '/' });

const store = createStore({
  models: {
    userModel,
  },
  middlewares: [
    routerMiddleware(history)
  ]
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route strict path="/test" component={Test} />
        <Route strict path="/" component={Home} />
      </Switch>
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root')
);
