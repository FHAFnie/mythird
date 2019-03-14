<template>
  <div class="myBox">
    <div class='carHead'>
      <mt-header title="我的" class='my'>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <div class="my-head">
      <div class="userInfo">
        <div class='userinfoBox'>
          <i class='iconfont icon-xiugaitouxiang'></i>
        </div>
        <span class='login' @click='gotoLogin'>{{loginFlag?"欢迎你,"+username:"立即登录"}}</span>
      </div>
    </div>


    <ul class='mychoseDiv'>
      <li class='mychoseItem' v-for="(item,index) in mychoseList" :key="index">
        <i :class='item.icon'></i>
        <span>{{item.text}}</span>
      </li>
    </ul>

    <div>
      <mt-cell title="我的积分" is-link>
        <span style="color: green">202点</span>
      </mt-cell>
      <mt-cell title="我的优惠券" is-link slot="icon">
        <span style="color: green">0张</span>
      </mt-cell>
      <mt-cell title="生日管家" is-link>
        <span style="color: green" ></span>
      </mt-cell>
      <mt-cell title="我的收获地址" is-link slot="icon">
        <span style="color: green"></span>
      </mt-cell>
      <mt-cell title="我是商家" is-link>
        <span style="color: green" ></span>
      </mt-cell>
      <mt-cell title="客服与反馈" is-link slot="icon">
        <span style="color: green"></span>
      </mt-cell>
    </div>
    <div v-if='loginFlag'>
      <mt-button type='danger' size='large' @click.prevent='loginOut'>退出登录</mt-button>
    </div>
  </div>
</template>



<script>

import huangguan from "../assets/imgs/huangguan.png";
import youhuiquan from "../assets/imgs/youhuiquan.png";
import shengri from "../assets/imgs/shengri.png";
import dizhi from "../assets/imgs/dizhi.png";
import shangjia from "../assets/imgs/shangjia.png";
import fankui from "../assets/imgs/fankui.png";



export default {
  data(){
    return {
      huangguan,
      youhuiquan,
      username:"",
      phone:"",
      userpic:"",
      loginFlag:false,
      mychoseList:[
        {text:'我的账户',icon:'iconfont icon-xiugaitouxiang'},
        {text:'采购订单',icon:'iconfont icon-dingdan'},
        {text:'我的收藏',icon:'iconfont icon-shoucang'},
        {text:'我要分销',icon:'iconfont icon-fenxiang'},
      ]
    }
  },
  methods:{
    gotoLogin(){
      if(!localStorage.getItem('username')){
        this.$router.push({name:'login'});
      }
    },
    loginOut(){
      console.log('退出登录');
      localStorage.removeItem('username');
      localStorage.removeItem('phone');
      this.$router.push({name:"login"});
    }
  },
  created(){
    if(localStorage.getItem('username')){//已经登录
      this.username=localStorage.getItem('username');
      this.phone=localStorage.getItem('phone');
      console.log(this.username);
      this.loginFlag=true;
    }else{
      this.loginFlag=false;
      console.log("没有登录");
    }
  }
}
</script>
<style lang="scss" scoped>
  .myBox{
    padding-bottom:.1rem;
    background-color:#eee;
    position:relative;
    .my-head{
      width:100%;
      height:3rem;
      position:relative;
      margin-top:.8rem;
      background-image:linear-gradient(to right,#ef4f4f, #4caf50);
      .login{
        font-size:.4rem;
        color:#fff;
      }
      .bgPic{
        width:100%;
        height:2.5rem;
      }
      .userInfo{
        position:absolute;
        left: 0.2rem;
        top: 0;
        bottom: 0;
        margin:auto;
        display: flex;
        flex-direction:row;
        justify-content: center;
        align-items: center;
        width:80%;
        .userinfoBox{
          width:1.5rem;
          height:1.5rem;
          text-align:center;
          line-height:1.5rem;
          border-radius:50%;
          background-color:#eee;
          margin-right:.3rem;
        }
        .icon-xiugaitouxiang{
          font-size:.8rem;
        }
        .userIcon{
          margin-right: 0.1rem;
          width:1rem;
          height:1rem;
          border-radius: 50%;
          border:0.01rem solid #eee;
        }
      }
    }
    .carHead{
      position:fixed;
      width:100%;
      left:0;
      top:0;
      z-index:999;
      .mintui{
        font-size:.5rem;
      }
      .mint-header{
        width:100%;
        height:.8rem;
        background-color:orangered;
        font-size:.4rem;
      }
    }


    .mychoseDiv{
      display:flex;
      flex-direction:row;
      justify-content:space-around;
      align-items:center;
      padding:.3rem .15rem;
      background-color:#fff;
      .mychoseItem{
        display:flex;
        justify-content:space-around;
        align-items:center;
        flex-direction:column;
        .iconfont{
          font-size:.5rem;
          width:.5rem;
          height:.5rem;
          margin-bottom:.2rem;
        }
      }
    }


  }
</style>
