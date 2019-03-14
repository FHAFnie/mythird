import { COUNTADD, CHANGECITY } from "../actions";



const defaultState = {
    count:2019,
    city:"wuhan",
    banner:[]
}

export default (state=defaultState,action)=>{
    console.log(action);

    switch(action.type){

        case COUNTADD:
        state.count += action.payload;
        return {...state,count:state.count};
        break;

        case CHANGECITY:
        return {...state,city:action.city};
        break;

        case "getBanner":
        return {...state,banner:action.data};
        break;

        default:
        return state;
        break;
    }

}