<template>
    <el-carousel style="width:100%" height="400px" >
      <!-- <el-carousel-item  >
          <a href=""><img src="http://47.94.208.182/base/img/1.jpg" alt=""></a>
      </el-carousel-item>
    <el-carousel-item  >
          <a href=""><img src="http://47.94.208.182/base/img/2.jpg" alt=""></a>
      </el-carousel-item>
    <el-carousel-item  >
          <a href=""><img src="http://47.94.208.182/base/img/3.jpg" alt=""></a>
      </el-carousel-item>
    <el-carousel-item  >
          <a href=""><img src="http://47.94.208.182/base/img/4.jpg" alt=""></a>
      </el-carousel-item> -->

       <el-carousel-item v-for="(m,i) in mv" :key="i"  >
          <a href=""><img v-if="m.images" :src="m.images.large" alt=""></a>
      </el-carousel-item>
    </el-carousel>

</template>

<script>
import {mapState,mapActions} from "vuex";
export default {
  props:['url',"limit"],
    // data(){
    //   return {
    //     mv:[]
    //   }
    // },
  computed:{
    ...mapState([
      'mv'
    ])
  },
  methods:{
    ...mapActions([
      'getMv'
    ])
  },
  created(){
    this.getMv({url:this.url,limit:5,cb:()=>{
      // alert("swiper - success")
    }})
    // this.$http.get(this.url,{
    //   params:{
    //     limit:this.limit
    //   }
    // }).then(res=>{
    //   console.log(res);
    //   this.mv = res.data;
    // })
  }
}
</script>


<style>
  .el-carousel__item img {
   width:100%;
   
  }

  
</style>