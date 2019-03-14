<template>
  <div class='carDiv'>
    <div class='carHead'>
      <mt-header title="购物车">
        <mt-button slot='left' @click='goback()'>
          <i class='iconfont icon-zuo'></i>
        </mt-button>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <ul class='carlist'>
      <li v-for="(item,index) in usercar" :key="index" class='caritem'>
        <div class='checkDiv'>
          <input type="checkbox" @click='checkOne(item._id,item.goodid)' v-model='item.checked'>
        </div>
        <div class='goodpic' @click.prevent="gotodetail(item._id,item.goodid)">
          <img :src="item.pdpUrl">
        </div>
        <div class='goodtitle'>
          <p @click.prevent="gotodetail(item._id)">{{item.subtitle}}</p>
          <p class='goodcompany'>{{item.company}}</p>
        </div>
        <div class='goodnums'>
          <p class='goodcash'>￥{{item.price*item.count|fixed(2)}}</p>
          <div class='changenum'>
            <span class='numopt' @click="change(-1,item._id)">-</span>
            <input type="text"  class='shownum' v-model="item.count">
            <span class='numopt' @click="change(1,item._id)">+</span>
          </div>
        </div>
      </li>
    </ul>

    <div class='delDiv'>
        <div class='quanDiv'>
          <input type="checkbox"  v-model="all" @click='checkAll'>全选
          <mt-button class='delBtn' type='danger' @click='delAll'>删除</mt-button>
        </div>
        <div class='gotoPay'>
          合计:￥<span class='allcash'>{{allPay|fixed(2)}}</span>
          <mt-button type='primary'>去结算</mt-button>
        </div>
    </div>
  </div>
</template>
<script>
import {mapActions,mapGetters,mapMutations,mapState} from "vuex";
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  data(){
    return {
      value:[],
      allPay:0
    }
  },
  computed: {
    ...mapState(['singleGood','allgoods','num','usercar','all']),
    quan:{
      get(){
      },
      set(val){
        // console.log(val);
        var newusercar=this.usercar.map((item,index)=>{
          item.checked=val;
          return item;
        })
        // console.log(newusercar);
        this.getNewusercar({newusercar,val});
      }
    },
    all:{
      get(){
        // console.log(this.$store.state.all)
        return this.$store.state.all;
      },
      set(val){
          // console.log(val)
      }
    }
  },
  watch:{
    'usercar':{
        handler:function(newValue,oldValue){
            var that=this;
            // console.log(newValue)
            //修改了状态了
            this.checkOneById({usercar:this.usercar,cb:()=>{
              that.allCount();
            }});
        },
        deep:true,
    }
  },
  methods: {
    ...mapActions(['getSingleGood','getusercar','changeNum','checkOneById','delGoods']),
    ...mapMutations(['getNewusercar']),
    goback(){
      this.$router.go(-1);
    },
    change(num,id){
      // console.log(num,id);
      this.usercar.forEach((item,index)=>{
        if(item._id==id){
          // console.log(333)
          item.count+=num*1;
          if(item.count<1){
            item.count=1;
          }
        }
      })
    },
    //改变数量,无用
    changeNum(id,count,type){
      // @click='changeNum(item._id,item.count,"add")'
      var that=this;
      var username=localStorage.getItem('username');
      console.log(id,count,type);
      var changeNum=0;
      if(type=='add'){
        changeNum=1;
        this.$store.dispatch('changeNum',{id,type,changeNum,username,cb:()=>{that.allCount()}});
      }else{
        changeNum=-1;
        if(count>1){
          this.$store.dispatch('changeNum',{id,type,changeNum,username});
        }
      }
    },
    //全选
    checkAll(){
      this.quan=!this.all;
      console.log(333);
      this.usercar.forEach((item,index)=>{
        item.checked=this.all
      })
    },
    //单选,在深度监听里面操作了
    checkOne(id){
      // console.log("深度监听");
      // console.log(this.usercar);
      var that=this;
      var flag=true;
      this.usercar.forEach((item,index)=>{
        if(id==item._id){
          item.checked=!item.checked
        }
        if(!item.checked){
          // console.log(1111);
          flag=false;
        }
      })
      this.checkOneById({usercar:this.usercar,cb:()=>{
        that.allCount();
      }});
      // console.log(flag);
    },
    //计算总钱数
    allCount(){
      //循环购物车
      var allPay=0;
      this.usercar.forEach((item,index)=>{
        if(item.checked){//选中了
          allPay+=item.count*item.price;
        }
      })
      this.allPay=allPay;
    },
    //删除选中
    delAll(){
      var delList=[];
      var usercar=[];
      var username=localStorage.getItem('username');
      this.usercar.forEach((item,index)=>{
        if(item.checked){//选中
          delList.push(item.goodid);
        }else{
          usercar.push(item);
        }
      })
      this.delGoods({delList,usercar,username})
    },
    //购物车跳详情页
    gotodetail(id,goodid){
      // console.log(id,goodid);
      this.$router.push({name:'goodsdetail',query:{goodid}})
    }
  },
  beforeRouteEnter (to, from, next) {
    // var that=this;
    // console.log(33333);
    if(!localStorage.getItem('username')){
        MessageBox.confirm('你还未登录,是否登录后再购买', '友情提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // type: 'warning'
        }).then((res) => {
          // 点击确定的回调
          // console.log(55555555);
          console.log(res);
          if(res=='confirm'){
            //此时是没有this实例的
            next((vm)=>{
              console.log(vm);
              vm.$router.push({name:"login"});
            })
          }
        }).catch(() => {
          // 点击取消的回调
          MessageBox({
            // type: 'success',
            message: '你继续以游客身份访问'
          });
        });
    }else{
      next();
    }

  },
  created(){
    var username=localStorage.getItem('username');
    this.getusercar({username});
  },

}
</script>


<style lang="scss" scoped>
  .carDiv{
    padding-bottom:.1rem;
    background-color:#eee;
    position:relative;
    .carHead{
      position:fixed;
      width:100%;
      left:0;
      top:0;
      .mintui{
        font-size:.5rem;
      }
      .mint-header{
        width:100%;
        height:.8rem;
        background-color:orangered;
        font-size:.4rem;
      }
    }

    .carlist{
      width:100%;
      background-color:#eee;
      margin-bottom:2.3rem;
      margin-top:.8rem;
      .caritem{
        width:100%;
        height:2rem;
        display:flex;
        flex-direction:row;
        justify-content:space-around;
        align-items:center;
        padding:.1rem .15rem;
        // border-bottom:.02rem solid #eee;
        margin-bottom:.15rem;
        background-color:#fff;
        box-sizing:border-box;
        .checkDiv{
          // width:.6rem;
          // text-align:center;
          padding:0 .15rem;
          input{
            width:.3rem;
            height:.3rem;
          }
        }
        .goodpic{
          // width:.9rem;
          height:100%;
          display:flex;
          flex-direction:row;
          justify-content:space-around;
          align-items:center;
          margin-right:.15rem;
          img{
            width:1.5rem;
            height:1.5rem;
          }
        }
        .goodtitle{
          width:3.5rem;
          // flex:1;
          height:100%;
          font-size:.25rem;
          color:#333;
          display:flex;
          flex-direction:column;
          justify-content:space-around;
          align-items:left;
          padding:.2rem .1rem;
          box-sizing:border-box;
          .goodcompany{
            text-align:left;
          }
        }

        .goodnums{
          // width:1.5rem;
          flex:1;
          height:100%;
          display:flex;
          justify-content:space-around;
          align-items:center;
          flex-direction:column;
          .goodcash{
            width:100%;
            line-height:.4rem;
            font-size:.3rem;
            text-align:center;
            color:orangered;
          }
          .changenum{
            display:flex;
            justify-content:space-around;
            flex-direction:row;
            align-items:center;
            .numopt{
              padding:.05rem .15rem;
              font-size:.3rem;
              border:.02rem solid #999;
              border-radius:.1rem;
              display:flex;
              justify-content:space-around;
              align-items:center;
            }
            input{
              width:.5rem;
              border:0;
              text-align:center;
              border:.02rem solid #777;
              border-radius:.1rem;
              padding:.12rem 0;
              margin-left:.05rem;
              margin-right:.05rem;
            }
          }
        }

      }
    }


    .delDiv{
      position:fixed;
      left:0;
      bottom:1.3rem;
      background-color:rgba(0,0,0,.5);
      width:100%;
      height:1rem;
      padding:.1rem;
      box-sizing:border-box;
      display:flex;
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
      color:#fff;

      .quanDiv{
        vertical-align:middle;
        input{
          width:.3rem;
          height:.3rem;
          margin-right:.15rem;
          vertical-align:middle;
        }
        .delBtn{
          margin-left:.1rem;
          color:#fff;
          font-size:.35rem;
        }
      }

      .gotoPay{
        font-size:.35rem;
        .allcash{
          margin-right:.15rem;
          color:red;
          font-size:.4rem;
          margin-left:.15rem;
        }
      }
    }


  }
</style>
