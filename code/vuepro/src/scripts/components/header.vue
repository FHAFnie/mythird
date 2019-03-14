<template>
  <div class="top-f">
    <div class="top-c cl">
        <div class="userinfo">
            <template v-if="show">
                <a href="">欢迎你：{{username}}</a>
                <a href="" @click.prevent="layout">退出</a>
            </template>
            <template v-else>
                 <a href="">未登录！</a>
                 <a href="" @click.prevent="login">请登录</a>
                <!-- <button class="el-button" >登录</button> -->
            </template>
        </div>
        <div class="top-r">
            <div>
                <a href=""><i class="el-icon-goods"></i> 收藏的商品</a>
                <a href="">订单查询</a>
                <a href="">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            我的<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><a href="">我得订单</a></el-dropdown-item>
                            <el-dropdown-item><a href="">我的现金券</a></el-dropdown-item>
                            <el-dropdown-item><a href="">我的红包</a></el-dropdown-item>
                            <el-dropdown-item ><a href="">我的余额</a></el-dropdown-item>
                            <el-dropdown-item ><a href="">我得心愿单</a></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </a>
                <a href="">收藏夹</a>
                <a href="" class="ceil">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <i class="el-icon-mobile-phone"></i>手机端
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <div class="secCode">
                                    <img src="../../assets/images/seccode.png" alt="">
                                    <hr>
                                    <p>微信扫一扫关注</p>
                                </div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </a>|
                <a href="">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            更多<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><a href="">邀请好友</a></el-dropdown-item>
                            <el-dropdown-item><a href="">加入收藏</a></el-dropdown-item>
                            <el-dropdown-item><a href="">新浪微博</a></el-dropdown-item>
                            <el-dropdown-item ><a href="">腾讯微博</a></el-dropdown-item>
                            <el-dropdown-item ><a href="">百度贴吧</a></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </a>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            username:"",
            show:false,
        }
    },
    methods:{
        login(){
            this.$router.push({name:"login"});
        },
        layout(){
            sessionStorage.clear();
            this.show=false;
        }
    },
    created(){
        console.log(sessionStorage.username);
        if(sessionStorage.username){//已登录
            this.username=sessionStorage.username;
            this.show=true;
        }else{
            this.show=false;
        }
    }
}
</script>
<style lang="scss" scoped>
  .top-f{
    width:100%;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    background-color: #d8d8d8;
    color:#999;
    a{
        color:#999;
        margin-left: 14px;
    }
    a:hover{
        color:orangered;
    }
    .userinfo{
        float: left;
    }
    .top-r{
        float: right;
        margin-right: 15px;
        .el-dropdown{
            color:#999;
            font-size: 12px;
            a{
                color:#999;
            }
        }
        .secCode{
            background-color: #fff;
            img{
                width: 100px;
                height: 1px;
            }
            p{
                text-align: center;
            }
        }
        .ceil{
            margin-right: 15px;
        }
    }
  }
</style>
