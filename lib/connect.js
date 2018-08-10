'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.connect = connect;

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _store = require('./store');

var _help = require('./help');

function connect(mapModelToProps, mapStateToProps, mapDispatchToProps) {
	var mergeProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {
		var m = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
		var o = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
		return _extends({}, m, s, d, o);
	};
	var options = arguments[4];


	return (0, _reactRedux.connect)(function (state, ownProps) {
		var modelsState = {};
		var props = mapStateToProps ? mapStateToProps(state, ownProps) || {} : {};

		Object.keys(_store.models).forEach(function (name) {
			modelsState[name] = state[name] || {};
		});

		return {
			props: props,
			models: modelsState
		};
	}, function (dispatch) {
		var modelsActions = {};
		var props = {};
		if (typeof mapDispatchToProps === 'function') {
			props = mapDispatchToProps ? mapDispatchToProps(dispatch) || {} : {};
		}
		if ((typeof mapDispatchToProps === 'undefined' ? 'undefined' : _typeof(mapDispatchToProps)) === 'object') {
			props = (0, _redux.bindActionCreators)(mapDispatchToProps, dispatch);
		}

		Object.keys(_store.models).forEach(function (name) {
			var _models$name = _store.models[name],
			    _models$name$actions = _models$name.actions,
			    actions = _models$name$actions === undefined ? {} : _models$name$actions,
			    actionCreators = _models$name.actionCreators;

			if (!actionCreators) {
				_store.models[name].actionCreators = (0, _redux.bindActionCreators)(actions, dispatch);
			}
			modelsActions[name] = {};

			var creators = _store.models[name].actionCreators;
			Object.keys(creators).forEach(function (action) {
				modelsActions[name][action] = (0, _help.awaitable)(creators[action]);
			});
		});

		return {
			props: props,
			models: modelsActions
		};
	}, function (stateProps, dispatchProps, ownProps) {
		var propModels = {};
		var modelStateProps = stateProps.models,
		    modelDispatchProps = dispatchProps.models;

		Object.keys(_store.models).forEach(function (name) {
			propModels[name] = _extends({}, modelDispatchProps[name], {
				state: modelStateProps[name] || {}
			});
		});
		var modelProps = mapModelToProps(propModels, ownProps);
		return mergeProps(modelProps, stateProps.props, dispatchProps.props, ownProps);
	}, options);
}