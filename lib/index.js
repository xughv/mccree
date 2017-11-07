'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.createStore = exports.getStore = exports.createModel = exports.Provider = exports.connect = undefined;

var _reactRedux = require('react-redux');

var _connect = require('./connect');

var _model = require('./model');

var _store = require('./store');

exports.default = {
  connect: _connect.connect,
  Provider: _reactRedux.Provider,
  createModel: _model.createModel,
  getStore: _store.getStore,
  createStore: _store.createStore,
  actions: _store.actions
};
exports.connect = _connect.connect;
exports.Provider = _reactRedux.Provider;
exports.createModel = _model.createModel;
exports.getStore = _store.getStore;
exports.createStore = _store.createStore;
exports.actions = _store.actions;