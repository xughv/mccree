'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.connect = connect;

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _store = require('./store');

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function connect() {
	var mapModelToProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (_ref) {
		_objectDestructuringEmpty(_ref);

		return {};
	};


	if (typeof mapModelToProps !== 'function') {
		throw new Error('mapModelToProps is must be a function');
	}

	return (0, _reactRedux.connect)(function (state, ownProps) {
		var modelsStates = {};

		Object.keys(_store.models).forEach(function (name) {
			modelsStates[name] = state[name] || {};
		});

		return modelsStates;
	}, function (dispatch) {
		var modelsActions = {};

		Object.keys(_store.models).forEach(function (name) {
			var _models$name$actions = _store.models[name].actions,
			    actions = _models$name$actions === undefined ? {} : _models$name$actions;

			modelsActions[name] = (0, _redux.bindActionCreators)(actions, dispatch);
		});

		return modelsActions;
	}, function (stateProps, dispatchProps) {
		var propModels = {};
		Object.keys(_store.models).forEach(function (name) {
			propModels[name] = _extends({}, dispatchProps[name], {
				state: stateProps[name] || {}
			});
		});
		return mapModelToProps(propModels);
	});
}