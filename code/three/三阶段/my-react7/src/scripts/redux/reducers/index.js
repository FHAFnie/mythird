import { INCREMENT, CHANGECITY, CHANGEINPBYONE, CHANGETITLE } from "../actions";



const defaultState = {
    count:2019,
    city:'wuhan',
    msg:"wuhan1807 daydayup",
    title:"Are you ok",
    mv:[]
}


// 修改state 计算state
// Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State
export default (state=defaultState,action)=>{
    console.log(action);

    switch (action.type) {

        case "COUNT_ADD":
        state.count+=action.payload;
        console.log(state);
        return  {...state,...{count:state.count}}   // 一定返回新的state 后面的属性会覆盖前面的属性  react 响应式视图检测到数据变化
        break;

        case "count-desc":
        return {...state,...{count:state.count-action.payload}}
        break;

        case INCREMENT:
        return  {...state,...{count:state.count+action.payload}}
        break;

        case CHANGECITY:
        return {...state,...{city:action.city}}
        break;

        case CHANGEINPBYONE:
        return {...state,...{msg:action.inp}};
        break;

        case CHANGETITLE :
        return {...state,...{title:action.title}}
        break;

        case "changeData":
        return {...state,...{title:action.data}}
        break;

        case "changeMv":
        return {...state,...{mv:action.mv}}
        break;

        default:
        return state;
        break;
    }
}
