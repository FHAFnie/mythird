<template>
  <div class="goodslistDiv">
    <div class="homeHead">
        <div class="headlogo">
            <img :src="homePic" >
        </div>
        <div class="searchDiv">
          <img :src="searchPic" class='searchBtn'>
          <input type="text" placeholder='搜索'>
        </div>
    </div>

    <div class='goodsDiv'>
      <div class='leftDiv'>
          <div v-for="(item,index) in goodstypes" :key="index" :class='selectBar==item.value?"leftItem selectItem":"leftItem"'
          @click='changeSelectBar(item.value)'
          >
              {{item.text}}
          </div>
      </div>
      <div class='rightDiv'>

          <a
            class='showGoodsDiv'
            v-for='(item,index) in showgoods'
            :key="index"
            @click.prevent="gotodetail(item._id)"
          >
            <img :src="item.pdpUrl" >
            <span class='goodstext' >{{item.subtitle}}</span>
            <div>
              <span class='goodsprice'>￥{{item.price}}</span>
            </div>
          </a>
      </div>
    </div>
  </div>
</template>


<script>
import homePic from "../assets/imgs/home2.png";
import searchPic from '../assets/imgs/search.png';

import axios from "axios";
// axios.defaults.baseURL="http://localhost:3600";//本地地址
axios.defaults.baseURL="http://112.74.49.124:3600";//线上地址

import {mapState,mapActions,mapMutations} from "vuex";
// import {mapActions,mapState,mapMutations} from "vuex";
export default {
  data(){
    return {
      value:"",
      homePic,
      searchPic,
      selectBar:"wine"
    }
  },
  computed:{
    ...mapState(["allgoods",'goodstypes','showgoods'])
  },
  methods:{
    ...mapActions(['getAllGoods','changeShowgoods']),
    ...mapMutations([]),
    gotodetail(goodid){
      // console.log(goodid);
      // console.log(this.$router);
      this.$router.push({name:'goodsdetail',query:{goodid}})
    },
    changeSelectBar(value){
      this.selectBar=value;
      this.changeShowgoods({value});
    }
  },
  created(){
    this.getAllGoods();
  }
}
</script>


<style lang="scss" scoped>
  .homeHead{
    width:100%;
    background-color: orangered;
    height:.8rem;
    padding:.2rem .1rem;
    display:flex;
    box-sizing: border-box;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;
    position:fixed;
    left:0;
    top:0;
    .searchDiv{
      flex: 1;
      height:.6rem;
      background-color: #fff;
      font-size: .3rem;
      line-height: .6rem;;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-radius: .1rem;
      .searchBtn{
        width:.5rem;
        height:.5rem;
      }
      input{
        flex:1;
        height:.5rem;
        border:0;
        font-size: .35rem;
        text-indent: .15rem;
      }
    }
    .headlogo{
      width:10%;
      height:.6rem;
      display:flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      img{
        width:.5rem;
        height:.5rem;
      }
    }
  }
  .goodsDiv{
    border-top: .02rem solid #eee;
    width:100%;
    height:100%;
    overflow: hidden;
    font-size: .28rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top:1rem;
  }
  .leftDiv{
    width:30%;
    height:100%;
    border-right: .02rem solid #eee;
    padding-top: .1rem;
    position:fixed;
    left:0;
    top:0.8rem;
    background-color:#fff;
  }
  .leftItem{
    margin:.15rem .05rem;
    padding:.1rem .05rem;
    text-align: center;
  }
  .selectItem{
    border-radius: .3rem;
    background-color: orange;
    color:#fff;
  }
  .rightDiv{
    flex:1;
    height:100%;
    width:70%;
    margin-left:2.4rem;
    overflow-y:scroll;
    // margin-left:
  }
  .showGoodsDiv{
    width:100%;
    margin-bottom: .15rem;
    font-size: .28rem;
    color:#333;
    display: flex;
    flex-direction: column;
  }
  .rightDiv img{
    width:100%;
    height:4rem;
  }
  .goodstext{
    /* text-indent: 30rpx; */
    padding:.05rem .15rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .goodsprice{
    padding:.05rem .15rem;
    color:orangered;
    font-size: .3rem;
  }
</style>
