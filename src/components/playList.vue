<!-- listView中的 播放 歌单组件 -->
<template>
  <div class="playList" justify="space-between">
    <el-row class="playSetting">
      <el-col :span="2" :offset="1">
        <div class="playIcon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="playContext">
          播放全部
          <span class="totalCount">(共{{playlist.tracks.length}}首)</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="collect">
          + &nbsp收藏({{computedNumber(playlist.subscribedCount)}})
        </div>
      </el-col>
    </el-row>

    <el-row v-for="(item,index) in playlist.tracks" :key="index" class="muiscListAll">
      <el-col :span="3">
        <div class="listOrder">
          {{ index+1 }}
        </div>
      </el-col>
      <el-col :span="17">
        <div class="listAll" @click="setPlayIndex(index)">
          <div class="songTitle">
            {{ item.name }}
          </div>
          <span class="specailogo">
            <!-- <span class="logoVip">vip</span>
            <span class="logoSq">sq</span>
            <span class="logoAlone">独家</span> -->
            <span class="logoVip"></span>
          </span>
          <span class="listAuthor">{{item.ar[0].name}} - {{item.al.name}}</span>
        </div>

      </el-col>
      <el-col :span="2" class="listAuthorIcon">
          <div class="listMv">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofangshu"></use>
            </svg>
          </div>
      </el-col>
      <el-col  :span="2" class="listAuthorIcon">
      <div class="listMore">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo"></use>
        </svg>
      </div>
      </el-col>

    </el-row>

  </div>
</template>
<script lang='ts'>
  import {
    computed,
    defineComponent
  } from 'vue'
  import {
    computedNumber
  } from '../../tools/converseData'
  import { mapMutations, useStore } from 'vuex'

  export default defineComponent({
    name: 'playList',
    props: ['playlist'],
    setup() {
      const store = useStore();
      // const state = store.state.index
      const setPlayIndex = (index) => {
        store.commit('setPlayIndex',index)
        // 设置自动播放
        // store.commit('audioStatus/togglePaused', true)
      }
      return {
        computedNumber,
        setPlayIndex
      }
    }
  })
</script>
<style>
  .element::-webkit-scrollbar {
    width: 0 !important
  }

  .playList {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 0.4rem;
    margin-top: 0.3rem;
    margin-bottom: 1.2rem
  }

  .listMore,
  .listMv {
    display: inline-block;
  }

  .listOrder {
    text-align: center;
  }

  .listAll {
    letter-spacing: 0.8px;
    cursor: pointer;
  }

  .songTitle,
  .listAuthor {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .songTitle {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: 500;
    font-size: 0.26rem;
  }

  .playSetting {
    height: 1rem;
    line-height: 1rem;
    margin-bottom: 0.3rem;
  }

  .totalCount {
    word-spacing: 0;
    font-size: 0.24rem;
    color: #808080;
  }

  .collect {
    margin-top: 0.1rem;
    font-size: 0.22rem;
    color: #fdf2ee;
    background-color: #ff4a3c;
    border-radius: 3rem;
    height: 0.7rem;
    line-height: 0.7rem;
    width: 1.8rem;
    text-align: center;
    cursor: pointer;
  }

  .playContext {
    font-size: 0.29rem;
  }

  .listAuthor {
    font-size: 0.2rem;
    font-weight: 500;
    color: #a8a8a8;
  }

  .muiscListAll {
    margin-bottom: 0.3rem;
  }

  .listOrder {
    line-height: 0.6rem;
    color: #a0a0a0;
  }
</style>