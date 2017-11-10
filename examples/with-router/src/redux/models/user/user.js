import { actions, getModel } from 'mccree';
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
      yield execEffect(actions.userModel.saveName('mccree'));
      console.log('done');
    }
  },

};
