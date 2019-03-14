
// State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。
// Action 就是 View 发出的通知，表示 State 应该要发生变化了

// action 只能是对象



export const  COUNTDESC = "COUNTDESC"   // action.type 即暴露  又定义

export const countDesc =  {
    type:'count-desc',
    payload:20
}

export const INCREMENT = "INCREMENT";
// action creators  看起来 是函数 本质必须返回对象
export const increment = (payload)=>{
    return {
        type:INCREMENT,
        payload
    }
}

export const CHANGEINPBYONE = "CHANGEINPBYONE"
export const changeInpByOne = (inp)=>(
    {
        type:CHANGEINPBYONE,
        inp
    }
)

export const CHANGECITY = "CHANGECITY"
export function changeCity(city){
    return {
        type:CHANGECITY,
        city
    }
}

export const CHANGETITLE = "CHANGETITLE"
export const changeTitle = ({title,callback}) => {

    return {
        type:CHANGETITLE,
        title
    }
    callback();
}


import axios from "axios";

export const changeData = ({url}) => {
    return axios.get(url)
    .then(res=>{
        return {
            type:"changeData",
            data:res.data
        }
    })
}


export const changeMv = ({url}) => (
    axios.get(url)
    .then(res=>(
        {
            type:"changeMv",
            mv:res.data
        }
    ))
)
