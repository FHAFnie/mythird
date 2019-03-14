
import axios from "axios";

export default {
    // Action 提交的是 mutation，而不是直接变更状态。  commit 提交 mutation
    // Action 可以包含任意异步操作。
    add( {commit:commit},payload ){
        console.log("actions "+  payload);
        commit("add",payload);
    },
    desc(context,payload){
        // context = {commit}  = {commit:commit}
        // 
        context.commit("desc",payload)
        console.log("desc....")
    },
    changeCity({commit},city){
        commit("changeCity",city);
    },
    getMv({commit},{url,limit,cb}){
        axios.get(url,{
        params:{
            limit:limit
        }
        }).then(res=>{
        console.log(res);
        cb();
        commit("getMv",res.data)
        })
    },
    getAllGoods({commit},{url,callback}){
        axios.get(url)
        .then(res=>{
            callback();
            commit('getAllGoods',res.data.result)
        })
    },

    getGoods({commit},{url,_id,cb}){
        axios.get(url,{
            params:{
                id:_id
            }
        }).then(res=>{
           cb();
           commit("getGoods",res.data.result);
        })
    },

    addCarList({commit},{url,count,mobile,goods,cb}){
        axios.get(
            url,
            {
                params:{
                    count,
                    mobile,
                    goods
                }
            }
        ).then(res=>{
            console.log(res);
            cb();
            commit("addCarList")
        })
    },

    getCarList({commit},{url,mobile,cb}){
        axios.get(
            url,
            {
                params:{
                    mobile,
                }
            }
        ).then(res=>{
            console.log(res);
            cb();
            commit("getCarList",res.data.result);
        })
    },
    setTotal({commit},{priceTotal,selectNum}){
        commit("setTotal",{priceTotal,selectNum})
    },
    delCheckAsync({commit},{url,list,cb}){
        axios.get(
            url,
            {
                params:{
                    list:JSON.stringify(list),
                }
            }
        ).then(res=>{
            console.log(res);
            cb();
            commit("delCheckAsync");
        })
    },
    delOneAsync({commit},{url,_id,cb}){
        axios.get(
            url,
            {
                params:{
                    _id
                }
            }
        ).then(res=>{
            console.log(res);
            cb(res.data);
            commit("delOneAsync");
        })
    },
    setCarListCount({commit},{url,count,goodsId,mobile,cb}){
        axios.get(
            url,
            {
                params:{
                    count,
                    goodsId,
                    mobile
                }
            }
        ).then(res=>{
            console.log(res);
            cb(res.data);
            commit("delOneAsync");
        })
    }
}