import { createAction, handleActions } from "redux-actions";
import { call, takeEvery } from 'redux-saga/effects';
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
        if (typeof payload === 'object' && '@@done' in payload) {
          const done = payload['@@done'];
          try {
            yield subSaga({ type, payload: payload.data }, sagaEffects);
            done.resolve();
          } catch(err) {
            done.reject(err);
          }
        } else {
          yield subSaga({ payload }, sagaEffects);
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

  const reducer = Object.keys(reducers).length ? handleActions(tmpReducers, state) : null;
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
