
import axios from "axios";
// axios.defaults.baseURL="http://localhost:3600";//本地地址
axios.defaults.baseURL="http://112.74.49.124:3600";//线上地址


export default {
  getAllGoods({commit},url){
    axios({
      method:"get",
      url:'/goods/getAllGoods',
      params:{}
    }).then((res)=>{
      // console.log(res);
      commit("getAllGoods",res);
    })
  },
  getSingleGood({commit},query){
    // console.log(query);
    axios({
      method:'get',
      url:'/goods/getSingleGood',
      params:query,
    }).then((res)=>{
      // console.log(res);
      commit('singleGood',res.data)
    })
  },
  getDetailspic({commit}){
    axios({
      method:'get',
      url:'/goods/getSingleGood',
      params:query,
    }).then((res)=>{
      // console.log(res);
      commit('singleGood',res.data)
    })
  },
  addCar({commit},{goodid,username,count}){
    // console.log(goodid);
    axios({
      method:'get',
      url:'/goods/addCar',
      params:{
        goodid,
        username,
        count
      }
    }).then((res)=>{
      console.log(res);
      commit('addCar',res);
    })
  },
  getusercar({commit},{username}){
    axios({
      method:'get',
      url:'/goods/usercar',
      params:{
        username
      }
    }).then((res)=>{
      // console.log(res);
      commit("getusercar",res.data)
    })
  },
  changeNum({commit},{id,type,changeNum,username,cb}){
    axios({
      method:'get',
      url:'/goods/changeNum',
      params:{
        id,
        type,
        username,
      }
    }).then((res)=>{
      // console.log(res);
      commit('changeNum',res.data);
      // cb();
    })
  },
  //单选
  checkOneById({commit},{usercar,cb}){
    // console.log(usercar);
    commit('checkOneById',usercar);
    cb();
  },
  //删除
  delGoods({commit},{delList,usercar,username}){
    // console.log(delList,usercar);
    var delstr=JSON.stringify(delList);
    axios({
      method:"get",
      url:"/goods/delcar",
      params:{
        delstr,
        username
      }
    }).then((res)=>{
      console.log(res);
      console.log(usercar);
      commit('checkOneById',usercar);
    })
  },
  //详情页切换
  changeShowgoods({commit},{value}){
    // console.log(value);
    commit('changeShowgoods',{value})
  },
}
