<!-- 此组件用来显示 '首页' 功能图标组 -->
<template>
    <div class="iconList">
        <el-row justify="space-between">
            <el-col :span="4">
                <div class="back-round icon-shadow">
                    <svg class="icon-list" aria-hidden="true">
                        <use xlink:href="#icon-tuijian"></use>
                    </svg>
                </div>
                <div class="title">每日推荐</div>
            </el-col>
            <el-col :span="4">
                <div class="back-round icon-shadow">
                    <svg class="icon-list" aria-hidden="true">
                        <use xlink:href="#icon-diantai"></use>
                    </svg>
                </div>
                <div class="title">私人FM</div>
            </el-col>
            <el-col :span="4">
                <div class="back-round icon-shadow">
                    <svg class="icon-list songTable" aria-hidden="true">
                        <use xlink:href="#icon-gedan"></use>
                    </svg>
                </div>
                <div class="title">歌单</div>
            </el-col>
            <el-col :span="4">
                <div class="back-round icon-shadow">
                    <svg class="icon-list" aria-hidden="true">
                        <use xlink:href="#icon-paihang"></use>
                    </svg>
                </div>
                <div class="title">排行榜</div>
            </el-col>
            <el-col :span="4">
                <div class="back-round icon-shadow">
                    <svg class="icon-list" aria-hidden="true">
                        <use xlink:href="#icon-zhibo1"></use>
                    </svg>
                </div>
                <div class="title">直播</div>
            </el-col>
        </el-row>
    </div>
</template>
<script lang='ts'>
    import {
        defineComponent
    } from 'vue'
    export default defineComponent({
        name: 'iconList',
    })
</script>
<style>
    .iconList{
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-color: #e0e0e0b2;
    }
</style>