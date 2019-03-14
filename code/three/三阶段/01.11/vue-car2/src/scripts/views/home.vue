<template>
    <div>
        <el-row>
             
            <el-col class="home-box move" :style="{animationDelay:i*100+'ms'}" :span="8" v-for="(good,i) in goods" :key="i" >
                <el-card :body-style="{ padding: '0px' }" >
                    <router-link  :to="{name:'gooddetail',params:{id:good._id}}" style="display:block;color:#67C23A">
                        <img :src="good.img" class="image">
                        <div style="padding: 14px;">
                            <span>{{good.name}}</span>
                            <div class="bottom clearfix" style="">
                            <time  class="time">{{ good.price  }} 元</time> <time class="time">{{ good.discount  }} 折</time>
                            </div>
                            <p><el-rate v-model="rate" disabled></el-rate></p>
                        </div>
                    </router-link>
                </el-card>
            </el-col>
        </el-row>
        <el-pagination
            layout="prev, pager, next"
            :total="50">
        </el-pagination>
    </div>
    
</template>

<script>
import axios from "axios";

export default {
    data(){
        return {
            goods:[],
            rate:5
        }
    },
    created(){
        var that = this;
        // const loading = this.$loading({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // });
        axios.get("http://localhost:3100/vue/getgoods",{
            params:{
                limit:10
            }
        })
        .then(res=>{
            console.log(res.data);
            // 修改数据
            this.goods = res.data.result;
            // DOM 还没有更新 
            // fn()
            this.$nextTick(()=>{
                //  DOM 已经更新  
                // fn()
                // loading.close();
                setTimeout(()=>{
                    
                },500)
                this.$message({
                    message: '恭喜你，数据加载成功!',
                    type: 'success',
                    duration:1500
                    });
            })
        })
    }
}
</script>

<style>
.home-box{
    padding:10px 20px;
    box-sizing: border-box;
    height:450px;
}

.image{
    width:100%;
    height:300px;
}
.move{
    animation: rotateIn  1.8s;

}
</style>

