
import axios from "axios";
// axios.defaults.baseURL="http://localhost:3200";//本地地址
axios.defaults.baseURL="http://112.74.49.124:3200";//线上地址
http://112.74.49.124:3200/goods/getIndexGoods
export default {
  getAllgoods({commit},url){
    // console.log(pageNum);
    axios({
          method:"get",
          url:"/goods/getIndexGoods",
            params:{},
        }).then((res)=>{
            commit("getAllgoods",res.data.result);
        })
  },
  singleGoods({commit},id){
      console.log(22222);
      // console.log(para);
      axios({
        url:"",
        method:"get",
        url:"/goods/getIndexGoods",
        params:{},
      }).then((res)=>{
        console.log(res);
        var goods=res.data.result.filter((item,index)=>{
            return item._id==id;
        })
        // console.log(goods);
        commit('getGoodsinfo',goods[0])
      })
  },
  getSomeGoods({commit},val){
    console.log(val);
    axios({
      method:"get",
      url:"",
      params:{
        pageNum:val
      }
    }).then((res)=>{
      // console.log(res);
      console.log(11111,9999);
    })
  },
  addGoodsCar({commit},obj){//添加到购物车
    // console.log(obj);
    var good=obj.good;
    var num=obj.num;
    // console.log(good,num);
    good.count=good.count||1;
    const username=sessionStorage.username;
    // console.log(sessionStorage.username);
    //现在可以添加到数据库了
    axios({
      method:"get",
      url:"/goods/addGoodscar",
      params:{
        gid:good._id,
        num,
        goodscount:(good.count)*1,
        goodsprice:good.localPrice,
        goodspic:good.spriteSheet,
        goodstitle:good.subtitle,
        username
      }
    }).then((res)=>{
      console.log(res);
      // alert(res.data.msg);
      let num=0;
      res.data.forEach((item,index)=>{
        num+=item.goodscount*1;
      })
      console.log(num);
      console.log(res);
      commit("addGoodsCar",{num,res});
    })
  },
  getusergoodscar({commit}){//获取用户购物车数据
    console.log(sessionStorage.username);
    console.log(1111111111111);
    if(sessionStorage.username){//判断是否登录
      //获取数据
      axios({
        method:"get",
        url:"/goods/getusergoodscar",
        params:{
          username:sessionStorage.username,
        }
      }).then((res)=>{
        console.log(98989898989);
        const goodscarinfo=res.data.result;
        if(goodscarinfo){
          commit("getusergoodscar",goodscarinfo);
        }
      })
    }
  },
  updateData({commit},obj){
    console.log(obj);
    console.log(89898090809)
    const username=sessionStorage.username;
    obj.username=username;
    console.log(obj);
    axios({
      url:"/goods/updateData",
      method:"post",
      data:obj,
    }).then((res)=>{
      const goodscarinfo=res.data.data;
      commit("getusergoodscar",goodscarinfo);
    })
  },
  removeData({commit},obj){
    console.log(obj.gid);
    axios({
      method:"post",
      url:"/goods/removeData",
      data:obj
    }).then((res)=>{
        console.log(11111);
    })
  },
  changeType({commit},obj){
    console.log(55555);
  }
}
