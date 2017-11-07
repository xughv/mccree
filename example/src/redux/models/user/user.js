import { createModel, actions } from 'vava';
import { delay } from '../../help';

export default createModel({
  
  name: 'user',

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
      yield put(actions['user'].fetchNameSuccess({ name: 'Vava' }));
    }
  }

});