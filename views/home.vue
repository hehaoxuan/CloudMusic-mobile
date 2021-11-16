<!-- home 首页组件  -->
<template>
  <TopNav/>
  <SwiperCom/>
  <IconList/>
  <Music-list/>
</template>
<script lang='ts'>
  import {
    defineComponent
  } from 'vue'

  import topNav from '../src/components/topNav.vue'
  import swiperCom from '../src/components/swiperCom.vue'
  import iconList from '../src/components/iconList.vue'
  import musicList from '../src/components/musicList.vue'
  export default defineComponent({
    name: 'home',
    components: {
      TopNav: topNav,
      SwiperCom: swiperCom,
      IconList: iconList,
      MusicList: musicList
    }
  })
</script>
<style>
  
</style>