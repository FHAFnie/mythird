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
        <tr v-if="singlegoodscar.gid">
          <td><input type="checkbox" v-model="singlegoodscar.check"></td>
          <td>1</td>
          <td>{{singlegoodscar.title}}</td>
          <td><a href="" @click.prevent="gotogoodsdetail"><img :src="singlegoodscar.pic" alt="" style="width:100px;height:100px;"></a></td>
          <td>{{singlegoodscar.price}}</td>
          <td>
            <el-button @click="singlegoodscar.count--" v-bind:disabled="singlegoodscar.count<=1">-</el-button>
            <el-input type="text" placeholder="" style="width:30%" v-model="singlegoodscar.count"></el-input>
            <el-button @click="singlegoodscar.count++">+</el-button>
          </td>
          <td>{{singlegoodscar.price*singlegoodscar.count |fixed(2)}}</td>
          <td><el-button type="success" @click="delsingle">删除</el-button></td>
        </tr>
        <tr v-else>
          <td colspan="8" style="text-align:center;color:#999">
            暂无数据。。。
          </td>
        </tr>
      </table>
    </div>
      <div v-if="singlegoodscar.gid" class="paybox cl">
        <div class="pay">
            <p>店铺合计：<span>{{singlegoodscar.price*singlegoodscar.count |fixed(2)|moneyType}}</span></p>
            <p>商品数量：<span>{{singlegoodscar.count}} 件</span></p>
            <p>运费：0.00</p>
            <div class="paybtn">
              <el-button type="danger" plain @click="gotogoodsdetail">返回商品详情</el-button>
              <el-button type="danger" style="width:150px" @click="subpay">提交订单</el-button>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
import {mapActions,mapState,mapMutations} from "vuex";
import { MessageBox ,Message} from 'element-ui';

export default {
  computed:{
    ...mapState(["singleGoods","singlegoodscar"]),
    quan(){

    },
    total(){

    },
    myTotal(){

    },
    // singlegoodscar(){

    // }
    singleGoods:{//不知为何
      get(){
        return this.$store.state.singleGoods;
      },
      set(){
      }
    },
    singlegoodscar:{//不知为何
      get(){
        return this.$store.state.singlegoodscar;
      },
      set(){

      }
    },
  },
  methods:{
    ...mapActions(["singleGoods","singlegoodscar"]),
    ...mapMutations(["singleshopcar","delsinglegoodscar"]),
    delchecked(){

    },
    gotogoodsdetail(){
      this.$router.push({name:"goodsdetails",query:{id:this.$route.query.id}})
    },
    delsingle(){
      this.delsinglegoodscar();
    },
    subpay(){
      // this.$router.push({name:""})
    }
  },
  created(){
    const id=this.$route.query.id;
    // const goodsnum=this.$route.query.goodsnum;
    // console.log(id,goodsnum);
    this.$store.dispatch("singleGoods",id)
  },
  // mouted(){
  //   console.log(this.singleGoods.localPrice);
  // }




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
        console.log(111);
        this.$router.push({name:'login'})
      }).catch(() => {
        // 点击取消的回调
        Message({
          type: 'success',
          message: '你继续以游客身份访问'
        });
      });
    }
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
    color:#999;
    // min-height: 300px;
    margin-top: 15px;
    tr{
      line-height: 40px;
      text-align: center;
      // margin-bottom: 5px;
      td{
          width: 80px;
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
