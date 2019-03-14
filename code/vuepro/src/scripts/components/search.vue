<template>
  <div class="search cl">
    <div class="logo">
        <a href="">
          <transition
          appear
          appear-active-class="animated bounceInDown">
            <img src="../../assets/images/logo.jpg" alt="">
          </transition>
        </a>
    </div>

     <div class="goodscar">
        <el-badge :value="goodscarnum" class="item">
          <el-button size="small" type="danger" plain  @click="gotousergoodscar"><i class="el-icon-goods"></i> 购物车</el-button>
        </el-badge>
    </div>

    <div class="searchInput">
      <el-input placeholder="请输入查询内容" class="input-with-select" v-model="searchInp">
        <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
      </el-input>
      </el-input>
    </div>
  </div>
</template>
<script>
import {mapActions,mapState,mapMutations} from "vuex";
import { MessageBox ,Message} from 'element-ui';
export default {
  computed:{
    ...mapState(["goodscar","searchInp","allgoods"]),
    goodscarnum:{
      get(){
        return this.$store.state.goodscarnum;
      },
      set(val){
        console.log(val);
        // console.log(88888888);
      }
    },
    searchInp:{
      get(){
        return this.$store.state.searchInp;
      },
      set(val){
          this.updateSearchInp(val);
      }
    }
  },
  // watch:{
  //   goodscarnum:{//谁在变化就监听谁
  //     handler(newVal){//此处的newVal是变化后的goods
  //       console.log(newVal);
  //       this.$store.state.goodscarnum=newVal;
  //     },
  //     deep:true,//一定要写
  //   },
  // },
  methods:{
    ...mapActions(["getusergoodscar",'updateNum']),
    ...mapMutations(['updateSearchInp',"changeType"]),
    gotousergoodscar(){//跳转到用户购物车页面
      if(sessionStorage.username){
        //  已经登录 直接跳转
        // this.$store.dispatch("addGoodsCar",{good,num})
        console.log(8888888888);
        this.$router.push({name:"shopcar"});
        // next();
      }else{
        MessageBox.confirm('你还未登录,是否登录后再购买', '友情提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          // 点击确定的回调
          console.log(55555555);
          this.$router.push({name:"login"});
          // this.$store.dispatch("addGoodsCar",{good,num})
        }).catch(() => {
          // 点击取消的回调
          Message({
            type: 'success',
            message: '你继续以游客身份访问'
          });
        });
      }
    },
    searchBtn(){
      console.log(2222222);
      console.log(this.searchInp);
      console.log(this.allgoods);
      const type=this.searchInp;
      // const reg=new RegExp(type,"ig");
      // console.log(reg);
      // const typegoods=this.allgoods.filter((item,index)=>{
      //   const reg=new RegExp("/"+type+"/","ig");
      //   if(reg.test(item.subtitle)||reg.test(item.localPrice)){
      //     return item;
      //   }
      // })
      const typegoods=this.allgoods.filter((item,index)=>{
            if(item.subtitle.indexOf(type)!=-1){
              return item;
          }
      })
      console.log(typegoods);
      this.changeType(typegoods);
      this.$router.push({name:"goodslist"});
      // this.changeType(this.searchInp)
    }
  },
   created(){
    this.getusergoodscar();
  }
}
</script>
<style lang="scss" scoped>
  .logo{
    margin: 30px 0 20px 0;
    float: left;
  }
  .searchInput{
    margin: 30px 0 20px 0;
    float:right;
    width:50%;
    height: 80px;
    line-height: 80px;
    .el-input-group__append .el-button, .el-input-group__append .el-input, .el-input-group__prepend .el-button, .el-input-group__prepend .el-input {
        font-size: 20px;
    }
  }
  .goodscar{
    width: 100px;
    margin: 50px 20px 20px 0;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color:#eee;
    // border:1px solid #eee;
    float: right;
    .icon-gouwuche{
      font-size: 20px;
    }
  }
</style>
