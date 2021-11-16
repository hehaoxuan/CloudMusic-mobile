<!-- 此组件用来显示 '歌单' 头部的导航栏 -->
<template>
  <div class="listViewTop">
    <div class="backgroundIMG">
      <img :src = playlist.coverImgUrl alt="">
    </div>
    <el-row class="topNav" justify="space-between">
      <el-col :span="1" :offset="1">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </el-col>
      <el-col :span="4" :offset="1">
        <div class="songlistFont">
          歌单©
        </div>
      </el-col>
      <el-col :span="2" :offset="13">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </el-col>
      <el-col :span="2">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo"></use>
        </svg>
      </el-col>
    </el-row>
    <el-row class="topImg" :gutter="30">
      <el-col :span="8" :offset="1" style="position:relative">
        <el-image class="topimg" style="width: 2.4rem; height:2.4rem" :src="playlist.coverImgUrl"></el-image>
        <div class="imgDetail">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofangsanjiaoxing"></use>
          </svg>
          <span class="countDetail">{{ computedNumber(playlist.playCount) }}</span>
        </div>
      </el-col>
      <el-col :span="13" :offset="1">
        <h2 class="listTitle">{{playlist.name}}</h2>
        <div class="authorinfo">
          <el-image class="authorImg" :src="playlist.creator.avatarUrl"></el-image>
          <div class="authorName">{{playlist.creator.nickname}}</div>
        </div>
        <div class="describeText">
          {{playlist.description}}
        </div>
      </el-col>
    </el-row>
    <el-row class="topbutton">
      <el-col :span="6">
        <div class="buttomList">
          <div class="topbuttonIcon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-pinglun"></use>
            </svg>
          </div>
          <div class="describe">{{ playlist.commentCount }}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="buttomList">
          <div class="topbuttonIcon"><svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenxiang"></use>
            </svg></div>
          <div class="describe">{{ playlist.shareCount }}</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="buttomList">
          <div class="topbuttonIcon"><svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
            </svg></div>
          <div class="describe">下载</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="buttomList">
          <div class="topbuttonIcon"><svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xuanzhong"></use>
            </svg></div>
          <div class="describe">多选</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang='ts'>
  import {
    defineComponent, onMounted, reactive
  } from 'vue'
  import {computedNumber} from '../../tools/converseData'
  export default defineComponent({
    name: 'listViewtop',
    props:['playlist'],
    setup(props){
      return{
        computedNumber
      }
    }
  })
</script>
<style>
  .topNav {
    padding: 0.6rem 0;
    line-height: 0.38rem;
    font-size: 0.35rem;
  }

  .topimg{
    position: relative;
  }

  .icon {
    font-size: 0.38rem;
    cursor: pointer;

  }

  .listTitle {
    letter-spacing: 0.3px;
    margin: 0 0;
    font-size: 0.28rem;
    text-align: start;
    vertical-align: middle;
    font-weight: 550;
  }

  .imgDetail {
    top: 0.14rem;
    right: 0rem;
    position: absolute;
    font-size: 0.23rem;
    color: rgb(255, 255, 255);
    background: #0000001f;
    padding: 0.03rem 0.08rem;
    border-radius: 3rem;
  }

  .imgDetail>.icon {
    font-size: 0.26rem;
  }


  .authorImg {
    float: left;
    width: 0.58rem;
    height: 0.58rem;
    border-radius: 3rem;
    margin-right: 0.2rem;
  }

  .authorName {
    letter-spacing: 0.5px;
    text-align: start;
    overflow: hidden;
    font-size: 0.24rem;
    font-weight: 300;
    line-height: 0.6rem;
  }

  .authorinfo {
    margin: 0.25rem 0 0.25rem 0;
    color: #f5f4f5d0;
  }

  .describeText {
    letter-spacing: 1px;
    color: #f5f4f5d0;
    font-size: 0.18rem;
    display: -webkit-box;
    /* 使用webkit拓展显示 */
    -webkit-box-orient: vertical;
    /* 伸缩盒子的排列方式 */
    -webkit-line-clamp: 2;
    /* 盒子的显示行数 */
    overflow: hidden;
  }

  .topbutton {
    padding-top: 0.3rem;
  }

  .listViewTop {
    overflow: hidden;
        color: #f5f4f5;
  }

  .describe{
     color: #f5f4f5d0;
  }


  .buttomList {
    text-align: center;
    font-size: 0.18rem;
    font-weight: 400;
  }

  .topbuttonIcon>.icon {
    font-size: 0.34rem;
    margin-bottom: 0.06rem;

    vertical-align: -0.15em;
    fill: currentColor;
    overflow: visible;
  }

  .backgroundIMG {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(80px);
    -webkit-filter: blur(80px);
    -moz-filter: blur(80px);
    -ms-filter: blur(80px);
    -o-filter: blur(80px);
  }
</style>