import store from "./store";
export default {
  getAllGoods(state,val){
    // console.log(val);
    state.allgoods=val.data[0];
    state.goodstypes=val.data[1];
    // state.showgoods=val.data[0].
    var showgoods=val.data[0].filter((item,index)=>{
        return item.types.value=="wine";
    })
    state.showgoods=showgoods;
    // console.log(showgoods);
  },
  singleGood(state,val){
    // console.log(val);
    state.singleGood=val;
    state.goodinfo=val;
  },
  addCar(state,result){
    // console.log(result);
    var allusercar=result.data;
    var num=0;
    allusercar.forEach((item,index)=>{
      num+=item.count*1;
    })
    // console.log(num)
    state.num=num;
  },
  getusercar(state,usercar){
    // console.log(usercar);
    var allusercar=usercar;
    var num=0;
    allusercar.forEach((item,index)=>{
      num+=item.count*1;
    })
    // console.log(num)
    state.num=num;
    state.usercar=usercar;
  },
  changeNum(state,result){
    // console.log(result);
    state.usercar=result;
  },
  checkOneById(state,usercar){
    // console.log(usercar);
    var flag=true;
    var num=0;
    usercar.forEach((item,index)=>{
      if(!item.checked){
        flag=false;
      }
      num+=item.count*1;
    })
    state.all=flag;
    state.num=num;
    state.usercar=usercar;
  },
  getNewusercar(state,{newusercar,val}){
    // console.log(newusercar)
    state.usercar=newusercar;
    state.all=val;
  },
  // delGoods(state,usercar){
  //   state.usercar=usercar;
  // }
  changeShowgoods(state,{value}){
    var showgoods=state.allgoods.filter((item,index)=>{
      return item.types.value==value
    })
    state.showgoods=showgoods;
  },
  //没有登录，数量初始化为0;
  initGoodNum(state){
    state.num=0;
  }
}
