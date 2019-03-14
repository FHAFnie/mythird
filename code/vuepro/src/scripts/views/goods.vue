<template>
  <div class="goodsHome">
      <goods-header></goods-header>
      <goods-search></goods-search>
      <goods-head></goods-head>
      <!-- <goods-list></goods-list> -->
      <router-view></router-view>
      <goods-foot></goods-foot>
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
  import Goodslist from "../components/goodslist.vue";
  // import Goodsdetails from "../components/goodsdetails.vue";
  // import ShopCar from "../components/shopcar.vue";

import {mapActions,mapState,mapMutations} from "vuex";

export default {
  computed:{
    ...mapState(["allgoods","goodsIndexGoods","hotGoods","url","allCounts","singleGoods","singlegoodscar","showgoods",])
  },
  methods:{
    ...mapActions([
      "getAllgoods",
    ]),
    ...mapMutations(["getshowgoods"]),
  },
  components:{
    "goods-header":Header,
    "goods-head":Head,
    "goods-search":Search,
    "goods-content":Content,
    "goods-list":Goodslist,
    "goods-foot":Foot,
  },
  created(){
    //获取商品数据
    console.log(new Date());
    this.getAllgoods(this.url)
  },
  // mounted(){
  //   console.log(22222);
  //   this.getshowgoods({start:0,end:8})
  // }
}
</script>

<style lang="scss" scoped>
  .goodsHome{
    width:100%;
    padding:0 50px;
    box-sizing: border-box;
  }
</style>
