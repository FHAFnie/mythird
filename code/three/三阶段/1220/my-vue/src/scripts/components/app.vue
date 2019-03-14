<template>
    <div id="box">
        <h2>app - app -app --- {{title}}</h2>
        <div>
            完整语法高亮
            CommonJS 模块
            组件作用域的 CSS
        </div>
        <h3 ref="one" >xxxxx</h3>
        <input type="text" v-model="msg">
        <app-demo ref="child" :msg="msg" v-bind:num='count' v-on:changeparent="getMsg($event)" ></app-demo>
    </div>
</template>


<script>
import Demo from "./demo.vue";
export default {
    name:'app',
    data(){
        return {
            title:"单文件组件",
            msg:"daydayup",
            count:2018
        }
    },
    mounted(){
        this.$refs.one.style.color = "blue"
    },
    components:{
        "app-demo":Demo
    },
    methods:{
        getMsg(data){
            this.title =data;
        }
    }
}
</script>

<style lang="scss" scoped>

#box{
    div{
        color:red;
    }
}
</style>
