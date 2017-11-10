import { actions, getModel } from 'vava';
export const userModel = {
  
  state: {
    name: ''
  },

  reducers: {
    saveNameSuccess: (state, { payload }) => ({
      ...state,
      name: payload.name,
    })
  },

  effects: {
    *saveName({ payload }, { put, delay }) {
      yield delay(2000);
      yield put(actions.userModel.saveNameSuccess({ name: payload }));
    },

    *execEffect({}, { execEffect }) {
      yield execEffect(actions.userModel.saveName('vava'));
      console.log('done');
    }
  },

};
