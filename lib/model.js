'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.createModel = createModel;

var _reduxActions = require('redux-actions');

var _effects = require('redux-saga/effects');

var _efferts = require('./efferts');

var sagaEffects = _interopRequireWildcard(_efferts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createModel() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var _ref = arguments[1];
  var _ref$state = _ref.state,
      state = _ref$state === undefined ? {} : _ref$state,
      _ref$effects = _ref.effects,
      effects = _ref$effects === undefined ? {} : _ref$effects,
      _ref$reducers = _ref.reducers,
      reducers = _ref$reducers === undefined ? {} : _ref$reducers;


  var actions = {};

  var subSagas = Object.keys(effects).map(function (key) {

    var subSaga = effects[key];
    var nkey = name + '/' + key;

    actions[key] = (0, _reduxActions.createAction)(nkey);

    return (0, _effects.call)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _effects.takeEvery)(nkey, _regenerator2.default.mark(function _callee(_ref2) {
                var type = _ref2.type,
                    payload = _ref2.payload;
                var done, result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!((typeof payload === 'undefined' ? 'undefined' : _typeof(payload)) === 'object' && '@@effect/done' in payload)) {
                          _context.next = 15;
                          break;
                        }

                        done = payload['@@effect/done'];
                        _context.prev = 2;
                        _context.next = 5;
                        return subSaga({ type: type, payload: payload.data }, sagaEffects);

                      case 5:
                        result = _context.sent;

                        setTimeout(function () {
                          return done.resolve(result);
                        }, 1);
                        _context.next = 13;
                        break;

                      case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](2);

                        console.log('[ERROR] [effect](' + type + ')', _context.t0);
                        done.reject(_context.t0);

                      case 13:
                        _context.next = 23;
                        break;

                      case 15:
                        _context.prev = 15;
                        _context.next = 18;
                        return subSaga({ type: type, payload: payload }, sagaEffects);

                      case 18:
                        _context.next = 23;
                        break;

                      case 20:
                        _context.prev = 20;
                        _context.t1 = _context['catch'](15);

                        console.log('[ERROR] [effect](' + type + ')', _context.t1);

                      case 23:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, this, [[2, 9], [15, 20]]);
              }));

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));
  });

  var tmpReducers = {};
  Object.keys(reducers).forEach(function (key) {
    var nkey = name + '/' + key;
    !actions[key] && (actions[key] = (0, _reduxActions.createAction)(nkey));
    tmpReducers[nkey] = reducers[key];
  });

  var reducer = Object.keys(reducers).length ? (0, _reduxActions.handleActions)(tmpReducers, state) : (0, _reduxActions.handleActions)({ _default: function _default(state) {
      return state;
    } }, state);

  var saga = subSagas.length ? _regenerator2.default.mark(function _callee3() {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return subSagas;

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }) : null;

  return {
    name: name,
    actions: actions,
    reducer: reducer,
    saga: saga,
    effects: effects,
    reducers: reducers
  };
}