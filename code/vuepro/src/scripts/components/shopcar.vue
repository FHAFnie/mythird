<template>
  <div>
    <el-steps :active="1" simple>
      <el-step title="我的购物车" icon="el-icon-edit"></el-step>
      <el-step title="提交订单" icon="el-icon-upload"></el-step>
      <el-step title="订单完成" icon="el-icon-picture"></el-step>
    </el-steps>
    <div class="cartable">
      <table>
        <tr>
            <td>选择</td>
            <td>序号</td>
            <td class="goodsname">商品名</td>
            <td class="goodspic">商品图片</td>
            <td class="goodsprice">商品价格</td>
            <td class="goodsnum">商品数量</td>
            <td class="goodstotal">小计</td>
            <td class="operation">操作</td>
        </tr>
        <template v-if="goodscar[0]">
          <tr v-for="(good,index) in goodscar" :key="index">
            <td><input type="checkbox" v-model="good.check" @click="changeCheck(good.gid)"></td>
            <td>1</td>
            <td>{{good.goodstitle}}</td>
            <td><img :src="good.goodspic" alt="" style="width:80px;height:80px;"></td>
            <td>{{good.goodsprice}}</td>
            <td>
              <el-button @click="reduceNum(good._id,good.goodscount,good.check)" v-bind:disabled="good.goodscount<=1">-</el-button>
              <el-input type="text" style="width:30%" v-model="good.goodscount" ></el-input>
              <el-button @click="addNum(good._id,good.goodscount,good.check)">+</el-button>
            </td>
            <td>{{(good.goodsprice.slice(1))*good.goodscount |fixed(2)}}</td>
            <td><el-button type="danger" @click="delOne(good.gid,index)">删除</el-button></td>
          </tr>
        </template>
        <template  v-else>
          <tr>
            <td colspan="8" style="text-align:center;color:#999">
              暂无数据。。。
            </td>
          </tr>
        </template>
      </table>
    </div>
    <div class="paybox cl">
      <div class="pay">
          <p>店铺合计：<span>{{allcash |fixed(2)|moneyType}}</span></p>
          <p>商品数量：<span>{{allCounts}}件</span></p>
          <p>运费：0.00</p>
          <div class="paybtn">
            <el-button type="danger" plain @click="gotogoodsdetail">返回商品详情</el-button>
            <el-button type="danger" style="width:150px">提交订单</el-button>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions,mapState,mapMutations} from "vuex";
export default {
  data(){
    return {
      // allCounts:0,
      // allcash:0
    }
  },
  computed:{
    ...mapState(["singleGoods","singlegoodscar",]),
    quan(){

    },
    allcash:{
      get(){
        console.log(this.goodscar)
        let allmoney=0;
        // let allnumber=0;
        if(this.goodscar){
          this.goodscar.forEach((item,index)=>{
            // console.log(item);
            if(item.check){
              allmoney=allmoney*1+item.goodsprice.slice(1)*item.goodscount;
              // allnumber+=item.goodscount;
            }
            // allmoney+=(item.goodsprice*item.goodscount);
          })
          return allmoney;
        }
      },
      set(){

      }
    },
    allCounts:{
        get(){
          console.log(this.goodscar)
          // let allmoney=0;
          let allnumber=0;
          if(this.goodscar){
            this.goodscar.forEach((item,index)=>{
              // console.log(item);
              if(item.check){
                // allmoney+=item.goodsprice.slice(1)*item.goodscount;
                allnumber=allnumber*1+item.goodscount*1;
              }
              // allmoney+=(item.goodsprice*item.goodscount);
            })
            return allnumber;
          }
        },
        set(){

        }
    },
    goodscar:{
      get(){
        return this.$store.state.goodscar;
      },
      set(val){
        console.log(191919);
      },
    }
  },
  methods:{
    ...mapActions(["getusergoodscar","updateData","removeData"]),
    ...mapMutations([]),
    delchecked(){

    },
    gotogoodsdetail(){
      this.$router.push({name:"goodslist"})
    },
    // handleChange(id,num){
    //     console.log(id,num)
    // }
    addNum(id){
      console.log(id);
      var addgoods=this.goodscar.filter((item,index)=>{
        return item._id==id;
      })
      console.log(addgoods);
      addgoods[0].goodscount++;
      this.updateData(addgoods[0]);
    },
    reduceNum(id){
      console.log(id);
      var addgoods=this.goodscar.filter((item,index)=>{
        return item._id==id;
      })
      console.log(addgoods);
      addgoods[0].goodscount--;
      this.updateData(addgoods[0]);
    },
    changeCheck(id){
      console.log(id);
      // console.log(this.goodscar);
      var addgoods=this.goodscar.filter((item,index)=>{
        return item.gid==id;
      })
      console.log(addgoods);
      addgoods[0].check=!addgoods[0].check;
      this.updateData(addgoods[0]);
    },

    delOne(gid,index){//删除
      console.log(gid);
      console.log(index);
      // this.goodscar.splice(index,1);
      const username=sessionStorage.username;
      this.removeData({gid,username});
    }
  },
    beforeRouteEnter (to, from, next) {
      if(sessionStorage.username){
        //  已经登录 直接跳转
        next();
      }else{
        MessageBox.confirm('你还未登录,是否登录后再购买', '友情提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          // 点击确定的回调
          console.log(55555555);
          router.push({name:'login'});
          // console.log(this);
        }).catch(() => {
          // 点击取消的回调
          Message({
            type: 'success',
            message: '你继续以游客身份访问'
          });
        });
      }
    },
    created(){
      this.getusergoodscar();
    }
}
</script>

<style lang="scss" scoped>
  h2{
    width: 500px;
    height: 400px;
    // background-color: red;
    // border:1px solid yellow;
  }
  .cartable{
    border-top:1px dashed #eee;
    border-bottom:1px dashed #eee;
    padding:0 20px 15px 0;
    margin-bottom: 15px;
    // min-height: 300px;
    margin-top: 15px;
    tr{
      line-height: 40px;
      text-align: center;
      // margin-bottom: 5px;
      td{
          width: 80px;
          text-align: center;
      }
      .goodsname{
        width:200px;
      }
      .goodspic{
        width:100px;
      }
      .goodsprice{
        width:150px;
      }
      .goodsnum{
        width: 300px;
      }
      .goodstotal{
        width:150px;
      }
      .operation{
        width:150px;
      }
    }
  }
  .paybox{
    min-height: 150px;
    margin-bottom: 15px;
    .pay{
      width: 400px;
      // height: 300px;
      border:1px dashed red;
      padding:10px;
      float:right;
        text-align: right;
      p{
        line-height: 30px;
        font-size: 14px;
        span{
          color:orange;
          font-size: 20px;
          font-weight: 600;
        }
      }
      .paybtn{
        margin-top: 15px;
      }
    }
  }
</style>
