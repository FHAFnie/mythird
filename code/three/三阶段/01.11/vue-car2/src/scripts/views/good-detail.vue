<template>
    <el-row>
        <el-col :span=12 >
            <transition name="slide" >
                <img v-show="show" :src="goods.img" alt="" style="width:100%;height:400px">
            </transition>
        </el-col>
         <el-col :span=12 >
            <h2>{{goods.name}}</h2>
            <h2>价格 : {{goods.price}} yuan</h2>
             <el-button @click="show=!show" type="danger"> {{show?'隐藏图片':'显示图片'}}</el-button>
             <el-button type="primary" @click="buyToCar()" >立即购买</el-button>
            <p>
                <el-input-number v-model="count" @change="handleChange" :min="1" :max="10000" label="描述文字"></el-input-number>
            </p>
            <el-button type="success" @click="gotoCar()">加入购物车</el-button>

            <el-button type="info" @click="desc(2)" >购物车数量 desc  </el-button>
            <el-button type="danger" @click="changeCity('深圳-sz')"  >修改 城市  ===  深圳   </el-button>
            <el-input placeholder="please" v-model="users.username" ></el-input>
            <h2>{{users.username}}---{{inp}}</h2>
            <el-input placeholder="please" v-model="inp" ></el-input>

        </el-col>
    </el-row>
</template>

<script>
import {mapActions ,mapState,mapMutations} from "vuex";
import { MessageBox ,Message} from 'element-ui';
import router from "../router";
export default {
    data(){
        return {

            show:true,
            count:1,
        }
    },
    computed:{
        ...mapState([
            'users',
            'goods'
        ]),

        inp:{
            get(){
                // 取值
                return this.$store.state.inp
            },
            set(val){
                // 监听inp 改变
                console.log(val);
                // this.$store.commit("updateInp",val)
                this.updateInp(val);
            }
        }
    },
    methods:{
        buyToCar(){
            this.$router.push({name:'shopcar'});
        },
        handleChange(val){
            console.log(val);

            this.count = val;
        },
        ...mapMutations([
            'updateInp'
        ]),
        ...mapActions([
            'add',
            'desc',   // this.$store.dispatch('desc',100);
            'changeCity',
            'getGoods',
            'addCarList',
            'getCarList'
        ]),
        gotoCar(){
            // 添加购物车
            if(sessionStorage.mobile){
            //  已经登录 直接跳转
            //    才能添加购物车
                this.addCarList({
                    url:"http://localhost:3100/react/addCarList",
                    count:this.count,
                    mobile:sessionStorage.mobile,
                    goods:this.goods,
                    cb:()=>{

                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.getCarList({
                            url:"http://localhost:3100/react/getCarList",
                            mobile:sessionStorage.mobile,
                            cb:()=>{
                                console.log("xxxx")
                            }
                        })
                    }
                })
            }else{
                MessageBox.confirm('你还未登录,是否登录后再购买', '友情提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then((res) => {
                    // 点击确定的回调
                    router.push({name:'login'})
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
        console.log(this.goods.length)
        var that = this;
        this.getGoods({
            url:"http://localhost:3100/vue/goodsdetail",
            _id:this.$route.params.id,
            cb(){
                that.$message({
                    type: 'success',
                    message: '获取成功!'
                });
            }
        })
        // this.$http.get("http://localhost:3100/vue/goodsdetail",{
        //     params:{
        //         id:this.$route.params.id
        //     }
        // }).then(res=>{
        //     this.goods = res.data.result
        // })
    }
}
</script>
<style scoped>
 .slide-enter-active{
    animation:zoomIn 1s;
 }
 .slide-leave-active{
   animation: zoomOut 1s;
 }
</style>

