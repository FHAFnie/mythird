<template>
    <div>
        
        <h2>新品</h2>
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

