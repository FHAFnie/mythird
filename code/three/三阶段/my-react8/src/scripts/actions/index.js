

export const COUNTADD = "countAdd"
export const countAdd = payload => {
    return {
        type:COUNTADD,
        payload
    }
}


export const CHANGECITY = "changeCity"
export const changeCity = city => {
    return {
        type:CHANGECITY,
        city
    }
}




import axios from "axios"
export const getBanner = ({url,limit,cb})=>{
    return  axios.get(url,{
        params:{
            limit
        }
    }).then(res=>{
       console.log(res); 
       return {
           type:"getBanner",
           data:res.data.result
       }
       cb()
    })
}