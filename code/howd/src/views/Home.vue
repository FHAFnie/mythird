<template>
  <div class="home">
    <div class="homeHead">
        <div class="headlogo">
            <img :src="logoSrc" >
        </div>
        <div class="searchDiv">
          <img :src="searchPic" class='searchBtn'>
          <input type="text" placeholder='搜索'>
        </div>
    </div>
    <mt-swipe :auto="1500" class='swipeDiv'>
      <mt-swipe-item v-for="(good,index) in swiperList" :key="index" >
          <img :src="good.url" @click.prevent='gotogoodslist'>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 首页轮播图下面 -->
    <div class="selectBtn">
        <div class="selectItem" v-for="(item,index) in selectBtn" :key="index"  @click.prevent='gotogoodslist'>
          <img :src="item.icon">
          <span>{{item.text}}</span>
        </div>
    </div>
    <!-- 批发商城 -->
    <div class="pifaDiv">
      <div class='pifaHead'>
        <i class="iconfont icon-box2xiangzi"></i>
        <span>批发商城</span>
      </div>
      <ul class='pifalist'>
        <li v-for="(item,index) in pifaList" :key="index" class="pifaitem"  @click.prevent='gotogoodslist'>
          <img :src="item.url">
          <span>{{item.title}}</span>
          <span class='infospan'>{{item.info}}</span>
        </li>
      </ul>
    </div>
    <!-- 生日礼物 -->
    <div class="pifaDiv birthDiv">
      <div class='pifaHead'>
        <i class="iconfont icon-jiangpin1"></i>
        <span>批发商城</span>
      </div>
      <mt-swipe :auto="1500" class='birthpic'>
        <mt-swipe-item v-for="(good,index) in birthpic" :key="index">
            <img :src="good.url"  @click.prevent='gotogoodslist'>
        </mt-swipe-item>
      </mt-swipe>

      <ul class='birthlist'>
        <li class='birthlistitem' v-for="(item,index) in birthlist" :key="index"  @click.prevent='gotogoodslist'>
          <img :src="item.pdpUrl" alt="">
          <span class='subtitletext'>{{item.subtitle}}</span>
          <span class='infospan'>￥{{item.price}}</span>
        </li>
      </ul>
    </div>

    <!-- 推荐品牌 -->
    <div class="pifaDiv ">
      <div class='pifaHead'>
        <i class="iconfont icon-jiangpin"></i>
        <span>推荐品牌</span>
      </div>
      <ul class='tuijianDiv'>
        <li v-for="(item,index) in tuijian " :key="index" class='tuijianitem'  @click.prevent='gotogoodslist'>
          <img :src="item.pdpUrl">
        </li>
      </ul>
    </div>
    <div class="pifaDiv">
      <div class='pifaHead'>
        <i class="iconfont icon-shoucang"></i>
        <span>实力供应商</span>
      </div>

      <ul class='birthlist suplierDiv'>
        <li class='birthlistitem' v-for="(item,index) in suplierList" :key="index"  @click.prevent='gotogoodslist'>
          <img :src="item.pdpUrl" class='suplierimg'>
          <span class='subtitletext supliercompany'>{{item.subtitle}}</span>
          <span class='subtitletext supliertext'>所在区域：{{item.location}}</span>
          <span class='subtitletext supliertext'>核心品类：{{item.type}}</span>
          <span class='subtitletext supliertext'>优势资源：{{item.source}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

// import axios from "axios";
import axios from "axios";
import logoSrc from '../assets/imgs/header-logo.png';
import searchPic from '../assets/imgs/search.png';

import goodsicon from "../assets/imgs/goodsicon.png";
import jifen from "../assets/imgs/jifen.png";
import shiyuan from "../assets/imgs/shiyuan.png";
import zixun from "../assets/imgs/zixun.png";
import more from "../assets/imgs/more.png";




// axios.defaults.baseURL="http://localhost:3600";//本地地址
axios.defaults.baseURL="http://112.74.49.124:3600";//线上地址
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
        swiperList: [],
        count:0,
        value:"",
        logoSrc,
        searchPic,
        pifaList:[],
        birthpic:[],
        birthlist:[],
        suplierList:[],
        selectBtn:[
          {'text':'批发商城','icon':goodsicon},
          { 'text': '积分商城', 'icon':jifen},
          { 'text': '十元专区', 'icon':shiyuan },
          { 'text': '礼品资讯', 'icon':zixun },
          { 'text': '更多频道', 'icon':more }
        ],
        tuijian: [
          {
            "pdpUrl": "http://112.74.49.124/base/homework/images/goods/09353394197.jpg"
          },
          {
            "pdpUrl": "http://112.74.49.124/base/homework/images/goods/09362087197.jpg"
          },
          {
            "pdpUrl": "http://112.74.49.124/base/homework/images/goods/09365418197.jpg"
          },
          {
            "pdpUrl": "http://112.74.49.124/base/homework/images/goods/09372197197.jpg"
          },
          {
            "pdpUrl": "http://112.74.49.124/base/homework/images/goods/09374925197.jpg"
          },
          {
            "pdpUrl": "http://112.74.49.124/base/homework/images/goods/09380969197.jpg"
          },
          {
            "pdpUrl": "http://112.74.49.124/base/homework/images/goods/09383357197.jpg"
          },
          {
            "pdpUrl": "http://112.74.49.124/base/homework/images/goods/09385532197.jpg"
          },
          {
            "pdpUrl": "http://112.74.49.124/base/homework/images/goods/09391553197.jpg"
          },
          {
            "pdpUrl": "http://112.74.49.124/base/homework/images/goods/09394837197.jpg"
          },
          {
            "pdpUrl": "http://112.74.49.124/base/homework/images/goods/09400541197.jpg"
          },
          {
            "pdpUrl": "http://112.74.49.124/base/homework/images/goods/09403514197.jpg"
          }
      ],
    };
  },
  methods:{
    gotogoodslist(){
      this.$router.push({name:'goodslist'});
    }
  },
  created(){
    // console.log(3333);
    var that=this;
    axios({
        method:"get",
        url:"/goods/homePic",
          params:{},
      }).then((res)=>{
          this.swiperList=res.data;
          // console.log(this.swiperList);
    })
    axios({
        method:"get",
        url:"/goods/pifa",
          params:{},
      }).then((res)=>{
          this.pifaList=res.data;
          // console.log(this.pifaList);
    })
    axios({
        method:"get",
        url:"/goods/birthpic",
          params:{},
      }).then((res)=>{
          this.birthpic=res.data;
          // console.log(this.birthpic);
    })
    //生日礼物
    axios({
      method:"get",
      url:"/goods/getAllGoods",
      params:{},
    }).then((res)=>{
        // console.log(res.data);
        var allGoods = res.data[0];
        // console.log(allGoods);
        var birthlist = allGoods.slice(72, 80);
        // console.log(birthlist)
        this.birthlist=birthlist;
    })

    //供应商
    axios({
        method:"get",
        url:"/goods/suplier",
          params:{},
      }).then((res)=>{
          this.suplierList=res.data;
          // console.log(this.suplierList);
    })


  }
}
</script>


<style lang="scss" scoped>
  .home{
    width:100%;
    height:100%;
    padding-bottom: 1.5rem;
    font-size: .4rem;
    .homeHead{
      width:100%;
      background-color: orangered;
      height:.8rem;
      padding:.2rem .1rem;
      display:flex;
      box-sizing: border-box;
      justify-content: space-around;
      flex-direction: row;
      align-items: center;
      .searchDiv{
        flex: 1;
        height:.6rem;
        background-color: #fff;
        font-size: .3rem;
        line-height: .6rem;;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-radius: .1rem;
        .searchBtn{
          width:.5rem;
          height:.5rem;
        }
        input{
          flex:1;
          height:.5rem;
          border:0;
          font-size: .35rem;
          text-indent: .15rem;
        }
      }
      .headlogo{
        width:30%;
        height:.6rem;
        img{
          width:2rem;
          height:.5rem;
        }
      }
    }
    .swipeDiv{
      width:100%;
      height:5rem;
      // background-color: red;
    }
    .selectBtn{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding:.2rem;
      box-sizing: border-box;
      background-color: #fff;
    }
    .selectBtn img{
      width:.60rem;
      height:.60rem;
      margin-bottom: .15rem;
    }
    .selectItem{
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: .25rem;
      justify-content: space-between;
    }
    .pifaDiv{
      background-color: #eee;
      width:100%;
      .pifaHead{
        font-size: .35rem;
        padding:.2rem;
        text-align: center;
        .icon-box2xiangzi,.icon-jiangpin1,.icon-jiangpin,.icon-shoucang{
          font-size: .4rem;
          width:.35rem;
          height:.35rem;
          color:orangered;
          margin-right: .1rem;
        }
      }

      .pifalist{
        width:100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
      }
      .pifaitem{
        width:33%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .1rem;
        font-size: .25rem;
        background-color: #fff;
        color:#666;
        padding:.1rem 0;
      }
      .pifaitem img{
        width:100%;
        height:2rem;
      }
      .infospan{
        font-size: .2rem;
        color:orangered;
        margin-top: .1rem;
      }
    }


    .birthDiv{
      .birthpic{
        width:100%;
        height:4rem;
        img{
          width:100%;
          height:4rem;
        }
      }

      .birthlist{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        /* width:100%; */
        justify-content: space-between;
        align-items: center;
        overflow-x: auto;
        background-color: #fff;
      }
      .birthlistitem{
        width:30%;
        margin:.15rem 0;
        padding:0 .1rem;
        border-right: .02rem solid #eee;
        font-size: .2rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
      .birthlistitem img{
        width:100%;
        height:2rem;
      }
      .subtitletext{
        width:100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
      }
    }

  .tuijianDiv{
      width:100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      flex-wrap: wrap;
      /* align-items: center; */
  }
  .tuijianitem{
      width:25%;
      border-right: .02rem solid #eee;
      box-sizing: border-box;
      margin-bottom: .02rem;
  }
  .tuijianitem img{
    width:100%;
    height:1.5rem;
  }




    .suplierDiv{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      overflow-x: scroll;
      background-color: #fff;
      margin-bottom: .15rem;
    }
    .suplieritem{
      width:30%;
      margin:.1rem 0;
      padding:0 .1rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
    .supliertext{
      font-size: .25rem;
      text-align: left;
      color:#666;
      display: block;
    }
    .suplierimg{
      margin-bottom: .1rem;
      width:100%;
      height:2rem;
    }
    .supliercompany{
      font-size: .28rem;
      color:#000;
      margin-bottom: .1rem;
      display: block;
    }
    .subtitletext{
      width:100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow:ellipsis;
    }
    .birthlistitem{
      width:33%;
      margin:.1rem 0;
      padding:0 .1rem;
      border-right: .02rem solid #eee;
      font-size: .25rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }

</style>
