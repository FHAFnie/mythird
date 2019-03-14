

import {createStore } from "redux";

const store = createStore(()=>{});

const state = store.getState();

console.log(state);

export default store;