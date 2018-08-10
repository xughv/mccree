/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore as reduxCreateStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { effectMiddleware } from './effectMiddleware';
import { createModel } from './model';

let _store = null, _models = null, _reducers = {};

const _actions = {};

/**
 * Inject Model
 */
function injectModel({ name, actions, reducer, saga }) {

	if (!name) {
    throw new Error('invalid model');
  }

  _actions[name] = actions;
  const store = getStore();

  if (reducer) {
    _reducers[name] = reducer;
    store.replaceReducer(combineReducers(_reducers));
  }

  if (saga) {
    store.runSaga(saga);
  }
}


export function getStore() {
  if (!_store) {
    throw new Error('store is not created');
  }
  return _store;
}


export function replaceModels(models) {
	_models = {};

	Object.keys(models).forEach(name => {

		const modelObject = models[name];
		const model = createModel(name, modelObject);

		const { actions, reducers, effects } = model;
		_models[name] = { name, actions, reducers, effects };

		injectModel(model);
	});
}


export function createStore({ middlewares = [], models = {}, reducers = {}, preloadedState = {} } = {}) {

	if (_store) {
		return _store;
    // throw new Error('store has been created');
	}

	_reducers = reducers;

	const sagaMiddleware = createSagaMiddleware();

	const store = reduxCreateStore(
		state => state,
		preloadedState,
		compose(
			applyMiddleware(...middlewares, sagaMiddleware, effectMiddleware),
			process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.devToolsExtension ? window.devToolsExtension({
			}) : f => f
		)
	);

	store.runSaga = sagaMiddleware.run;
	_store = store;

	replaceModels(models);

	return _store;
}

export {
	_models as models,
	_actions as actions
};
