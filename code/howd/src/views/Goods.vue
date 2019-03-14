<template>
  <router-view></router-view>
</template>


<script>
import homePic from "../assets/imgs/home2.png";
import searchPic from '../assets/imgs/search.png';

import axios from "axios";
// axios.defaults.baseURL="http://localhost:3600";//本地地址
// axios.defaults.baseURL="http://112.74.49.124:3600";//线上地址

import {mapState,mapActions,mapMutations} from "vuex";
// import {mapActions,mapState,mapMutations} from "vuex";
export default {
  data(){
    return {
      value:"",
      homePic,
      searchPic,
      selectBar:"wine"
    }
  },
  computed:{
    ...mapState(["allgoods",'goodstypes','showgoods'])
  },
  methods:{
    ...mapActions(['getAllGoods']),
    ...mapMutations([]),
    gotodetail(goodid){
      // console.log(goodid);
      // console.log(this.$router);
      this.$router.push({name:'goodsdetail',query:{goodid}})
    }
  },
  created(){
    this.getAllGoods();
  }
}
</script>


<style lang="scss" scoped>

</style>
