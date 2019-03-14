
<template>
<div class="rigister">
   <el-button type="success" size="medium ">登录</el-button>
  <el-row>
    <el-col :span="24">
        <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="手机号">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button type="info">注册</el-button>
        </el-form-item>

      </el-form>
     
    </el-col>
  </el-row>
   </div>
</template>



<script>
  export default {
    data() {
      return {
         form:{
              mobile:"",
              password:""
         }
      }
    },
    methods: {
      onSubmit() {
        console.log("xxx")
        sessionStorage.mobile = this.form.mobile  ;
        this.$router.push({name:'home'})
        //  存 localStorage  === Obj 
      }
    }
  }
</script>

<style scoped>
.rigister{
  border:2px solid pink;
  border-radius:20px;
  position:absolute;
  top:0;
  left:0;
  right: 0;
  bottom:0;
  margin:auto;
  width:300px;
  height:400px;
}
</style>
