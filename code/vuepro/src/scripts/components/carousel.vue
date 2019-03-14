<template>
  <div class="block">
    <el-carousel class="lunbo" height="500px">
      <el-carousel-item>
        <div>
          <a href="" @click.prevent="gotoGoodslist"><img src="../../assets/images/lunbo/1.jpg" alt=""></a>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div>
          <a href=""  @click.prevent="gotoGoodslist"><img src="../../assets/images/lunbo/2.jpg" alt=""></a>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div>
          <a href=""  @click.prevent="gotoGoodslist"><img src="../../assets/images/lunbo/3.jpg" alt=""></a>
        </div>
      </el-carousel-item>
       <el-carousel-item>
        <div>
          <a href=""  @click.prevent="gotoGoodslist"><img src="../../assets/images/lunbo/4.jpg" alt=""></a>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  methods:{
    gotoGoodslist(){
      this.$router.push({name:"goodslist"});
    }
  }
}
</script>
<style lang="scss" >
  .lunbo{
    img{
      width:100%;
      height:500px;
    }
  }
  // .el-carousel__item h3 {
  //   color: #475669;
  //   font-size: 14px;
  //   opacity: 0.75;
  //   line-height: 150px;
  //   margin: 0;
  // }
  // .el-carousel__item:nth-child(2n) {
  //    background-color: #99a9bf;
  // }

  // .el-carousel__item:nth-child(2n+1) {
  //    background-color: #d3dce6;
  // }
</style>
