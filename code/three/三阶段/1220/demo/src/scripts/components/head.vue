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
                    购物车 {{ 0 }} 件 
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
export default {
    props:['username'],
    data(){
        return {
            show:false,
        }
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
