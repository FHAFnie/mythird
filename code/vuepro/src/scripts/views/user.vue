<template>
<div class="registerbox">
      <router-view></router-view>
</div>
</template>

<script>
  export default {
    data() {
      var checkMobile = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
              callback();
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          mobile: '',
          password: '',
          checkPass: ''

        },
        rules2: {
          mobile: [
            { validator: checkMobile, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]

        }
      };
    },
    methods: {
      gotoLogin(){
        this.$router.push({name:"login"})
      },
    }
  }
</script>

<style>
.registerbox{
    position: absolute;
    width:100%;
    height:100%;
    background:url(https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/5.jpg?2) no-repeat 0 0;
}



</style>

