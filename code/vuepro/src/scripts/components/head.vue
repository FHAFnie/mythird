<template>
  <div>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"

        background-color="#fff"
        text-color="#666"
        active-text-color="#ffd04b"
       >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>商品分类
        </template>
        <el-submenu index="1-1">
          <template slot="title">男装</template>
          <el-menu-item index="1-1-1">男装1</el-menu-item>
          <el-menu-item index="1-1-2">男装2</el-menu-item>
          <el-menu-item index="1-1-3">男装3</el-menu-item>
          <el-menu-item index="1-1-1">男装1</el-menu-item>
          <el-menu-item index="1-1-2">男装2</el-menu-item>
          <el-menu-item index="1-1-3">男装3</el-menu-item>
          <el-menu-item index="1-1-1">男装1</el-menu-item>
          <el-menu-item index="1-1-2">男装2</el-menu-item>
          <el-menu-item index="1-1-3">男装3</el-menu-item>
        </el-submenu>
        <el-submenu index="1-2">
          <template slot="title">女装</template>
          <el-menu-item index="1-2-1">女装1</el-menu-item>
          <el-menu-item index="1-2-2">女装2</el-menu-item>
          <el-menu-item index="1-2-3">女装3</el-menu-item>
        </el-submenu>
        <el-submenu index="1-3">
          <template slot="title">儿童</template>
          <el-menu-item index="1-3-1">儿童1</el-menu-item>
          <el-menu-item index="1-3-2">儿童2</el-menu-item>
          <el-menu-item index="1-3-3">儿童3</el-menu-item>
        </el-submenu>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
          <el-menu-item index="1-4-2">选项2</el-menu-item>
          <el-menu-item index="1-4-3">选项3</el-menu-item>
        </el-submenu>
         <el-submenu index="1-5">
          <template slot="title">选项4</template>
          <el-menu-item index="1-5-1">选项1</el-menu-item>
          <el-menu-item index="1-5-2">选项2</el-menu-item>
          <el-menu-item index="1-5-3">选项3</el-menu-item>
        </el-submenu>
        <el-submenu index="1-6">
          <template slot="title">选项4</template>
          <el-menu-item index="1-6-1">选项1</el-menu-item>
          <el-menu-item index="1-6-2">选项2</el-menu-item>
          <el-menu-item index="1-6-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2" @click="changeMenu('')">首页</el-menu-item>
      <!-- <el-submenu index="3">
        <template slot="title">最后疯抢</template>
        <el-menu-item index="3-1">选项1</el-menu-item>
        <el-menu-item index="3-2">选项2</el-menu-item>
        <el-menu-item index="3-3">选项3</el-menu-item>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项1</el-menu-item>
          <el-menu-item index="3-4-2">选项2</el-menu-item>
          <el-menu-item index="3-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu> -->
      <el-menu-item index="3" @click="changeMenu('男')">男装</el-menu-item>
      <!-- <el-menu-item index="5"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
      <el-menu-item index="4" @click="changeMenu('女')">女装</el-menu-item>
      <el-menu-item index="5" @click="changeMenu('婴童')">儿童</el-menu-item>
      <!-- <el-menu-item index="8">国际</el-menu-item>
      <el-menu-item index="9">美妆</el-menu-item>
      <el-menu-item index="10">鞋包</el-menu-item>
      <el-menu-item index="11">男装</el-menu-item>
      <el-menu-item index="12">运动</el-menu-item>
      <el-menu-item index="13">预告</el-menu-item>
       <el-submenu index="14">
        <template slot="title">更多</template>
        <el-menu-item index="14-1">家居</el-menu-item>
        <el-menu-item index="14-2">生活</el-menu-item>
        <el-menu-item index="14-3">配饰</el-menu-item>
        <el-menu-item index="14-1">金融</el-menu-item>
        <el-menu-item index="14-2">扶贫</el-menu-item>
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<script>
import axios from "axios";
import {mapActions,mapState,mapMutations} from "vuex";
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    computed:{
      ...mapState(["allgoods","showgoods"])
    },
    methods: {
      // handleSelect(key, keyPath) {
      //   console.log(key, keyPath);
      // },
      ...mapActions([]),
      ...mapMutations(["changeType"]),
      changeMenu(type){
          // console.log(1111);
          console.log(this.allgoods);
          const typegoods=this.allgoods.filter((item,index)=>{
            if(item.subtitle.indexOf(type)!=-1){
              return item;
            }
          })
          console.log(typegoods);
          this.changeType(typegoods);
          this.$router.push({name:"goodslist"});
      },
      all(type){
        console.log(1)
        // this.$router.push({name:"goodslist"});
        const typegoods=this.allgoods;
        this.changeType(typegoods);
      },
      men(type){
        console.log(1111);
        console.log(this.allgoods);
        const typegoods=this.allgoods.filter((item,index)=>{
          if(item.subtitle.indexOf(type)!=-1){
            return item;
          }
        })
        console.log(typegoods);
        this.changeType(typegoods);
      },
      // women(){
      //   // console.log(3)

      // },
      // children(){
      //   console.log(4)
      // },
    },
  }
</script>
<style>

</style>

<style lang="scss" scoped>

</style>
