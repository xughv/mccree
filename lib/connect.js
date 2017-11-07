'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.connect = connect;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		var map = mapModelToProps(_store.models);
		var modelsStates = {};

		Object.keys(map).forEach(function (key) {
			var _ref2 = map[key] || {},
			    name = _ref2.name;

			name && (modelsStates[key] = state[name]);
		});

		return modelsStates;
	}, function (dispatch) {
		var map = mapModelToProps(_store.models);
		var modelsActions = {};

		Object.keys(map).forEach(function (key) {
			var _ref3 = map[key] || {},
			    _ref3$actions = _ref3.actions,
			    actions = _ref3$actions === undefined ? {} : _ref3$actions;

			modelsActions[key] = (0, _redux.bindActionCreators)(actions, dispatch);
		});

		return modelsActions;
	}, function (stateProps, dispatchProps) {
		var models = {};

		Object.keys(dispatchProps).forEach(function (key) {
			models[key] = _extends({}, dispatchProps[key], {
				state: stateProps[key] || {}
			});
		});

		return _extends({}, models);
	});
}