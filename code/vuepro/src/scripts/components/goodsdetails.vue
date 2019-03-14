<template>
  <div class="goodsdetails cl">
    <div class="goodshead">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name:'goodslist'}"><a href="javascript:void(0)">商品列表</a></el-breadcrumb-item>
        <el-breadcrumb-item >商品详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- <div class="left-box">
      <div class="imgbox">
        <img :src="singleGoods.spriteSheet" alt="">
        <div class="shadow"></div>
      </div>
      <ul class="left-footer cl">
        <li v-for="(g,i) in hotGoods.slice(0,4)" :key="i" @click="changeImg(g.spriteSheet)">
          <img :src="g.spriteSheet" alt="">
        </li>
      </ul>
      <div class=bigImgbox>
          <img src="" alt="">
      </div>
    </div> -->

      <div class="magnify">
        <div class="preview-box" @mousemove="move($event)"  @mouseout="out" ref="previewBox">
          <img width="100%" :src="singleGoods.spriteSheet" alt="">
          <div class="hover-box" ref="hoverBox"></div>
        </div>
        <ul class="left-footer cl">
            <li v-for="(g,i) in hotGoods.slice(0,4)" :key="i" @click="changeImg(g.spriteSheet)">
              <img :src="g.spriteSheet" alt="">
            </li>
        </ul>
        <div class="zoom-box" v-show="zoomVisiable" ref="zoomBox">
          <img :src="singleGoods.spriteSheet" alt="" ref="bigImg">
        </div>
        <div class="right-box">
          <p class="goodstitle">{{singleGoods.title}}</p>
          <p class="secgoodstitle">{{singleGoods.subtitle}}</p>
          <div class="onsale">
            <p>员工价：<span class="localPrice">{{singleGoods.localPrice}}</span></p>
            <p>折扣价：<span class="employeePrice">{{singleGoods.localPrice}}</span></p>
            <p>原价：<span class="rawPrice">{{singleGoods.overriddenEmployeePrice}}</span></p>
          </div>
          <!-- <p>商品y：{{singleGoods.overriddenEmployeePrice}}</p> -->
          <hr>
          <div class="fee">运费：
              <span>全国 至</span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  请选择<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>北京</el-dropdown-item>
                  <el-dropdown-item>武汉</el-dropdown-item>
                  <el-dropdown-item>上海</el-dropdown-item>
                  <el-dropdown-item >天津</el-dropdown-item>
                  <el-dropdown-item >广州</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>　|　普通快递 ￥30.00
          </div>
          <div class="goodsnum">
              <span>数量：</span>
              <div class="countInp">
                  <el-button @click="reduce">-</el-button>
                  <el-input type="text" placeholder="1" style="display:inline-block;width:40%;text-align:center;" v-model="goodsnum"></el-input>
                  <el-button @click="add">+</el-button>
              </div>
              <span>库存698件</span>
          </div>
          <!-- <p>商品链接：<a :href="singleGoods.pdpUrl">点击我</a></p> -->
          <p>活动结束价：{{singleGoods.localPrice}}</p>
          <div class="buybtn">
            <el-button type="primary" @click="addGoodsCar(singleGoods)">加入购物车</el-button>
            <el-button type="danger" plain @click.prevent="gotosingleShopCar">立即购买</el-button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions,mapState,mapMutations} from "vuex";
import { MessageBox ,Message} from 'element-ui';
// import Login from "../views/login.vue";
import router from "../router.js";


function offset(el) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  return {
    left: left,
    top: top
  }
}

export default {
  name: 'magnify',
  data(){
    return {
      goodsnum:1,
      zoomVisiable: false,
      hoverVisiable: false
    }
  },
  props:{
    previewImg: {
          type: String,
          default: ''
        },
        zoomImg: {
          type: String,
          default: ''
        }
  },
  computed:{
     ...mapState([
       "allgoods",
       "goodsIndexGoods",
       "hotGoods",
       "url",
       "allCounts",
       'goodscarnum',
       'goodscar'
       ,
    ]),

    singleGoods:{//不知为何
      get(){
        return this.$store.state.singleGoods;
      },
      set(val){
        // console.log(val);
      }
    },
},
  methods:{
    ...mapActions([
      // "getAllgoods",
      'singleGoods',
      'updateNum'
    ]),
    ...mapMutations([
      'getGoodsinfo'
    ]),
    changeImg(i){
      console.log(i);
    },
    add(){
      this.goodsnum++;
    },
    reduce(){
      this.goodsnum--;
      this.goodsnum=this.goodsnum<=1?1:this.goodsnum
    },
    out() {
      this.zoomVisiable = false;
    },
    move(ev) {
      this.init();
      // 鼠标距离屏幕距离
      let moveX = ev.clientX;
      let moveY = ev.clientY;
      // 大盒子距离顶部的距离
      let offsetLeft = offset(this.oPreviewBox).left;

      let offsetTop = offset(this.oPreviewBox).top;
      let left = moveX - offsetLeft - this.houverWidth / 2;
      let top
      if(this.scroll > 0) {
        top = moveY - offsetTop + this.scroll - this.houverHeight / 2;
      }else {
        top = moveY - offsetTop - this.houverHeight / 2;
      }
      let maxWidth = this.pWidth - this.houverWidth;
      let maxHeight = this.pWidth - this.houverHeight;
      left = left < 0 ? 0 : left > maxWidth ? maxWidth : left;
      top = top < 0 ? 0 : top > maxHeight ? maxHeight : top;
      let percentX = left / (maxWidth);
      let percentY = top / (maxHeight);
      this.oHoverBox.style.left = left + 'px';
      this.oHoverBox.style.top = top  + 'px';
      this.oBigImg.style.left = percentX * (this.bWidth - this.imgWidth) + 'px';
      this.oBigImg.style.top = percentY * (this.bHeight - this.imgHeight) + 'px';
      this.$emit('move', ev);
      this.zoomVisiable = true;
    },
    init() {
      this.oHoverBox = this.$refs.hoverBox;
      this.oPreviewBox = this.$refs.previewBox;
      this.oBigImg = this.$refs.bigImg;
      this.imgBox = this.$refs.zoomBox;
      this.houverWidth = this.oHoverBox.offsetWidth;
      this.houverHeight = this.oHoverBox.offsetHeight;
      this.pWidth = this.oPreviewBox.offsetWidth;
      this.pHeight = this.oPreviewBox.offsetHeight;
      this.imgWidth = this.oBigImg.offsetWidth;
      this.imgHeight = this.oBigImg.offsetHeight;
      this.bWidth = this.imgBox.offsetWidth;
      this.bHeight = this.imgBox.offsetHeight;
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
    },
    gotosingleShopCar(){//立即购买
    console.log(898989)
      this.$router.push({name:"singleshopcar",query:{id:this.$route.query.id,goodsnum:this.goodsnum}})
    },
    addGoodsCar(good){//加入购物车
      console.log(good);
      var num=this.goodsnum;
      // this.goodscarnum=num;
       if(sessionStorage.username){
        //  已经登录 直接跳转
        this.$store.dispatch("addGoodsCar",{good,num})
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
    }
  },
  created(){
    const id=this.$route.query.id;
    console.log(id);
    this.$store.dispatch("singleGoods",id)
  },
}
</script>
<style lang="scss" scoped>
  .goodsdetails{
    // padding:0 20px 0 0;
    background: #fff;
    // margin-bottom: 30px;
    .goodshead{
      margin:10px 20px;
      line-height: 30px;
      font-size: 14px;
    }
    .left-box{
      float: left;
      width: 500px;
      .imgbox{
        width:500px;
        position:relative;
        img{
          width:500px;
          height: 500px;
        }
        .shadow{
            width: 150px;
            height: 150px;
            position:absolute;
            left: 0;
            top: 0;
            background-color: rgba(0,0,0,.5);
        }

      }
    }
      .bigImgbox{
        width: 400px;
        height: 400px;
      }
    .right-box{
      float: left;
      width: 500px;
      height: 500px;
      margin-left: 30px;
      // border:1px solid red;
      position:absolute;
      left: 500px;
      top: 0;
      .buybtn{
        margin-left: 30px;
        margin-top: 30px;
        text-align: left;

      }
      .fee{
        margin-left: 30px;
        font-size:12px;
        line-height: 30px;
      }
      .onsale{
        // height:150px;
      background:url(https://www.w555555.com/skin/default/w5/t_images/price-bg.png) no-repeat 0 0;
      background-size:100% 100%;
        // background:url(https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/5.jpg?2) no-repeat 0 0;
      }
      .goodstitle{
        line-height: 30px;
        text-align: left;
        font-weight: 600;
        text-indent: 15px;
      }
      .secgoodstitle{
        margin-top: 10px;
        margin-bottom: 10px;
        line-height: 30px;
        text-align: left;
        font-size: 18px;
        font-weight: 600;
        color:orange;
      }
      .rawPrice{
        text-decoration: line-through;
      }
      .rawPrice,.employeePrice,.localPrice{
        color:orange;
        font-size: 20px;
        margin-left: 15px;

      }
      .goodsnum{
        padding-left:30px;
        font-size: 14px;
        .countInp{
          margin:10px;
          // margin-left: 30px;
          display: inline-block;
          width: 50%;
        }
      }
      p{
        text-indent: 30px;
        margin:10px 0;
      }
    }

  }

  .magnify {
    position: relative;
    margin-bottom: 30px;
    .preview-box {
      width: 500px;
      height: 500px;
      border: 1px solid #dededd;
      position: relative;
      &:hover .hover-box{
        display: block;
      }
      .hover-box {
        position: absolute;
        display: none;
        left: 0;
        top: 0;
        width: 250px;
        height: 250px;
        // border-radius: 50%;
        border: 1px solid #545454;
        background: url('https://img-tmdetail.alicdn.com/tps/i4/T12pdtXaldXXXXXXXX-2-2.png') repeat 0 0;
        cursor: move;
        user-select: none;
      }
    }
      .left-footer{
        width: 500px;
        margin-top: 5px;
        li{
          width: 125px;
          height: 125px;
          float: left;
          img{
            width: 125px;
            height: 125px;
          }
        }
      }
    .zoom-box {
      width: 500px;
      height: 500px;
      overflow: hidden;
      position: absolute;
      left: 530px;
      // border: 1px solid #dc7a7a;;
      top: 0;
      z-index: 999;
      img {
        width: 1000px;
        height:1000px;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
</style>
