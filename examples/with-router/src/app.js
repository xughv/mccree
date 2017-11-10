import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

import mccree, { Provider } from 'mccree';

import {
  userModel
} from './redux/models';

import {
  Home,
  Test,
} from './scenes';


const history = createHistory({ basename: '/' });

const store = mccree.createStore({
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
