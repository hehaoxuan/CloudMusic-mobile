<!-- 此组件用来显示 '首页' 推荐歌单图标组-->
<template>
    <div class="musicList">
        <el-row class="musicList_top">
            <el-col :span="6">
                <h2 class="commend">
                    推荐歌单
                </h2>
            </el-col>
            <el-col :span="3" :offset="13">
                <div class="button-more">
                    <el-button type="text" round size="mini" class="moreItem">更多 ></el-button>
                </div>
            </el-col>
        </el-row>
        <el-scrollbar>
            <el-row class="listAllMusic">
                <el-col :span="7" v-for="(item,index) in state.musicList" :key="index">
                    <!-- 通过query:{id:item.id}来设置 router不同的id -->
                    <router-link :to="{path:'/listView', query:{id:item.id}}">
                        <div class="listSong">
                            <el-image lazy class="commondImg" :src="item.picUrl" v-loading="loading" style="display: block;">
                            </el-image>
                            <div class="playDetail">
                                <div class="playicon">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-bofang"></use>
                                    </svg>
                                </div>
                                <div class="playCount">
                                    {{ computedNumber(item.playCount)}}
                                </div>
                            </div>
                            <div class="descripe">{{item.name}}</div>
                        </div>
                    </router-link>
                </el-col>
            </el-row>
        </el-scrollbar>
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
        getCommentSongs
    } from '../../api/index'
    import {
        computedNumber
    } from '../../tools/converseData'
    import { useStore } from 'vuex'

    export default defineComponent({
        name: 'musicList',
        setup() {
            const store =useStore()
            let startlistData = [{
                    picUrl: '',
                    name: '加载中',
                    playCount: '0'
                },
                {
                    picUrl: '',
                    name: '加载中',
                    playCount: '0'
                },
                {
                    picUrl: '',
                    name: '加载中',
                    playCount: '0'
                }
            ]
            const state = reactive({
                musicList: startlistData
            })
            let loading = ref(true)

            onMounted(async () => {
                const commendSongs = await getCommentSongs(10)
                state.musicList = commendSongs.data.result; //避免响应式被替换掉
                loading.value =false
            })

            return {
                state,
                loading,
                computedNumber
            }
        }
    })
</script>
<style>
    .musicList {
        overflow: hidden;
    }

    .commend {
        text-indent: -0.25rem;
        font-size: 0.3rem;
        display: block;
    }

    .button-more {
        line-height: 1rem;
    }

    .moreItem>span {
        border-width: 0.03rem;
        border-color: #ebebeb;
        border-radius: 300rem;
        padding: 0.06rem 0.20rem;
        border-style: solid;
        color: #474747;
        font-size: 0.22rem;
    }

    .listSong {
        position: relative;
    }
    .musicList_top{
        margin: 0 0.2rem;
    }

    .commondImg {
        width: 2rem;
        height: 2rem;
        border-radius: 0.3rem;
        margin: 0 auto;
        margin-bottom: 0.1rem;
    }

    .playDetail {
        position: absolute;
        top: 0.13rem;
        right: 0.123rem;
        font-size: 0.2rem;
        background-color: rgba(43, 43, 43, 0.363);
        padding: 0.03rem 0.1rem;
        border-radius: 300rem;
    }

    .playicon {
        float: left;
        margin-right: 0.02rem;
        color: #fefefe;
    }

    .playicon>svg {
        font-size: 0.25rem;
    }

    .playCount {
        font-weight: 350;
        overflow: hidden;
        font-size: 0.18rem;
        color: #fefefe;
        line-height: 0.24rem;
    }

    .descripe {
        width: 2rem;
        font-size: 0.2rem;
        margin: 0 auto;
        font-weight: 350;
    }

    .listAllMusic {
        flex-wrap: nowrap !important;
        margin-left: 0.20rem;
    }
    .listAllMusic>.el-col{
        margin-right: 0.1rem;
    }

    .el-scrollbar__thumb {
        display: none !important;
    }
</style>