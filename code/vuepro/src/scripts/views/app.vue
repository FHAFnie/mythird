<template>
  <div class="app cl">
    <app-header></app-header>
    <app-search></app-search>
    <app-head></app-head>
    <!-- <router-link :to="{name:'user'}">登录</router-link> -->
    <!-- 下面的是app路由路径下面的组件入口 -->
    <router-view></router-view>
    <app-carousel></app-carousel>
    <!-- <app-slide class="slide"></app-slide> -->
    <app-content class="content"></app-content>
    <app-foot class="foot"></app-foot>
  </div>

</template>

<script>
import Slide from "../components/shunav.vue";
import Content from "../components/content.vue";
import Foot from "../components/footer.vue";
import Head from "../components/head.vue";
import Header from "../components/header.vue";
import Search from "../components/search.vue";
import Carousel from "../components/carousel.vue";
import {mapActions,mapState,mapMutations} from "vuex";
export default {//导出组件
  computed:{
    ...mapState(["goodscar",'goodscarnum'])
  },
  methods:{
    ...mapActions(["getusergoodscar"]),
    ...mapMutations([]),
  },
  components:{
    "app-slide":Slide,//这是子组件
    "app-content":Content,
    "app-foot":Foot,
    "app-head":Head,
    "app-header":Header,
    "app-search":Search,
    "app-carousel":Carousel
  },
}
</script>

<style lang="scss" scoped>
/* 显示是sass文件 */
// 样式文件
  .app{
    color:#00f;
    // width: 100%;
    width:100%;
    padding:0 50px;
    box-sizing: border-box;
    .slide{
      width: 20%;
      display:inline-block;
      height: 500px;
      // float: left;
      background-color: #f0f;
    }
    // .content{
    //   width: 100%;
    //   height: 500px;
    //   // display:inline-block;
    //   // float: left;
    //   // background-color: #00f;
    // }
    // .foot{
    //   // width:200px;
    //   // height: 300px;
    //   // background-color: #0f0;
    // }
  }
</style>

