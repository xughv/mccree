export const effectMiddleware = () => next => action => {
  const { type, payload } = action;
  if (typeof payload === 'object' && '@@done' in payload) {
    return next({ type, payload: payload.data });
  } else {
    return next(action);
  }
};
