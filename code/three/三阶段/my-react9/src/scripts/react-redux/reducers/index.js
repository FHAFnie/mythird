

const defaultState = {
    count:2019,
    city:"武汉"
}


export default (state=defaultState,action)=>{
    console.log(action)
    switch(action.type){

        case "ADD":
        return {...state,count:state.count+action.payload};
        break;

        case "increment":
        return {...state,count:state.count-action.payload};
        break;

        case "changeCity":
        return {...state,city:action.city};
        break;

        default:
        return state;
        break;
    }
}