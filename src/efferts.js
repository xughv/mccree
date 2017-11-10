import {
  take,
  takem,
  put,
  all,
  race,
  call,
  apply,
  cps,
  fork,
  spawn,
  join,
  cancel,
  select,
  actionChannel,
  cancelled,
  flush,
  getContext,
  setContext,
  takeEvery,
  takeLatest,
  throttle,
} from 'redux-saga/effects';
import { getStore } from './store';

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));
const execEffect = action => {
  const { payload } = action;
  
  return new Promise((resolve, reject) => {
    action.payload = {
      data: payload,
      '@@done': { resolve, reject },
    }
    getStore().dispatch(action);
  });
}

export {
  delay,
  execEffect,

  take,
  takem,
  put,
  all,
  race,
  call,
  apply,
  cps,
  fork,
  spawn,
  join,
  cancel,
  select,
  actionChannel,
  cancelled,
  flush,
  getContext,
  setContext,
  takeEvery,
  takeLatest,
  throttle,
}
