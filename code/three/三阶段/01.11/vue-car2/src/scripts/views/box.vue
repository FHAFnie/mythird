<template>
    <div>
        <app-swiper url="http://47.94.208.182:3000/movie" limit="4" ></app-swiper>
        <!-- <h2>box-box-box</h2> -->
        <router-view></router-view>
    </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
    methods:{
        ...mapActions([
            'getAllGoods'
        ])
    },
    mounted(){
        this.getAllGoods({url:"http://localhost:3100/vue/getgoods",callback:()=>{
            this.$nextTick(()=>{
                console.log("数据请求成功后 的回调 ")
            })
        }})
    }
}
</script>
