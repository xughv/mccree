import { createAction, handleActions } from "redux-actions";
import { put, call, takeEvery } from 'redux-saga/effects';
import * as sagaEffects from './efferts';

export function createModel(name = '', {
  state = {},
  effects = {},
  reducers = {},
}) {

  const actions = {};

  const subSagas = Object.keys(effects).map(key => {

    const subSaga = effects[key];
    const nkey = `${name}/${key}`;
    
    actions[key] = createAction(nkey);

    return call(function*() {
      yield takeEvery(nkey, function* ({ type, payload }) {

        // handle awaitable
        if (typeof payload === 'object' && '@@effect/done' in payload) {
          const done = payload['@@effect/done'];
          try {
            const result = yield subSaga({ type, payload: payload.data }, sagaEffects);
            setTimeout(() => done.resolve(result), 1);
          } catch(error) {
            console.log(`[ERROR] [effect](${type})`, error);
            done.reject(error);
          }
        } else {
          try {
            yield subSaga({ type, payload }, sagaEffects);
          } catch(error) {
            console.log(`[ERROR] [effect](${type})`, error);
          }
        }
      });
    })
  });
  
  const tmpReducers = {};
  Object.keys(reducers).forEach(key => {
    const nkey = `${name}/${key}`;
    !actions[key] && (actions[key] = createAction(nkey));
    tmpReducers[nkey] = reducers[key];
  });

  const reducer = Object.keys(reducers).length ?
    handleActions(tmpReducers, state) : handleActions({ _default: state => state }, state);
  
  const saga = subSagas.length ? function* () { yield subSagas } : null;

  return {
    name,
    actions,
    reducer,
    saga,
    effects,
    reducers,
  }

}
