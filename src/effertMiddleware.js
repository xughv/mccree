
// export function effeMiddleware(models) {

//   const promiseMap = {};

//   const middleware = () => next => action => {
//     const { type } = action;
//     if (isEffect(type)) {
//       return new Promise((resolve, reject) => {
//         promiseMap[type] = {
//           resolve: createWrapper(type, resolve),
//           reject: createWrapper(type, reject),
//         };
//       });
//     }
//     next(action);
//   };

//   function isEffect(type) {
//     const [ name ] = type.split('/');
//     const model = models.filter(m => m.name === name)[0];
//     if (model) {
//       if (model.effects && model.effects[type]) {
//         return true;
//       }
//     }

//     return false;
//   }

//   const createWrapper = (type, fn) => args => {
//     if (promiseMap[type]) delete promiseMap[type];
//     fn(args);
//   }

//   function resolve(type, args) {
//     if (promiseMap[type]) {
//       promiseMap[type].resolve(args);
//     }
//   }

//   function reject(type, args) {
//     if (promiseMap[type]) {
//       promiseMap[type].reject(args);
//     }
//   }

//   return {
//     middleware,
//     resolve,
//     reject,
//   };
// }
