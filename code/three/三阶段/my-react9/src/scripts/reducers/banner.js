

const defaultState =  {
    banner:[],
    goods:[],
    tabs:[]
}
export default (state=defaultState,action)=>{
  
    switch(action.type){
        case "getBanner":
        return {...state,banner:action.data};
        break;

        case "getGoods":
        // 数组去重 
        let tabs = [];
        action.data.forEach((val,index)=>{
            if(index<4){
                tabs.push({title:val.type.text,value:val.type.value})
            }
        });
        return {...state,goods:action.data,tabs};
        break;

        case "reverseData":
        return {...state,goods:state.goods.reverse() }

        default:
        return state;
        break;
    }

}