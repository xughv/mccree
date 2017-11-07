'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actions = exports.models = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getStore = getStore;
exports.createStore = createStore;

var _redux = require('redux');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _store = null,
    _models = null;

var _actions = {},
    _reducers = {};

function injectModel(_ref) {
	var name = _ref.name,
	    actions = _ref.actions,
	    reducer = _ref.reducer,
	    effect = _ref.effect;


	_actions[name] = actions;
	var store = getStore();

	if (reducer) {
		_reducers[name] = reducer;
		store.replaceReducer((0, _redux.combineReducers)(_reducers));
	}

	if (effect) {
		store.runSaga(effect);
	}
}

function getStore() {
	if (!_store) {
		throw new Error('store is not created');
	}
	return _store;
}

function createStore() {
	var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    _ref2$middleware = _ref2.middleware,
	    middleware = _ref2$middleware === undefined ? [] : _ref2$middleware,
	    _ref2$models = _ref2.models,
	    models = _ref2$models === undefined ? [] : _ref2$models;

	if (_store) {
		throw new Error('store has been created');
	}

	var sagaMiddleware = (0, _reduxSaga2.default)();

	var store = (0, _redux.createStore)(function (state) {
		return state;
	}, (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, _toConsumableArray(middleware).concat([sagaMiddleware])), process.env.NODE_ENV !== 'production' && (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.devToolsExtension ? window.devToolsExtension({}) : function (f) {
		return f;
	}));

	store.runSaga = sagaMiddleware.run;
	_store = store;
	exports.models = _models = {};

	models.forEach(function (model) {

		if (!model.name) {
			throw new Error('invalid model');
		}

		var name = model.name,
		    actions = model.actions;

		_models[name] = { name: name, actions: actions };

		injectModel(model);
	});
	console.log('createStore');
	return store;
}

exports.models = _models;
exports.actions = _actions;