<template>
  <div>
    <div>
      <div class='loginHeadDiv cl'>
        <div class='loginTabBar'>
          <mt-navbar v-model="selected">
            <mt-tab-item id="1">普通登录</mt-tab-item>
            <mt-tab-item id="2">动态密码</mt-tab-item>
          </mt-navbar>
          <!-- tab-container -->
          <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
              <mt-field :state='usernamestate' label="用户名" placeholder="请输入用户名" v-model="username" @input='usernameInp'></mt-field>
              <mt-field :state='passwordstate' label="密码" placeholder="请输入密码" type="password" v-model="password" @input='passwordInp'></mt-field>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
              <mt-field :state='usernamestate' label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
              <mt-field :state='passwordstate' label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
            </mt-tab-container-item>
          </mt-tab-container>
          <div class='loginBtn'>
            <p>忘记密码？</p>
            <mt-button type='danger' size='large' :disabled='btntype' @click.prevent='loginBtn'>登录</mt-button>
            <mt-button type='default' size='large' @click.prevent='gotoRegister'>注册</mt-button>
          </div>
          <div class='thirdLoginborder'>
            <h2>第三方登录</h2>
            <div class='thirdPic'>
              <div >
                <i class='iconfont icon-qq-copy'></i>
              </div>
              <div class='weiboPic'>
                <i class='iconfont icon-weibo'></i>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script>

import axios from "axios";
// axios.defaults.baseURL="http://localhost:3600";//本地地址
axios.defaults.baseURL="http://112.74.49.124:3600";//线上地址
import { Toast } from 'mint-ui';



export default {
  data(){
    return {
      selected:"1",
      btntype:true,
      username:'',
      password:"",
      usernamestate:"",
      passwordstate:""
    }
  },
  methods:{
    gotoRegister(){
      this.$router.push({name:'register'})
    },
    usernameInp(){
      // console.log(this.username)
      var uPattern = /^[a-zA-Z_$][0-9a-z_$]{5,11}$/ig;
      var pPattern = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      if(uPattern.test(this.username)||pPattern.test(this.username)){//测试通过
        this.usernamestate='success'
      }else{
        this.usernamestate='error'
      }
      console.log(this.usernamestate);
      this.checkregisterBtn();
    },
    passwordInp(){
      // console.log(this.username)
      var pPattern = /^[a-zA-Z_$][0-9a-zA-Z_$]{7,19}$/ig;
      if(pPattern.test(this.password)){//测试通过
        this.passwordstate='success'
      }else{
        this.passwordstate='error'
      }
      console.log(this.passwordstate);
      this.checkregisterBtn();
    },
    checkregisterBtn(){
      if(this.passwordstate=='success'&&this.usernamestate=='success'){//三个都满足了
        this.btntype=false;
      }else{
        this.btntype=true;
      }
    },
    loginBtn(){
      var val=this.username;
      var password=this.password;
      axios({
        method:"get",
        url:"/users/login",
        params:{
          val,
          password
        }
      }).then((res)=>{
        console.log(res);
        if(res.data.code==200){//登录成功
          Toast({
            position: 'middle',
            duration: 1000,
            message: res.data.msg,
            iconClass: 'icon icon-success'
          });
          localStorage.setItem('username',res.data.result.username);
          localStorage.setItem('phone',res.data.result.phone);
          this.$router.push({name:"my"});
        }else{//密码或账户错误
          console.log(222222);
          this.username="";
          this.password="";
          Toast({
            position: 'middle',
            duration: 1000,
            message: res.data.msg,
            iconClass: 'icon icon-success'
          });
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .loginHeadDiv{
      width:100%;
      height:4rem;
      position:relative;
      background:url('https://www.w555555.com/mobile/image/images/fh602-header.png') no-repeat left top;
      background-size:100% 100%;
      .loginTabBar{
        width:100%;
        // height:.8rem;
        margin-top:1.6rem;
        position:absolute;
        left:0;
        top:1rem;

        .mint-navbar{
          background-color:rgba(0,0,0,.2);
          .mint-tab-item{
            .mint-tab-item-label{
                font-size:.35rem !important;
            }
          }
          .is-selected{
            font-size:.3rem;
          }
        }
      }
      .loginBtn{
        width:100%;
        padding:.2rem .3rem;
        box-sizing:border-box;
        // padding-top:2.8rem;
        p{
          text-align:right;
          line-height:.6rem;
          font-size:.25rem;
          color:#888;
        }
        .mint-button{
          margin:.2rem 0;
          .mint-button--default{
              .mint-button-text{
                color:red;
              }
          }
        }


      }

      .thirdLoginborder{
        // width:85%;
        width:7rem;
        padding:0 .3rem;
        background:#999;
        height:.02rem;
        box-sizing:border-box;
        margin:auto;
        position:relative;
        margin-top:2rem;
        h2{
          // width:40%;
          width:2rem;
          line-height:.4rem;
          background-color:#fff;
          position:absolute;
          text-align:center;
          top:-.2rem;
          left:2.5rem;
          margin:auto;
          // margin-top:-.6rem;
        }
        .thirdPic{
          width:40%;
          // height:2rem;
          display:flex;
          flex-direction:row;
          justify-content:space-between;
          align-items:center;
          // margin-top:.6rem;
          div{
            width:1rem;
            height:1rem;
            border-radius:50%;
            margin:.3rem 0;
            .icon-qq-copy{
              color:blue;
              width:1rem;
              height:1rem;
              font-size:.8rem;

            }
            .icon-weibo{
              color:red;
              width:1rem;
              height:1rem;
              font-size:.8rem;
            }
          }
          .weiboPic{
            margin-right:.3rem;
          }
        }
      }
    }
</style>
