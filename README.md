# vava

vava 基于 [redux]()、[redux-saga]() 和 [react-redux]() 封装，提供了简单的方法来以 **Model** 的方式组织 `state`、`reducer` 及 `effect`。

## 相关概念

### Triads

我们把含有（非必需） `state`、`reducers`、`effects` 的一个对象称为一个 **Triad**，如：

```javascript
{
  state: {

  },
  reducers: {

  },
  effects: {

  }
}
```

当然，空对象 `{ }` 同样可以作为一个 **triad**。

*（vava 中，**model** 也为一个 **triad**，由 `createStore` 注册时传入）*

#### effects

以 key / value 格式定义 effect，由 action 触发。

```javascript
*(action, effects) {

}
```

effects 包含所有 redux-saga 中所有可用 effects，另提供了：

`delay(ms)`：延迟。

`execEffect(action)`：用于触发指定 effect，返回 `Promise`。


## API

### `combineTriads(...triads)`

将多个 **triad** 合并为一个 **triad**。

---

### `createStore(opts)`

创建 redux store。

#### opts

* middlewares

  ```javascript
  middlewares: [
    routerMiddleware
  ]
  ```

* models

  以 key / value 格式注册 model，其中 key 被设置为该 model 的命名空间（namespace），value 为一个 **triad**。

  ```javascript
  models: {
    userModel
  }
  ```

* reducers

  指定 models 外的 reducer。

  ```javascript
  reducers: {
    routing: routerReducer,
  }
  ```

### `<Provider store >`

同 `react-redux`。

---

### `actions`

返回全部的 Action Creator，以 namespace 划分，用于 effects 等地方，如：

```javascript
yield put(actions.userModel.fetchData());
```
---

### `connect(mapModelToProps)`

```javascript
@connect(({
  userModel
}) => ({
  userModel
}))
```

组件中，userModel 的 state 位于 `this.props.userModel.state` 中，action 以 `this.props.userModel.xxx({ /* payload */ })` 方式派发。

*其中 mapModelToProps 返回值可用对象的 key 定义传入组件 props 的 model 的命名。*

---

### `awaitable(dispatcher)(payload): Promise`

派发可触发 effect 的 action 时，返回 Promise，方便组件中部分操作需要 `await` 的情境。

```javascript
await awaitable(this.props.userModel.xxx)({ /* payload */ })
```