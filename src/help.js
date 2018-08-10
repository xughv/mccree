export function combineTriads(...triads) {

  let state = {}, reducers = {}, effects = {};

  triads.forEach(triad => {
    state = {
      ...state,
      ...(triad.state || {}),
    }
    reducers = {
      ...reducers,
      ...(triad.reducers || {}),
    }
    effects = {
      ...effects,
      ...(triad.effects || {}),
    }
  });

  return { state, reducers, effects };
}

export const awaitable = dispatcher => payload => {
  return new Promise((resolve, reject) => {
    dispatcher({
      data: payload,
      '@@effect/done': { resolve, reject },
    });
  });
}
