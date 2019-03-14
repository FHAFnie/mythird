<template>
    <el-menu
  :default-active="activeIndex"
  class="el-menu-demo section"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">
      <router-link :to="{name:'home'}">首页</router-link>
  </el-menu-item>
  <el-menu-item index="2">
   <router-link :to="{name:'newgoods'}">新品</router-link>
  </el-menu-item>
   <el-menu-item index="3" >
     <router-link :to="{name:'man'}">男士</router-link>
     </el-menu-item>
  <el-menu-item index="4" >
    <router-link :to="{name:'woman'}">女士</router-link>
    </el-menu-item>
  <el-menu-item index="5"><a href="" >
    <router-link  :to="{name:'brand'}">品牌</router-link></a>
    </el-menu-item>
</el-menu>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>


<style scoped>
  .el-menu-item  a{
    width:100%;
    height:100%;
    display: block;
  }
</style>

