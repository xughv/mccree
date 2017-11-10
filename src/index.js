import { Provider } from 'react-redux'
import { connect } from './connect';
import { createStore, actions } from './store';
import { combineTriads, awaitable } from './help';

export default {
  combineTriads,
  connect,
  Provider,
  createStore,
  actions,
  awaitable,
}

export {
  combineTriads,
  connect,
  Provider,
  createStore,
  actions,
  awaitable,
}
