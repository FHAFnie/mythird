


export {COUNTADD,countAdd} from "./count";
 
export {CHANGECITY,changeCity} from "./city";




import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3100";  // 本地接口
axios.defaults.baseURL = "http://47.94.208.182:3100";  // 线上接口


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

export const getGoods = ({url,callback})=>{
    return axios.get(url,{

    }).then(res=>{
       console.log(res); 
       callback();
       return {
           type:"getGoods",
           data:res.data.result
       }
       
    })
}


export const reverseData = ()=>{
    return {
        type:"reverseData",
    }
}

