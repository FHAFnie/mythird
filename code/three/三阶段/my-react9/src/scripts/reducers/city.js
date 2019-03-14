

import { COUNTADD, CHANGECITY } from "../actions";

export default (state='东京和巴黎',action)=>{
   

    switch(action.type){

        case CHANGECITY:
        return action.city;
        break;

        
        default:
        return state;
        break;
    }

}