import store from "./store";
export default {
  getAllgoods(state,val){
    state.allgoods=val;
    state.hotGoods=state.allgoods.slice(10,16);
    state.goodsIndexGoods=state.allgoods.slice(0,6);
    state.allCounts=state.allgoods.length;
    state.showgoods=state.allgoods.slice(0,16);
    state.typegoods=state.allgoods;
  },
  getGoodsinfo(state,goods){
    // console.log(para);
    const goodsinfo=goods;
    // console.log(para);
    console.log(99999)
    state.singleGoods=goodsinfo;
    state.singlegoodscar.gid=goodsinfo._id;
    state.singlegoodscar.price=goodsinfo.localPrice.slice(1,);
    state.singlegoodscar.pic=goodsinfo.spriteSheet;
    state.singlegoodscar.title=goodsinfo.subtitle;
  },
  singleshopcar(state,singleGoods){
    console.log(11111)
  },
  delsinglegoodscar(state){
    state.singlegoodscar.gid="";
    state.singlegoodscar.price="";
    state.singlegoodscar.pic="";
    state.singlegoodscar.title="";
  },
  addGoodsCar(state,obj){
    state.goodscarnum=obj.num;
    state.goodscar=obj.res.data.result;
  },
  getusergoodscar(state,goodscarinfo){//页面加载的时候，获取用户购物车信息
    console.log(goodscarinfo);
    state.goodscar=goodscarinfo;
    state.goodscarnum=0;
    goodscarinfo.forEach((item,index)=>{
      console.log(item.goodscount);
      state.goodscarnum+=item.goodscount*1
    })
    console.log(state.goodscarnum);
  },
  // updateNum(state,newVal){
  //   console.log(newVal);
  // }
  getshowgoods(state,obj){
    // console.log(obj.start,obj.end);
    // console.log(state);
    console.log(state.typegoods);
    // state.showgoods=state.allgoods.slice(obj.start,obj.end);
    state.showgoods=state.typegoods.filter((item,index)=>{
      if(index>=obj.start&&index<obj.end){
        return item;
      }
    })
    console.log(state.showgoods);
    // console.log(99988881111)
  },
  getSomeGoods(state,obj){
    console.log(obj.start,obj.end);
    state.showgoods=null;
    // state.showgoods=state.allgoods.slice(obj.start,obj.end);
    state.showgoods=state.typegoods.filter((item,index)=>{
      if(index>=obj.start&&index<obj.end){
        return item;
      }
    })
    console.log(state.showgoods);
  },
  changeType(state,typegoods){
    state.showgoods=typegoods.slice(0,16);
    state.typegoods=typegoods;
  },
  updateSearchInp(state,val){
    console.log(val,33333);
    state.searchInp=val;
  }
}
