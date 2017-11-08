import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

import vava, { Provider } from 'vava';

import {
  userModel
} from './redux/models';

import {
  Home,
  User,
} from './scenes';


const history = createHistory({ basename: '/' });

const store = vava.createStore({
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
        <Route strict path="/" component={Home} />
        <Route strict path="/user" component={User} />
      </Switch>
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root')
);
