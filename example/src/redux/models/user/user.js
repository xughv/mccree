import { actions, getModel } from 'vava';
import { delay } from '../../help';

export const userModel = {
  
  state: {
    name: ''
  },

  reducers: {
    fetchNameSuccess: (state, { payload }) => ({
      ...state,
      name: payload.name,
    })
  },

  effects: {
    *fetchName({}, { put }) {
      yield delay(2000);
      yield put(actions['userModel'].fetchNameSuccess({ name: 'VAVA' }));
    }
  },

};
