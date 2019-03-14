

import {createStore,applyMiddleware } from "redux";

import reducers from "./reducers"

import thunk from "redux-thunk";

import promise from "redux-promise"

const store = createStore(reducers,applyMiddleware(promise));  // createStore 接收一个函数 这个函数就是reducers 计算state

// const state = store.getState();

// console.log(state);

export default store;
