<template>
     <div class="shoppingCar">
         <h1>购物车</h1>
            <div id="shoppingcar-body">
                <ul class="th">
                 <li style="width:60px">序号</li>
                 <li style="width:60px">选中</li>
                 <li style="width:150px">商品图片</li>
                 <li style="width:200px">商品名称</li>
                 <li style="width:80px">单价</li>
                 <li style="width:120px">商品数量</li>
                 <li style="width:130px">小计</li>
                 <li style="width:60px">操作</li>
                </ul>
                <div id="tbody">
                    <h3 v-if="carList.length <= 0">
                        购物车为空?<router-link :to="{name:'coffeeMenu'}" style="color:#0b8a5b">去逛逛</router-link>
                    </h3>
                    <ul class="tr" v-if="carList.length > 0" v-for="(item,i) in carList" :key=i>
                        <li style="width:60px;color:#025536">{{i + 1}}</li>
                        <li style="width:60px">
                             <input type="checkbox" @change="selectOne" v-model="item.checked" />
                            <!-- <el-checkbox @change="selectOne" v-model="item.checked" ></el-checkbox> -->
                        </li>
                        <li style="width:150px" ><img :src="item.img" alt="" style="width:120px;height:120px"></li>
                        <li style="width:200px;cursor:pointer;" >{{item.name}}</li>
                        <li style="width:80px" >{{item.price}}</li>
                        <li style="width:120px">
                            <el-input-number v-model="item.count" value="item.count" controls-position="right" @change="handleChange(item.count,item.goodsId)" :min="1" :max="99" size="mini"></el-input-number>
                        </li>
                        <li style="width:130px">{{item.price* 1 * item.count}}</li>
                        <li style="width:60px;cursor:pointer;color:#f56c6c;font-weight:600;" @click="del(item._id,i)">删除</li>
                    </ul>
            </div>
            <div id="tbottom">
                <ul >
                    <li style="margin-left:32px;">
                        全选:
                        <input type="checkbox" v-model="all"  v-if="carList.length > 0">
                        <!-- <el-checkbox v-model="all" v-if="carList.length > 0" >   </el-checkbox> -->
                    </li>
                    <li style="width: 80px;text-align: right;margin-left:10px">
                        <a @click="delCheck()" style="text-decoration: none;font-size:16px;color:red;cursor: pointer">删除选中</a>
                    </li>
                    <li style="margin-left:170px;width:200px;text-align:left">
                        已选: <span>{{selectNum}}</span>
                    </li>
                    <li style="width:200px;text-align:left">
                        合计: <span>￥{{priceTotal}}</span>
                    </li>
                    <li style="margin-left:50px;cursor: pointer;color:#fff;color:#f7f7f7;font-size:26px;letter-spacing:4px" @click="pay()">结算</li>
                </ul>
            </div>
        </div>
        <router-link :to="{name:'coffeeMenu'}">
            <img class="move1" src="https://www.starbucks.com.cn/assets/images/featured/2018xmas1/kv-8.jpg" alt="" style="height:315px;width:874px;margin-bottom:6px">
        </router-link>
    </div>
</template>

<script>
import { MessageBox ,Message} from 'element-ui';
import router from "../router";
import {mapActions ,mapState,mapMutations} from "vuex";

export default {
    data(){
        return {
        }
    },

    computed: {
        ...mapState(['priceTotal','selectNum']),
        carList:{
            get(){
                return this.$store.state.carList;
            },
            set(val){
                console.log(val);
            }
        },
        all:{
            get(){
                let flag = true;
                this.carList.forEach((item)=>{
                    if(!item.checked){
                        flag = false;
                    }
                })
                return flag;
            },
            set(val){
                console.log(val);
                let arr = this.carList.map((item)=>{
                    item.checked = val;
                    return item;
                })
                this.getCarList(arr);  //  commit mutations
            }
        }
    },

    methods:{
        handleChange(count,goodsId){
            console.log(count,goodsId);
            this.setCarListCount({
                url:"http://localhost:3100/react/setCarListCount",
                count,
                goodsId,
                mobile:sessionStorage.mobile,
                cb:(data)=>{
                    this.$message({
                        type: 'success',
                        message:data.msg
                    })
                }
            })
        },
        del(_id,i){
            this.carList.splice(i,1);
            this.delOneAsync({
                url:"http://localhost:3100/react/delCarListById",
                _id,
                cb:(data)=>{
                    this.$message({
                        type: 'success',
                        message:data.msg
                    })
                    getCarList(this.carList);
                }
            })

        },
        // 删除选中
        delCheck(){
            var list =  [];
            this.carList.forEach((item)=>{
                if(item.checked){
                    list.push(item._id);
                }
            });
            console.log(list);
            this.delCheckAsync({url:'http://localhost:3100/react/delCarList',list,cb:()=>{
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                this.getCarListAsync({
                    url:"http://localhost:3100/react/getCarList",
                    mobile:sessionStorage.mobile,
                    cb:()=>{
                        console.log("xxxx")
                    }
                })

            }})

        },
        ...mapActions(['delCheckAsync','delOneAsync','setCarListCount']),
        ...mapActions({
            getCarListAsync:'getCarList'
        }),
       ...mapMutations(['getCarList','setTotal'])
    },

    watch:{
        carList:{
            deep:true,
            handler(val){
                console.log(val);
                let total = 0;
                let selectednum = 0;
                val.forEach((item,index)=>{
                    if(item.checked){
                        total+=item.price*item.count *1;
                        selectednum+=item.count * 1;
                    }
                })
                this.setTotal({priceTotal:total,selectNum:selectednum})
                this.getCarList(val)
            }
        }
    },

    beforeRouteEnter (to, from, next) {
       if(sessionStorage.mobile){
            //  已经登录 直接跳转
           next();
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
}
</script>
<style>
a{
    color:#000;
}
.shoppingCar{
    margin: 0 4px;
}
.shoppingCar h1{
    font-size: 34px;
    line-height: 80px;
    /* margin-bottom: 10px; */
    font-weight: 700;
    text-align: center;
    color:#025536;
}

#shoppingcar-body {
  background-color: #f7f7f7;
}

#shoppingcar-body .th {
  height: 50px;
  background-color: #0b8a5b;
  clear: both;
  border-radius: 5px;
  color:#f7f7f7;
}

#shoppingcar-body .th li {
  float: left;
  line-height: 50px;
  font-size: 16px;
  width: 150px;
  text-align: center;
}

#shoppingcar-body .th li input {
  width: 15px;
  height: 15px;
  cursor: pointer;
}

#shoppingcar-body #tbody {
  width: 100%;
}

#shoppingcar-body #tbody h3 {
  text-align: center;
  font-size: 24px;
  line-height: 80px;
}

#shoppingcar-body #tbody .tr {
  width: 100%;
  height: 150px;
  line-height: 150px;
  text-align: center;
  overflow: hidden;
  border-bottom: .5px solid #31c27c;
}

#shoppingcar-body #tbody .tr li {
  font-size: 16px;
  float: left;
}

#shoppingcar-body #tbody .tr li img {
  margin: 15px auto;
  width: 110px;
  height: 110px;
  cursor: pointer;
}

#shoppingcar-body #tbody .tr li span {
  color:#025536;
}

#shoppingcar-body #tbody .tr li p {
  width: 174.28px;
  color: #dd663b;
  cursor: pointer;
}

#shoppingcar-body #tbottom {
  height: 64px;
  line-height: 64px;
  text-align: center;
  background-color: #0b8a5b;
}

#shoppingcar-body #tbottom ul {
  width: 100%;
}

#shoppingcar-body #tbottom ul li {
  float: left;
  font-size: 20px;
}

#shoppingcar-body #tbottom ul li span {
  display: inline-block;
}

/* .move{
    animation: fadeIn 1s;
} */
</style>



// // [
// //     userId:"10001",
// //     cars:[
// //         {goodId:"s1",count:100,}
// //         {goodId:"s2",count:100,}
// //         {goodId:"s3",count:100,}
// //         {goodId:"s4",count:100,}
// //         {goodId:"s5",count:100,}
// //     ]
// // ]


// [
//     {goodId:"s1",count:100, userId:"10001",}
//     {goodId:"s2",count:100, userId:"10002",}
//     {goodId:"s3",count:100, userId:"10003",}
//     {goodId:"s4",count:100, userId:"10001",}
//     {goodId:"s5",count:100, userId:"10001",}
// ]
