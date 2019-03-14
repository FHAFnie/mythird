<template>
  <div class="userinfobox">
      <h2 class="registerHead">登录</h2>
      <el-form :model="user" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input type="" v-model="user.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="确认密码" prop="dbpassword">
        <el-input type="password" v-model="user.dbpassword" autocomplete="off"></el-input>
      </el-form-item> -->
      <div class="subbtn">
        <el-button type="primary" @click="submitForm('user')">提交</el-button>
        <el-button @click="resetForm('user')">重置</el-button>
        <p>没有账号，马上<a href="" @click.prevent="gotoRegister">注册</a></p>
      </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
// axios.defaults.baseURL="http://localhost:3200";//本地地址
axios.defaults.baseURL="http://112.74.49.124:3200";//线上地址

  export default {
    data() {
      const validateUsername=(rule,value,callback)=>{
        console.log(111);
        // console.log(value);
        var reg=/^[a-zA-Z_$][0-9a-z_$]{5,11}$/ig;
        if(reg.test(value)){
          callback();
        }else{
          callback(new Error('用户名格式有误'));
        }
      };
      var validatePass = (rule, value, callback) => {
        // console.log(222);
        const reg=/^[a-zA-Z_$][0-9a-zA-Z_$]{7,19}$/ig;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if(reg.test(value)){
            // this.$refs.user.validateField('dbpassword');
            callback();
          }else{
            callback(new Error('密码格式有误'));
          }
        }
      };
      return {
        user: {
          username:"",
          password: '',
        },
        rules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}],
        }
      };
    },
    methods: {
      gotoRegister(){
        this.$router.push({name:"register"});
      },

      submitForm(formName) {
        console.log(this.user);

        axios({
          url:"/users/login",
          method:"post",
          data:this.user
        }).then((res)=>{
          console.log(res);
          var result=res.data;
          if(res.data.code==200){
            alert(result.msg);
            sessionStorage.username = this.user.username;
            this.$router.push({name:"home"});
          }else{
            alert(result.msg)
          }
          // console.log(111111111111);
        })
      },
      resetForm(formName) {
        this.user={};
      }
    }
  }
</script>
<style lang="scss" scoped>
.userinfobox{
  padding-right:40px;
  border-radius: 15px;
  position:absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin:auto;
  width: 30%;
  height: 300px;
  color:#000;
  background-color: rgba(255,225,225,.5);
  .registerHead{
    text-align: center;
    line-height: 50px;
    font-size: 30px;
    font-weight: 600;
  }
  .loginbox{
    p{
      text-align: right;
      font-size: 12px;
      padding-right:20px;
      a{
        color:orange;
      }
    }
    .loginbutton{
      margin-top: 10px;
      text-align: center;
    }
  }
}
.subbtn{
  text-align: center;
  p{
    margin-top: 15px;
    font-size: 12px;
  }
}
.el-form-item__label {
    text-align: right;
    float: left;
    font-size: 14px;
    color: #fff !important;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>



