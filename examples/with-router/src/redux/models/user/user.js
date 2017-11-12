import { actions, getModel } from 'mccree';
export const userModel = {
  
  state: {
    name: 'McCree'
  },

  reducers: {
    saveNameSuccess: (state, { payload }) => ({
      ...state,
      name: payload.name,
    })
  },

  effects: {
    *saveName({ payload }, { put, delay }) {
      yield delay(1000);
      yield put(actions.userModel.saveNameSuccess({ name: payload }));
    },

    *execEffect({}, { execEffect }) {
      yield execEffect(actions.userModel.saveName('execEffect'));
      console.log('done');
    }
  },

};
