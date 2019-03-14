<template>
  <div class='goodsdetailDiv'>
    <mt-header title="商品详情">
      <router-link to="/app/goods/goodslist" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in singleGood.lunboPics" :key='index'>
        <img :src="item">
      </mt-swipe-item>
    </mt-swipe>

    <div class='goodpriceDiv'>
      <span class='goodprice'>￥{{goodinfo.price}}</span>
      <i class='iconfont icon-fenxiang'></i>
    </div>
    <div class='goodtitleDiv'>
      {{goodinfo.subtitle}}
    </div>
    <div class='goodnum'>
      <span> 购买数量：</span>
      <div class='numopt'>
        <span :class='goodnum>1?"numtext":"numtext disabledtext"' @click='addnum(-1)'>-</span>
        <input type="text" class='numinp' v-model="goodnum" >
        <span class='numtext' @click='addnum(1)'>+</span>
      </div>
    </div>
    <div class='goodpic'>
      <mt-navbar v-model="selected" class='goodtuijiantext'>
        <mt-tab-item id="1" >礼品详情</mt-tab-item>
        <mt-tab-item id="2">礼品参数</mt-tab-item>
        <mt-tab-item id="3">店铺推荐</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected" class='goodtuijianpic'>
        <mt-tab-container-item id="1" v-for="(item,index) in detailspic" :key="index">
          <img :src="item" class='tuijianpic'>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-cell v-for="n in 4" :title="'测试 ' + n" />
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <mt-cell v-for="n in 6" :title="'选项 ' + n" />
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class='detailfoot'>
        <div class='footbar'  @click.prevent='gotohome()'>
          <i class='iconfont icon-ziyuan'></i>
          <span>首页</span>
        </div>
        <div class='footbar' bindtap='gotocar' @click.prevent='buynow()'>
          <div class='carpic'>
              <i class='iconfont icon-gouwuche'></i>
              <span class='carnum'>{{num}}</span>
          </div>
          <div>购物车</div>
        </div>
        <div class='footbtn'>
          <span class='addCar' @click='addCar(goodinfo._id)'>加入购物车</span>
          <span class='buynow' @click='buynow()'>立即购买</span>
        </div>
    </div>
  </div>
</template>
<script>
import {mapActions,mapGetters,mapMutations,mapState} from "vuex";

import axios from "axios";
// axios.defaults.baseURL="http://localhost:3600";//本地地址
axios.defaults.baseURL="http://112.74.49.124:3600";//线上地址

import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';

export default {
  data(){
    return {
      goodnum:1,
      selected:'1',
      detailspic: [
        "http://112.74.49.124/base/homework/images/goodslist/131237982328.jpg",
        "http://112.74.49.124/base/homework/images/goodslist/131241372328.jpg",
        "http://112.74.49.124/base/homework/images/goodslist/131245602328.jpg",
        "http://112.74.49.124/base/homework/images/goodslist/131248702328.jpg",
        "http://112.74.49.124/base/homework/images/goodslist/131306692328.jpg",
        "http://112.74.49.124/base/homework/images/goodslist/131311982328.jpg",
        "http://112.74.49.124/base/homework/images/goodslist/131333772328.jpg",
        "http://112.74.49.124/base/homework/images/goodslist/131339352328.jpg",
        "http://112.74.49.124/base/homework/images/goodslist/131346582328.jpg",
        "http://112.74.49.124/base/homework/images/goodslist/131352172328.jpg",
        "http://112.74.49.124/base/homework/images/goodslist/131358582328.jpg"
      ],
    }
  },
  computed: {
    ...mapState(['singleGood','allgoods','goodinfo','num'])
  },
  methods: {
    ...mapActions(['getSingleGood','addCar','getusercar']),
    ...mapMutations(['initGoodNum']),
    addCar(goodid){
      // console.log(goodid);
      // var username='dahuang';
      if(localStorage.getItem('username')){
        // console.log(33333);
        var count=this.goodnum;
        var username=localStorage.getItem('username');
        this.$store.dispatch('addCar',{goodid,username,count});
        Toast({
          position: 'middle',
          duration: 1000,
          message: '加入成功',
          iconClass: 'icon icon-success'
        });
      }else{
        MessageBox.confirm("您还没有登录，马上登录",'加入购物车',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(res=>{
          if(res=='confirm'){
            //进入login
            this.$router.push({name:'login'});
          }
        }).catch(err=>{
          if(err=='cancel'){
            MessageBox({
              message: '你继续以游客身份访问'
            });
          }
        })
      }

    },
    addnum(num){
      this.goodnum+=num*1;
      if(this.goodnum<1){
        this.goodnum=1;
      }
    },
    buynow(goodid){
      // console.log(goodid);
      this.$router.push({name:'car'});
    },
    gotohome(){
      this.$router.push({name:'home'});
    }
  },
  created(){
    var query=this.$route.query;
    this.getSingleGood(query);
    if(localStorage.getItem('username')){
      //已登录
      var username=localStorage.getItem('username');
      this.getusercar({username});
    }else{
      this.initGoodNum();
    }

  },
  mounted() {
    // console.log(this.singleGood)
  },
}
</script>




<style lang="scss" scoped>
  .goodsdetailDiv{
    width:100%;
    height:100%;
    background-color:#eee;
    position:relative;
  }
  .mint-header{
    position:fixed;
    left:0;
    top:0rem;
    width:100%;
    z-index:999;
    // margin-bottom:1rem;
  }
    .mint-swipe{
      width:100%;
      height:5rem;
      margin-top:.8rem;
      img{
        width:100%;
        height:100%;
      }
    }
    .mint-header{
      background-color:orangered;
      font-size:.35rem;
      height:.8rem;
      margin-bottom:.15rem;
    }

    .goodpriceDiv{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding:.15rem .3rem;
      box-sizing: border-box;
      background-color:#fff;
      margin-top:.15rem;
    }
    .goodprice{
      width:.5rem;
      color:red;
      font-size: .4rem;
    }
    .goodpriceDiv image{
      width:.5rem;
      height:.5rem;
    }
    .goodtitleDiv{
      font-size: .35rem;
      color:#444;
      padding:.1rem .15rem;
      background-color:#fff;
    }
    .goodnum{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding:.15rem .15rem;
      align-items: center;
      height:.8rem;
      background-color:#fff;
      margin-bottom:.15rem;
      /* margin:20rpx; */
    }
    .texttap{
      width:100%;
      height:.15rem;
      background-color: #eee;
    }
    .numopt{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      font-size:.35rem;
    }
    .numtext{
      width:.7rem;
      height:.6rem;
      line-height: .5rem;
      border-radius: .1rem;
      border: .02rem solid #aaa;
      box-sizing: border-box;
      text-align: center;
      vertical-align: middle;
      color:#222;
    }
    .disabledtext{
      color:#aaa;
    }
    .numinp{
      width:.8rem;
      height: .6rem;
      border-radius: .1rem;
      border: .02rem solid #aaa;
      text-align: center;
      box-sizing: border-box;
      margin:0 .05rem;
      font-size:.3rem;
    }
    .goodpic{
      width:100%;
      height:100%;
      padding-bottom:.5rem;
      .goodtuijiantext{
        width:100%;
        height:1rem;
        font-size:.4rem;
        margin-bottom:.05rem;
        .mt-tab-item{
           font-size:.4rem;
          .mint-tab-item-label{
            font-size:.8rem;
          }
        }

      }

      .goodtuijianpic{
        width:100%;
        overflow-y:scroll;
        .tuijianpic{
          width:100%;

        }
      }
    }



    .detailfoot{
        width:100%;
        height:1.2rem;
        background-color: #fff;
        position: fixed;
        left: 0;
        bottom: 1.2rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-top: .02rem solid #eee;
        box-sizing: border-box;
              .footbar{
        width:15%;
        display: flex;
        height:100%;
        flex-direction: column;
        align-items: center;
        font-size: .3rem;
        justify-content:space-around;
        border-right: .02rem solid #eee;
        box-sizing: border-box;
        .icon-ziyuan,.icon-gouwuche{
          font-size:.4rem;

        }
      }
      .footbar image{
        width:.45rem;
        height:.45rem;
      }
      .footbtn{
        flex:1;
        height:100%;
        /* background-color: red; */
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: .3rem;
      }
      .footbtn span{
        width:100%;
        height:100%;
        line-height: 1rem;
        /* background-color: yellowgreen; */
        text-align: center;
      }
      .buynow{
        background-color: orangered;
        color:#fff;
      }
      .addCar{
        background-image:linear-gradient(to right,orange,orangered)
      }
      .carpic{
        position: relative;

      }
      .carnum{
        /* font-weight: 600; */
        width:.4rem;
        height:.4rem;
        font-size: .3rem;
        color:#fff;
        position: absolute;
        left: .3rem;
        top:-.07rem;
        background-color: orangered;
        /* width:30rpx; */
        /* height:30rpx; */
        padding:.03rem;
        border-radius: 50%;
        line-height: .4rem;
        text-align: center;
      }
    }



</style>
