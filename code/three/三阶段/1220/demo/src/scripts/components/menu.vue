<template>
    <el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">
      <router-link to="/app/home">首页</router-link>
  </el-menu-item>
  <el-submenu index="2">
    <template slot="title"><router-link to="/app/newgoods">新品</router-link></template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    
  </el-submenu>
   <el-menu-item index="3" ><router-link to="/app/home">男士</router-link></el-menu-item>
  <el-menu-item index="4" ><router-link to="/app/home">女士</router-link></el-menu-item>
  <el-menu-item index="5"><a href="" ><router-link to="/app/home">品牌</router-link></a></el-menu-item>
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

