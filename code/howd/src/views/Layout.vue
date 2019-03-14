<template>
  <div>
    <router-view></router-view>
    <Foot/>
  </div>
</template>
<script>
import Foot from "../components/Foot.vue";

export default {
  components:{
    Foot
  }
}
</script>
