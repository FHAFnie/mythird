<template>
  <div class="goods-content">
    <!-- <h2>商品列表  </h2> -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>当前位置：</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品列表</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="goodslist">
      <el-row class="">
        <el-col :span="6" v-for="(good, index) in showgoods" :key="index" >
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <a href="" @click.prevent="gotoDetails(good._id)">
              <img :src="good.spriteSheet" :title="good.subtitle" class="image" alt="没有图片">
              <div style="padding: 14px;">
                <span class="goodtext">{{good.subtitle}}</span>
                <span class="goodsprice">{{good.rawPrice | money}}</span>
              </div>
            </a>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="page-block">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="16"
        layout="prev, pager, next, jumper"
        :total="typegoods.length">
      </el-pagination>
  </div>
  </div>
</template>
<script>
import {mapActions,mapState,mapMutations} from "vuex";
export default {
  computed:{
    ...mapState(["allgoods","goodsIndexGoods","hotGoods","url","allCounts","singleGoods","showgoods","typegoods"]),
    showgoods:{
      get(){
        return this.$store.state.showgoods;
      },
      set(val){
        console.log(val)
      }
    }
  },
  methods:{
    ...mapActions([
      // "getAllgoods",
        // 'getSomeGoods',
    ]),
    ...mapMutations([
      'getGoodsinfo',
      'getshowgoods',
      "getSomeGoods"
    ]),
    gotoDetails(id){
      console.log(id);
      this.$router.push({name:"goodsdetails",query:{id}});
    },
     handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        console.log(val);
        this.getSomeGoods({start:(val-1)*16,end:val*16});
    }
  },
}
</script>

<style lang="scss" scoped>
.goods-content{
  margin-top: 15px;
  .goodslist{
    margin-top: 15px;
    // padding:0 50px;
    .goodtext{
      float: left;
      width: 120px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap
    }
    .el-col-6 {
      width: 20%;
      margin:0 30px 20px;
      span{
        line-height: 20px;
        text-align: left;
        font-size: 14px;
      }
      .goodsprice{
        float:right;
        margin-right: 20px;
        color:orange;
        font-size: 20px;
      }
    }
    img{
      width: 100%;
      height: 250px;
    }
  }
  .page-block{
    text-align: center;
  }
}
</style>
