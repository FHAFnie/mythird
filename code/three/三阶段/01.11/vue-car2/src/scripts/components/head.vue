<template>
    <div>
        <header class="clearfix">
                <div v-if="!show">
                     <el-button type="success" size="medium ">登录</el-button>
                     <el-button type="danger" size="medium ">注册</el-button>
                </div>
                <div v-if="show">
                    <span> 欢迎 你  :: {{username}}</span>
                </div>

                <div>
                    购物车 
                    <el-badge :value="num" class="item" type="warning"> </el-badge>
                    <!-- <el-badge :value="count" class="item" type="danger"> </el-badge>
                    <el-badge :value="countOne" class="item" type="primary"> </el-badge> -->
                    <el-badge :value="carNumber" class="item" type="primary"> </el-badge>
                    <el-badge :value="cars" class="item" type="danger"> </el-badge>
                     件 
                </div>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        我的走秀<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的订单</el-dropdown-item>
                       <el-dropdown-item>我的订单</el-dropdown-item>
                       <el-dropdown-item>我的订单</el-dropdown-item>
                        <el-dropdown-item>我的订单</el-dropdown-item>
                        <el-dropdown-item>我的订单</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
        </header>
    </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from "vuex";
export default {
    // props:['username'],
    data(){
        return {
            show:false,
            username:'',
            num:this.$store.state.carNumber  // 无法刷新 
        }
    },
    methods:{
        ...mapActions(['getCarList'])
    },
    computed:{
        // ...mapState({
        //     count:state=>state.carNumber,    // (state)=>{return state.carNumber},
        //     countOne:'carNumber'   //  `state => state.carNumber`
        // }),
        ...mapState([
            'carNumber',
            'city'
        ]),
        ...mapGetters(['cars'])
    },
    // computed:{
    //     count(){
    //         return this.$store.state.carNumber
    //     }
    // },
    mounted(){
        console.log(this.$store)
        if(sessionStorage.mobile){
            this.show = true;
            this.username = sessionStorage.mobile;
        }else{
            this.show = false;
        }

        this.getCarList({
            url:"http://localhost:3100/react/getCarList",
            mobile:sessionStorage.mobile,
            cb:()=>{
                console.log("xxxx")
            }
        })
    }
}
</script>


<style>
header{
    display:flex;
    height:50px;
    width:100%;
    padding:0px 100px ;
    background:palegreen;
    box-sizing:border-box;
}
</style>
