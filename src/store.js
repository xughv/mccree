/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore as reduxCreateStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

let _store = null, _models = null;

const _actions = {}, _reducers = {};

/**
 * Inject Model
 */
function injectModel({ name, actions, reducer, effect }) {
  
  _actions[name] = actions;
  const store = getStore();

  if (reducer) {
    _reducers[name] = reducer;
    store.replaceReducer(combineReducers(_reducers));
  }

  if (effect) {
    store.runSaga(effect);
  }
}


export function getStore() {
  if (!_store) {
    throw new Error('store is not created');
  }
  return _store;
}


export function createStore({ middleware = [], models = [] } = {}) {

	if (_store) {
    throw new Error('store has been created');
	}
	
	const sagaMiddleware = createSagaMiddleware();

	const store = reduxCreateStore(
		state => state,
		compose(
			applyMiddleware(...middleware, sagaMiddleware),
			process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.devToolsExtension ? window.devToolsExtension({
			}) : f => f
		)
	);
 
	store.runSaga = sagaMiddleware.run;
	_store = store;
	_models = {};

	models.forEach(model => {

		if (!model.name) {
			throw new Error('invalid model');
		}

		const { name, actions } = model;
		_models[name] = { name, actions };

		injectModel(model);
	});
console.log('createStore');
	return store;
}

export {
	_models as models,
	_actions as actions
};


