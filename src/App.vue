<!--总组件 实现路由整体跳转 -->
<template>
  <router-view></router-view>
  <PlayCountroller/>
</template>

<script lang='ts'>
  import playCountroller from './components/playCountroller.vue'
  import {
    defineComponent,
  } from 'vue'
  export default defineComponent({
    name: 'App',
    components:{
      PlayCountroller:playCountroller
    }
  })
</script>

<style>
  @import url("./assets/app.css");
</style>