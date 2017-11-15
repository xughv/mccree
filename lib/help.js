'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.combineTriads = combineTriads;
function combineTriads() {

  var state = {},
      reducers = {},
      effects = {};

  for (var _len = arguments.length, triads = Array(_len), _key = 0; _key < _len; _key++) {
    triads[_key] = arguments[_key];
  }

  triads.forEach(function (triad) {
    state = _extends({}, state, triad.state || {});
    reducers = _extends({}, reducers, triad.reducers || {});
    effects = _extends({}, effects, triad.effects || {});
  });

  return { state: state, reducers: reducers, effects: effects };
}

var awaitable = exports.awaitable = function awaitable(dispatcher) {
  return function (payload) {
    return new Promise(function (resolve, reject) {
      dispatcher({
        data: payload,
        '@@mccree/done': { resolve: resolve, reject: reject }
      });
    });
  };
};