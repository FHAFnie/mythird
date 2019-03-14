<template>
  <div class="goodbrand">
    <el-row>
      <a href="" @click.prevent="gotoGoodslist">
        <el-col :span="11">
          <el-card :body-style="{ padding: '0px' }"  shadow="hover">
            <img src="../../assets/images/lunbo/5.jpg" class="image">
            <div style="padding: 14px;">
              <span>元年配色UltraBOOST</span>
              <div class="bottom clearfix">
                <time class="time">{{ new Date()|dateFormate  }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </a>
      <a href="" @click.prevent="gotoGoodslist">
        <el-col :span="11" >
          <el-card :body-style="{ padding: '0px' }"  shadow="hover">
            <img src="../../assets/images/lunbo/6.jpg" class="image">
            <div style="padding: 14px;">
              <span>YUNG 96</span>
              <div class="bottom clearfix">
                <time class="time">{{ new Date()|dateFormate  }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </a>
      <a href="" @click.prevent="gotoGoodslist">
        <el-col :span="11">
          <el-card :body-style="{ padding: '0px' }"  shadow="hover">
            <img src="../../assets/images/lunbo/7.jpg" class="image">
            <div style="padding: 14px;">
              <span>生来好动</span>
              <div class="bottom clearfix">
                <time class="time">{{ new Date()|dateFormate  }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
      </el-col>
      </a>
      <a href="" @click.prevent="gotoGoodslist">
        <el-col :span="11">
          <el-card :body-style="{ padding: '0px' }"  shadow="hover">
            <img src="../../assets/images/lunbo/8.jpg" class="image">
            <div style="padding: 14px;">
              <span>MIADIDAS</span>
              <div class="bottom clearfix">
                <time class="time">{{ new Date()|dateFormate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </a>
    </el-row>

    <div class="suggest">
      <h2>本月主推</h2>
        <el-carousel :interval="15000" type="card" height="400px">
          <el-carousel-item v-for="(item,index) in goodsIndexGoods" :key="index">
            <a href="" @click.prevent="gotoGoodslist">
              <div>
                <img :src="item.spriteSheet" alt="">
                <h2>{{item.subtitle}}</h2>
              </div></a>
          </el-carousel-item>
        </el-carousel>
    </div>
    <div class="suggest">
      <h2>本周热卖</h2>
        <el-carousel :interval="2000" type="card" height="400px">
         <el-carousel-item v-for="(item,index) in hotGoods" :key="index">
            <a href="" @click.prevent="gotoGoodslist">
              <div>
                <img :src="item.spriteSheet" alt="">
                <h2>{{item.subtitle}}</h2>
              </div></a>
          </el-carousel-item>
        </el-carousel>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .goodbrand{
    margin-top: 20px;
    margin-bottom: 20px;
    // padding:0 25px;
    .el-col-11 {
      // margin-bottom: 15px;
      // margin-left: 15px;
      margin: 0 20px 15px 30px;
    }
    img{
      // width: 547px;
      height: 307px;
    }
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }




  .suggest{
    h2{
      line-height: 30px;
      font-size: 20px;
      font-weight: 600;
      color:#000;
    }

    .el-carousel__item--card {
      width: 50%;
      // margin:0 5%;
      -webkit-transition: -webkit-transform .4s ease-in-out;
      transition: -webkit-transform .4s ease-in-out;
      transition: transform .4s ease-in-out;
      transition: transform .4s ease-in-out,-webkit-transform .4s ease-in-out;
    }
     .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
      }
      .el-carousel__item img{
        width:100%;
        height:80%;
      }
      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }
      .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
      }
  }

</style>

<script>
import axios from "axios";
import {mapActions,mapState,mapMutations} from "vuex";

export default {
  computed:{
    ...mapState(["allgoods","goodsIndexGoods","hotGoods",'currentDate',"url"])
  },
  methods:{
    ...mapActions([
      "getAllgoods",
    ]),
    ...mapMutations([
      // "getAllgoods",
    ]),
    gotoGoodslist(){
      this.$router.push({name:"goodslist"});
    }
  },
  mounted(){

  },
  created(){
    //获取商品数据
    console.log(new Date());
    console.log(this);
    this.getAllgoods(this.url);//获取所有的商品信息
  }
}
</script>
