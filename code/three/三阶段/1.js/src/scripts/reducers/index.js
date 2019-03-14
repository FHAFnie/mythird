import { COUNTADD, CHANGECITY } from "../actions";

import {combineReducers } from "redux";
import count from "./count";
import city from "./city";
import banner from "./banner";


// reducers 拆分 
const reducers = combineReducers({
    count:count,
    city,
    banner:banner
})

export default reducers;
// const defaultState = {
//     count:2019,
//     city:"wuhan",
//     banner:[]
// }

// export default (state=defaultState,action)=>{
//     console.log(action);

//     switch(action.type){

//         case COUNTADD:
//         state.count += action.payload;
//         return {...state,count:state.count};
//         break;

//         case CHANGECITY:
//         return {...state,city:action.city};
//         break;

//         case "getBanner":
//         return {...state,banner:action.data};
//         break;

//         default:
//         return state;
//         break;
//     }

// }