<template>
    <div class="searchTop">
        <el-row class="search">
            <el-col :span="2" :offset="1" class="backIcon">
                <svg class="icon" aria-hidden="true" @click="$router.push('/')">
                    <use xlink:href="#icon-fanhui"></use>
                </svg>
            </el-col>
            <el-col :span="18" :offset="1">
                <el-input v-model="searchkey" :placeholder=placeholder @keyup.enter="saveKeyWord"></el-input>
            </el-col>
        </el-row>

        <el-scrollbar>
            <el-row class="history">
                <el-col :span="2" :offset="2">
                    <div class="titile">历史</div>
                </el-col>
                <span @click="historySearch(item)" class="SearchItem" v-for="(item,index) in keywordList" :key="index">{{item}}</span>
            </el-row>

        </el-scrollbar>
    <SearchList :searchSongs="searchSongs"/>
    </div>
</template>
<script lang='ts'>
    import {
        defineComponent
    } from 'vue'
    import {
        search
    } from '../../api/index'
    import SearchList from '../components/SearchList.vue'

    export default defineComponent({
        name: 'searchTop',
        components:{
            SearchList:SearchList
        },
        methods: {
            saveKeyWord: async function () {
                if (this.searchkey.trim()) {
                    this.keywordList.unshift(this.searchkey)
                    this.keywordList = Array.from(new Set(this.keywordList))


                    localStorage.keywordList = JSON.stringify(this.keywordList)
                    let result = await search(this.searchkey)
                    this.searchSongs = result.data.result.songs;
                    console.log(this.searchSongs);
                    this.searchkey = ""
                }
            },
            historySearch(keyword){
                this.searchkey = keyword
                this.saveKeyWord()
            }
        },
        data: function () {
            return {
                placeholder: "请输入内容",
                searchkey: '',
                keywordList: [],
                searchSongs: []
            }
        },
        beforeMount() {
            if (localStorage.keywordList) {
                this.keywordList = JSON.parse(localStorage.keywordList)
            } else {
                return ''
            }
        },

    })
</script>
<style>
    .backIcon {
        line-height: 0.8rem;
    }

    .searchTop {
        margin-top: 0.4rem;
        padding-bottom: 0.4rem;
    }

    .titile {
        line-height: 0.7rem;
    }

    .search {
        padding-bottom: 0.25rem;
    }

    .SearchItem {
        background-color: #f3f3f3;
        margin: 0.13rem 0.1rem;
        border-radius: 3rem;
        border: solid 5px #f3f3f3;
        font-size: 0.2rem;
        cursor: pointer;
        height: 0.3rem;
    }

    .history {
        height: 1rem;

    }
</style>