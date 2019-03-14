<template>
  <div class="my-guid">
    <mt-swipe
    :auto="2000"
    class="guid-swiper"
    :show-indicators="false"
    >
      <mt-swipe-item v-for="(img,index) in imgs" :key="index">
        <img v-bind:src="img" alt=""  @click="gotoHome(index)">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>


<script>
export default {
  data(){
    return {
      imgs:[
        require("../assets/guid/1.png"),
        require("../assets/guid/2.jpg"),
        require("../assets/guid/3.jpg"),
        require("../assets/guid/4.jpg"),
      ]
    }
  },
  methods:{
    gotoHome(index){
      console.log(index);
      if(index==this.imgs.length-1){
        //最后一张
        //跳转
        this.$router.push("/home");
      }
    }
  }
}
</script>

<style  scoped>
.my-guid,.guid-swiper,img{
  width:100%;
  height:100%;
}
</style>

