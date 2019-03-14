<template>
    <div>
       <el-row>
            <el-col  :style="{animationDelay:i*100+'ms'}" :span="8" v-for="(good,i) in allgoods" :key="i" >
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
    </div>
    
</template>

<script>
import {mapState} from "vuex";
export default {
    computed:{
        ...mapState([
            'allgoods'
        ])
    }
}
</script>