<template>
  <div class="foot">
    <!-- <div>nihao</div> -->
    <div v-for="(foot,index) in foots" :key="index" >
      <router-link :to="{name:foot.name}" class="foot-item">
        <i :class="'iconfont '+foot.icon"></i>
        <span>{{foot.txt}}</span>
      </router-link>
    </div>
  </div>
</template>


<script>
export default {
  data(){
    return {
      foots:[
          {txt:"首页",path:"/app/home",name:"home",icon:"icon-ziyuan"},
          {txt:"商品",path:"/app/goods/goodslist",name:"goodslist",icon:"icon-leimupinleifenleileibie"},
          {txt:"购物车",path:"/app/car",name:"car",icon:"icon-gouwuche"},
          {txt:"我",path:"/app/my",name:"my",icon:"icon-xiugaitouxiang"},
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
  .foot{
    background-color: #fff;
    border-top:0.02rem solid #eee;
    position:fixed;
    left: 0;
    bottom:0;
    display:flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;
    width:100%;
    // height:1rem;
    padding:0.1rem 0;
    color:#000;
    .foot-item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .iconfont{
        width:0.5rem;
        height:0.5rem;
        font-size: 0.5rem;
        margin-bottom: 0.2rem;
      }
    }
    .router-link-exact-active{
			  color:#0dc441;
		    border-color:#0dc441;
		}
  }



</style>
