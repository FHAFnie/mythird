<template>
  <div>
      <div class='registerHead'>
        <mt-header fixed title="">
          <router-link to="/app/login" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
      </div>
      <h2 class='acountRegister'>账号注册</h2>
      <div class='registerField'>
        <mt-field :state='usernamestate' label="用户名" placeholder="用户名由6到12位数字字母下划线组成" v-model="username" @input='usernameInp'></mt-field>
        <mt-field :state='passwordstate' label="密码" placeholder="密码由8到20位数字字母下划线组成" type="password" v-model="password" @input='passwordInp'></mt-field>
        <mt-field :state='phonestate' label="手机号" placeholder="请输入手机号" type="tel" v-model="phone" @input='phoneInp'></mt-field>
      </div>
      <div class='btnDiv'>
        <mt-button type='primary' :disabled='btntype' size="large" @click.prevent='registerBtn'>注册</mt-button>
        <mt-button type='danger' size="large">登录</mt-button>
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
      username:"",
      password:"",
      phone:"",
      phonestate:"",
      usernamestate:"",
      passwordstate:"",
      btntype:true,
    }
  },
  methods:{
    usernameInp(){
      // console.log(this.username)
      var uPattern = /^[a-zA-Z_$][0-9a-z_$]{5,11}$/ig;
      if(uPattern.test(this.username)){//测试通过
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
    phoneInp(){
      // console.log(this.username)
      var pPattern = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      if(pPattern.test(this.phone)){//测试通过
        this.phonestate='success'
      }else{
        this.phonestate='error'
      }
      console.log(this.phonestate)
      this.checkregisterBtn();
    },
    checkregisterBtn(){
      if(this.phonestate=='success'&&this.passwordstate=='success'&&this.usernamestate=='success'){//三个都满足了
        this.btntype=false;
      }else{
        this.btntype=true;
      }
    },
    registerBtn(){
      console.log(2222);
      var username=this.username;
      var password=this.password;
      var phone=this.phone;
      console.log(username,password,phone)
      axios({
        method:"get",
        url:"/users/register",
        params:{
          username,
          password,
          phone,
        }
      }).then((res)=>{
        console.log(res);
        if(res.data.code==200){//注册成功
            Toast({
              position: 'middle',
              duration: 1000,
              message: res.data.msg,
              iconClass: 'mint-toast-icon mintui mintui-field-succes'
            });
             this.$router.push({name:"login"});
        }else{
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
    .registerHead{
      .mint-header{
        width:100%;
        background-color:#fff;
        color:#000;
        font-size:.5rem;
      }
    }
    .acountRegister{
      margin-top:1rem;
      font-size:.7rem;
      line-height:1rem;
      padding:.3rem .2rem;
    }
    .registerField{
      width:100%;
      // margin-top:.02rem;
    }

    .btnDiv{
      width:100%;
      padding:.2rem .2rem;
      box-sizing:border-box;
      .mint-button{
        margin:.2rem 0;
      }
    }
</style>
