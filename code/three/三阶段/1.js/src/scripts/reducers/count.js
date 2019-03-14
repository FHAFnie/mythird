

import { COUNTADD, CHANGECITY } from "../actions";

export default (state=1807,action)=>{


    switch(action.type){

        case COUNTADD:
        // state.count += action.payload;
        // return {...state,count:state.count};
        return state+action.payload;
        break;

        default:
        return state;
        break;
    }

}