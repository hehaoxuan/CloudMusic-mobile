<!-- 此组件用来显示 '首页' 顶部导航栏 -->
<template>
  <div class="nav">
    <el-row>
      <el-col :span="2">
        <el-badge :value="1" class="item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-menu"></use>
          </svg>
        </el-badge>
      </el-col>
      <el-col :span="4" :offset="2">
        <el-link :underline="false" @click="$router.push('/loginPage')">我的</el-link>
      </el-col>
      <el-col :span="4">
        <el-link :underline="false" style="font-weight: bold;">发现</el-link>
      </el-col>
      <el-col :span="4">
        <el-link :underline="false">云村</el-link>
      </el-col>
      <el-col :span="4">
        <el-link :underline="false">视频</el-link>
      </el-col>
      <el-col :span="2" :offset="2" class="el-icon">
        <router-link to="search">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script lang='ts'>
  import {
    defineComponent
  } from 'vue'

  export default defineComponent({
    name: 'topNav',
  })
</script>

<style scoped>
  .el-badge /deep/ .el-badge__content {
    background: rgb(1, 132, 255) !important;
  }
</style>