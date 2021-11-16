<!-- 此组件用来显示 '首页' 幻灯片 -->
<template>
  <div class="rotation">
    <el-row>
      <el-col :span="24">
        <div class="block">
          <el-carousel trigger="click" height="3rem" v-loading="loading.value">
            <el-carousel-item v-for="item in state.bannerImgs" :key="item">
              <img :src="item.pic" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang='ts'>
  import {
    defineComponent,
    onMounted,
    reactive,
    ref
  } from 'vue'
  import {
    getBanner
  } from '../../api/index'

  export default defineComponent({
    name: 'swiperCom',
    setup() {
      const loading = ref(true) //加载的数据
      const startbannerImgs = [{
            pic: "http://p1.music.126.net/a9Md6Hud1f-psisnnh-tJw==/109951166263174910.jpg"
          }, {
            pic: "http://p1.music.126.net/KTk4wDu_cfqN-k4qiENlQw==/109951166262137200.jpg"
          }, {
            pic: "http://p1.music.126.net/uum8gAzS9yaJvkpXoganjQ==/109951166262846239.jpg"
          },
          {
            pic: "http://p1.music.126.net/oYarqygkpde5PdYsnUl8Fg==/109951166262846548.jpg"
          }
        ]
        const state = reactive({
          bannerImgs: startbannerImgs
        })
      onMounted(async () => {
        let res = await getBanner(1)
        state.bannerImgs = res.data.banners
        // 只取bannerImgs中的四个数据
        state.bannerImgs = state.bannerImgs.splice(0, 8)
        loading.value = false
      })
      return {
        loading,
        state
      }
    }
  })
</script>
<style>
  .el-carousel__indicators {
    display: flex;
  }
</style>