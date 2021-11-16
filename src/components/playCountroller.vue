<!-- 此组件是用来 '全局' 的播放功能 -->
<template>
    <!-- :ref的另一个功能是 可以获取元素 这里绑定ref="audio"-->
    <div class="playCountroller" v-show="$store.state.isShowplayCountroller">

        <el-row>
            <el-col :span="4">
                <el-image class="playImg" style="width: 1rem; height: 1rem" :src="playlist[playCurrentIndex].al.picUrl">
                </el-image>
            </el-col>
            <el-col :span="16">
                <router-link to="playMusic">
                    <div class="songName">{{playlist[playCurrentIndex].name}}</div>
                    <div class="songTips">横滑可切换上下音频</div>
                </router-link>
            </el-col>
            <el-col :span="2">
                <div class="playCountrollerIcon" @click="pause" v-show="audioStatus.paused">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-weibiaoti--"></use>
                    </svg>
                </div>
                <div class="playCountrollerIcon" @click="play" v-show="!audioStatus.paused">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofang"></use>
                    </svg>
                </div>
            </el-col>
            <el-col :span="2">
                <router-link to="playMusic">
                    <div class="playCountrollerIcon">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-caidan"></use>
                        </svg>
                    </div>
                </router-link>
            </el-col>
        </el-row>
        <audio ref="audio"
            :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"></audio>


    </div>

</template>
<script lang='ts'>
    import {
        computed,
        defineComponent,
        onMounted,
        onUnmounted,
        onUpdated,
        reactive,
        ref,
        toRefs,
        watch
    } from 'vue'
    import {
        mapState,
        useStore
    } from 'vuex'
    export default defineComponent({
        name: 'playCountroller',
        computed: mapState([
            'audioStatus'
        ]),

        setup() {
            const store = useStore()
            const audio = ref() //初始化audio
            const voice = 0.18 //控制音量

            onMounted(() => {
                console.log(audio);
            })

            const play = () => {
                // store.commit('togglePaused')
                UpdataTime()  //音频更新
                audio.value.play()

                console.log(store.state.playlist);
                
                store.commit('audioStatus/togglePaused', true)
            }

            const pause = () => {
                audio.value.pause()
                clearInterval(store.state.audioStatus.intervalId) //清除歌词定时器
                store.commit('audioStatus/togglePaused', false)
            }

            const changeVoice = (voice) => {
                audio.value.volume = store.state.audioStatus.voice
                store.commit('audioStatus/changeVoice', voice)
            }

             const UpdataTime = () => { //异步更新播放时间
                store.state.audioStatus.intervalId = setInterval(() => {
                store.commit('audioStatus/setCurrentTime', audio.value.currentTime)
                }, 1000)
            }

            watch(() => store.state.audioStatus.isPlaying, () => {
                if (store.state.audioStatus.isPlaying == true) //音频播放 而state已经为true暂停了
                {
                    //播放音频
                    play()
                } else if (store.state.audioStatus.isPlaying == false) {
                    pause()
                    //暂停音频
                }
            })

            watch(() => store.state.playCurrentIndex, () => {
                play()
            })

            onUpdated(() => {
                if (audio.value && store.state.audioStatus.paused) { //如果已经暂停 则不切换歌曲
                    play()
                    changeVoice(voice)
                }
                store.dispatch('audioStatus/reqLyric', {
                    id: store.state.playlist[store.state.playCurrentIndex].id
                })
            })

            return {
                audio, //返回audio的值
                play,
                pause,
                playlist: computed(() => store.state.playlist),
                playCurrentIndex: computed(() => store.state.playCurrentIndex),
            }
        },
    })
</script>
<style>
    .playCountroller {
        bottom: 0;
        position: fixed;
        width: 100%;
        background-color: white;
        border-top: 0.51px;
        border-top-color: rgba(226, 226, 226, 0.493);
        border-top-style: solid;
        height: 1rem;
    }

    .playCountrollerIcon {
        /* 不可被选中 */
        -moz-user-select: none;
        /* Firefox私有属性 */
        -webkit-user-select: none;
        /* WebKit内核私有属性 */
        -ms-user-select: none;
        /* IE私有属性(IE10及以后) */
        -khtml-user-select: none;
        /* KHTML内核私有属性 */
        -o-user-select: none;
        /* Opera私有属性 */
        user-select: none;
        /* CSS3属性 */
        margin-top: 0.24rem;
    }

    .playImg {
        margin-left: 0.1rem;
        border-radius: 3rem;
    }

    .playCountrollerIcon>.icon {
        line-height: 0.23rem;
        font-size: 0.23rem;
        width: 2em;
        height: 2em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    .songTips {
        color: #a0a0a0;
        font-size: 0.2rem;
    }

    .songName {
        margin-top: 0.1rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }

    .playImg {
        position: absolute;
        top: -0.1rem
    }
</style>