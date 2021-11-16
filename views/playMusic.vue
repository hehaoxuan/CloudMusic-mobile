<template>
    <div class="playMusic">
        <img :src="playlist[playCurrentIndex].al.picUrl" alt="" class="backgroundImg">
        <el-row class="headIcon">
            <el-col :span="6" @click="$router.go(-1)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiantou9"></use>
                </svg>
            </el-col>
            <el-col :span="12">
                <div class="playTitle">
                    <marquee v-if="playlist[playCurrentIndex].name.length>12" behavior="srcoll" direction="left">
                        {{playlist[playCurrentIndex].name}}</marquee>
                    <div v-else-if="playlist[playCurrentIndex].name.length<12">{{playlist[playCurrentIndex].name}}</div>
                </div>
                <div class="playAutor">
                    <span>{{playlist[playCurrentIndex].ar[0].name}}</span>
                </div>
            </el-col>
            <el-col :span="6">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
            </el-col>
        </el-row>

        <el-row class="playImg" @click="toggleShowlyric" v-show="isShowlyric">
            <el-col :span=24>
                <el-image style="width: 4.5rem; height: 4.5rem" :src="playlist[playCurrentIndex].al.picUrl"
                    :fit='contain' class="songImg"></el-image>
            </el-col>
        </el-row>

        <el-row class="Lyric" @click="toggleShowlyric" v-show="!isShowlyric" ref="playLyric">
            <el-col :span=24>
                <p v-for="(item,i) in $store.getters['audioStatus/lyricList']" :key="i" class="LyricFont"
                    :class="{activeLyric:(audioStatus.currentTime*1000 >= item.pre && audioStatus.currentTime*1000 < item.time)}">
                    {{item.lyric}}
                </p>
                <!-- 当前时间大于之前的时间 并且 小于将来的时间 -->
            </el-col>
        </el-row>
        <div class="buttomSetting">
            <el-row class="playIconList" justify="center">
                <el-col :span="4">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xihuan"></use>
                    </svg>
                </el-col>
                <el-col :span="4">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
                    </svg>
                </el-col>
                <el-col :span="4">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-pinglun"></use>
                    </svg>
                </el-col>
                <el-col :span="4">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gengduo1"></use>
                    </svg>
                </el-col>
            </el-row>

            <el-row class="playLine" justify="center">
                <el-col :span="3" class="currentTime">
                    {{$store.getters['audioStatus/formTime'].arr.min}}:{{$store.getters['audioStatus/formTime'].arr.sec}}
                </el-col>
                <el-col :span="18" class="playLine">
                    <el-progress :text-inside="true" :stroke-width="10" :percentage="progress"></el-progress>
                </el-col>
                <el-col :span="3" class="allTime">
                {{$store.getters['TotalTime'].arr.min}}:{{$store.getters['TotalTime'].arr.sec}}
                </el-col>
            </el-row>

            <el-row justify="center" class="playControllIcon">
                <el-col :span="4">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xunhuan"></use>
                    </svg>
                </el-col>
                <el-col :span="4">
                    <svg class="icon" aria-hidden="true" @click="changeplayCurrentIndex(-1)">
                        <use xlink:href="#icon-shangyishoushangyige"></use>
                    </svg>
                </el-col>
                <el-col :span="4">
                    <svg class="icon playCenterIcon" aria-hidden="true" @click="pause" v-show="audioStatus.paused">
                        <use xlink:href="#icon-ico_zanting_xuanzhong"></use>
                    </svg>
                    <svg class="icon playCenterIcon" aria-hidden="true" @click="play" v-show="!audioStatus.paused">
                        <use xlink:href="#icon-bofang"></use>
                    </svg>
                </el-col>
                <el-col :span="4">
                    <svg class="icon" aria-hidden="true" @click="changeplayCurrentIndex(1)">
                        <use xlink:href="#icon-xiayigexiayishou"></use>
                    </svg>
                </el-col>
                <el-col :span="4">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-caidan"></use>
                    </svg>
                </el-col>
            </el-row>
        </div>
    </div>

</template>
<script lang='ts'>
    import {
        computed,
        defineComponent,
        onBeforeUnmount,
        onMounted,
        ref,
        watch,
    } from 'vue'
    import {
        useStore,
        mapState,
        mapMutations
    } from 'vuex'
    export default defineComponent({
        name: 'playMusic',
        computed: mapState([
            'playlist',
            'playCurrentIndex',
            'audioStatus',
        ]),
        methods: {
            // ...mapMutations({

            // })
        },
        watch: {
            currentTime: function (newValue) {
                let p = document.querySelector('p.activeLyric') || null
                if (p != null) {
                    this.$refs.playLyric.$el.scrollTop = p.offsetTop - 200 //播放的起始位置
                }
                this.progress = (this.currentTime /  this.totalTime)*100
                console.log(this.progress);
                
            },
        },

        setup() {
            //   使用生命周期 在该组件加载后 将playCountroller 隐藏
            const store = useStore()
            const isShowlyric = ref(false) //是否显示lyric
            const progress = ref(0)

            console.log(store);
            const play = () => {
                // store.commit('togglePaused')
                console.log(store.state.audioStatus.currentTime);

                store.commit('audioStatus/togglePaused', true)
                store.commit('audioStatus/changeIsPlaying', true)
            }

            const pause = () => {
                store.commit('audioStatus/togglePaused', false)
                store.commit('audioStatus/changeIsPlaying', false)
            }

            const changeVoice = (voice) => {
                store.commit('audioStatus/changeVoice', voice)
            }

            const toggleShowlyric = () => {
                isShowlyric.value = !isShowlyric.value
            }

            const changeplayCurrentIndex = (direction) => {
                // 判断并提交
                if (direction == -1 && store.state.playCurrentIndex == 0) { //最左边
                    store.commit('setPlayIndex', store.state.playlist.length-1)
                } else if (direction == 1 && store.state.playCurrentIndex == store.state.playlist.length-1) {//提交到最右边
                    store.commit('setPlayIndex', 0)
                }else{
                    store.commit('setPlayIndex', store.state.playCurrentIndex + direction)
                }
            }

            onMounted(() => {
                store.commit('toggleShowCountroller')
                //同步 播放/暂停状态
                store.commit('audioStatus/changeIsPlaying', store.state.audioStatus.paused)
            })
            onBeforeUnmount(() => {
                store.commit('toggleShowCountroller')
                // 同步 播放/暂停状态
                store.commit('audioStatus/changeIsPlaying', {
                    id: store.state.audioStatus.paused
                })
            })

            return {
                pause,
                play,
                changeVoice,
                toggleShowlyric,
                isShowlyric,
                changeplayCurrentIndex,
                progress,
                currentTime: computed(() => store.state.audioStatus.currentTime),
                totalTime: store.getters['TotalTime'].arr.time
            }
        }

    })
</script>
<style scoped>
    .playImg {
        height: 8.7rem;
        line-height: 8rem;
    }

    .playMusic {
        text-align: center;
        overflow: hidden;
        color: rgba(255, 255, 255, 0.822);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 500;
        letter-spacing: 0.3px;
    }

    .headIcon {
        margin-top: 0.6rem;
    }

    .songImg {
        border-radius: 3rem;
        vertical-align: middle;
    }

    .el-col>.icon {
        font-size: 0.5rem;
        color: #ffffffe3;
    }

    .el-col>.playCenterIcon {
        font-size: 1rem;

    }

    .playIconList {
        height: 0.6rem;
    }

    .playLine {
        height: 0.78rem;
        margin-top: 0.3rem;
        line-height: 0.6rem;
    }

    .playControllIcon>div {
        line-height: 1.2rem;
    }

    .playAutor {
        font-size: 0.26rem;
    }

    .backgroundImg {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        filter: blur(80px);
        background-size: auto 110%;
        background-position: center;
        background-color: rgb(255, 0, 0);
        /* -webkit-filter: blur(60px);
        -moz-filter: blur(60px);
        -ms-filter: blur(60px);
        -o-filter: blur(60px); */
        /* filter: blur(40px); */
    }

    .buttomSetting {
        position: absolute;
        bottom: 0.3rem;
        width: 100%;
    }

    .Lyric {
        height: 8.5rem;
        font-size: 0.3rem;
        font-weight: 300;
        overflow-x: scroll;
        align-items: center;
        justify-content: center;
        margin-right: -9px;
    }

    .Lyric>p {
        margin-left: 0.4rem;
        margin-right: 0.4rem;
    }

    .activeLyric {
        color: #ff2a00;
    }
</style>