<template>
    <div>
        <h2>demo-demo-demo</h2>
        <h2>props == {{msg}} --- {{num}}</h2>
        <button @click="send">子组件 自定义事件修改父组件 </button>
        <el-row>
            <el-button>默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
        </el-row>
    </div>
</template>

<script>
export default {
    props:{
        msg:String,
        num:Number
    },
    methods:{
        send(){
            this.$emit("changeparent",'你们有木有努力到凌晨2 点 ...');
        }
    }
}
</script>

