<template>
    <div class="container layout">
        <app-head></app-head>
        <app-menu></app-menu>
        <!-- <app-swiper url="banner address "></app-swiper> -->
        <router-view class="views">

        </router-view>
        <app-foot></app-foot>
    </div>
</template>

<script>
import Foot from "../components/foot.vue"
import Head from "../components/head.vue"

import Menu from "../components/menu.vue"
export default {
    components:{
        "app-foot":Foot,
        "app-head":Head,
        'app-menu':Menu
    }
}
</script>

<style>
    .views{
        width:100%;
        padding:10px 100px;
        box-sizing:border-box;
        background: #e4e4e4;
    }
</style>

