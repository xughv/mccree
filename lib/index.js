'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.awaitable = exports.actions = exports.createStore = exports.Provider = exports.connect = exports.combineTriads = undefined;

var _reactRedux = require('react-redux');

var _connect = require('./connect');

var _store = require('./store');

var _help = require('./help');

exports.default = {
  combineTriads: _help.combineTriads,
  connect: _connect.connect,
  Provider: _reactRedux.Provider,
  createStore: _store.createStore,
  actions: _store.actions,
  awaitable: _help.awaitable
};
exports.combineTriads = _help.combineTriads;
exports.connect = _connect.connect;
exports.Provider = _reactRedux.Provider;
exports.createStore = _store.createStore;
exports.actions = _store.actions;
exports.awaitable = _help.awaitable;