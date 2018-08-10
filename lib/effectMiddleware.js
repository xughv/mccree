'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var effectMiddleware = exports.effectMiddleware = function effectMiddleware() {
  return function (next) {
    return function (action) {
      var type = action.type,
          payload = action.payload;


      if ((typeof payload === 'undefined' ? 'undefined' : _typeof(payload)) === 'object' && '@@effect/done' in payload) {
        return next({ type: type, payload: payload.data });
      } else {
        return next(action);
      }
    };
  };
};