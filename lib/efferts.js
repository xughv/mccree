'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = exports.takeLatest = exports.takeEvery = exports.setContext = exports.getContext = exports.flush = exports.cancelled = exports.actionChannel = exports.select = exports.cancel = exports.join = exports.spawn = exports.fork = exports.cps = exports.apply = exports.call = exports.race = exports.all = exports.put = exports.takem = exports.take = exports.execEffect = exports.delay = undefined;

var _effects = require('redux-saga/effects');

var _store = require('./store');

var delay = function delay(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
};
var execEffect = function execEffect(action) {
  var payload = action.payload;


  return new Promise(function (resolve, reject) {
    action.payload = {
      data: payload,
      '@@mccree/done': { resolve: resolve, reject: reject }
    };
    (0, _store.getStore)().dispatch(action);
  });
};

exports.delay = delay;
exports.execEffect = execEffect;
exports.take = _effects.take;
exports.takem = _effects.takem;
exports.put = _effects.put;
exports.all = _effects.all;
exports.race = _effects.race;
exports.call = _effects.call;
exports.apply = _effects.apply;
exports.cps = _effects.cps;
exports.fork = _effects.fork;
exports.spawn = _effects.spawn;
exports.join = _effects.join;
exports.cancel = _effects.cancel;
exports.select = _effects.select;
exports.actionChannel = _effects.actionChannel;
exports.cancelled = _effects.cancelled;
exports.flush = _effects.flush;
exports.getContext = _effects.getContext;
exports.setContext = _effects.setContext;
exports.takeEvery = _effects.takeEvery;
exports.takeLatest = _effects.takeLatest;
exports.throttle = _effects.throttle;