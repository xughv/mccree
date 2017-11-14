# McCree

McCree 基于 [redux](https://github.com/reactjs/redux)、[redux-saga](https://github.com/redux-saga/redux-saga) 和 [react-redux](https://github.com/reactjs/react-redux) 封装，提供了简单的方法来以 **Model** 的方式组织 `state`、`reducer` 及 `effect`。(Inspired by [dva](https://github.com/dvajs/dva) and [mirror](https://github.com/mirrorjs/mirror))

## 安装

```
npm install mccree --save
```

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

*（mccree 中，**model** 也为一个 **triad**，由 `createStore` 注册时传入）*

#### state

表示 **model** 的状态数据。

#### reducers

同 [redux 中 reducer](https://redux.js.org/docs/basics/Reducers.html)，用来处理 action，改变 **model** 中 `state`。

#### effects

以 key / value 格式定义 effect，由 action 触发。

```javascript
*(action, effects) {

}
```

参数中 `effects` 对象中包含 [redux-saga](https://redux-saga.js.org/docs/api/index.html) 中所有可用的 effects，另提供了：

`delay(ms)`：延迟。

`execEffect(action)`：用于触发指定 effect，返回 `Promise`。

---

#### action

使用 `reducers` 及 `effects` 中的 key 作为 action type，dispatch 后会触发相应 `reducers`/`effects`。

## API

### `combineTriads(...triads)`

将多个 **triad** 合并为一个 **triad**。

---

### `createStore(opts)`

创建 redux store。

#### opts

* `middlewares`

  ```javascript
  middlewares: [
    routerMiddleware
  ]
  ```

* `models`

  以 key / value 格式注册 model，其中 key 被设置为该 model 的命名空间（namespace），value 为一个 **triad**。

  ```javascript
  models: {
    userModel
  }
  ```

* `reducers`

  指定 models 外的 reducer。

  ```javascript
  reducers: {
    routing: routerReducer,
  }
  ```

### `<Provider store >`

  同 [react-redux/Provider](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store)

### `connect([mapModelToProps], [mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`

`connect` 用于连接 **redux** 和组件。

* `[mapModelToProps(models): modelPorps]` (*Function*)

  **model** 中定义的 `state` 位于 `model.state` 中， `action` 在传入后以 `model.xxx({ /* payload */ })` 方式派发。

  ```javascript
  @connect(({ userModel }) => ({
    userModel
  }))
  ```

* `[mapStateToProps(state, [ownProps]): stateProps]` (*Function*):

  同 [react-redux/connect[mapStateToProps]](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)

* `[mapDispatchToProps(dispatch, [ownProps]): dispatchProps]` (*Object* or *Function*):

  同 [react-redux/connect[mapDispatchToProps]](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)

* `[mergeProps(modelProps, stateProps, dispatchProps, ownProps): props]` (*Function*):

  等同 [react-redux/connect[mergeProps]](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)，添加了 `modelProps`。

* `[options]` (*Object*)

  同 [react-redux/connect[options]](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
  
---

### `awaitable(dispatcher)(payload): Promise`

派发可触发 effect 的 action 时，返回 Promise，方便组件中部分操作需要 `await` 的情境。

```javascript
await awaitable(this.props.userModel.xxx)({ /* payload */ })
```

---

### `actions` 对象

包含全部的 Action Creator，以 namespace 划分，可用于 `effects` 等处，如：

```javascript
yield put(actions.userModel.fetchData());
```
