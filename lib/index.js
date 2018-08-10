'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceModels = exports.actions = exports.createStore = exports.connect = exports.combineTriads = undefined;

var _connect = require('./connect');

var _store = require('./store');

var _help = require('./help');

exports.default = {
  combineTriads: _help.combineTriads,
  connect: _connect.connect,
  createStore: _store.createStore,
  actions: _store.actions,
  replaceModels: _store.replaceModels
};
exports.combineTriads = _help.combineTriads;
exports.connect = _connect.connect;
exports.createStore = _store.createStore;
exports.actions = _store.actions;
exports.replaceModels = _store.replaceModels;