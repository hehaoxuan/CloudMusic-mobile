import {
    parse
} from "@vue/compiler-dom"
import axios from "axios"
import {
    getSonglyric
} from '../api/index'

const audioStatus = {
    namespaced: true,
    state: {
        voice: 0.18, //控制音量大小
        paused: true, //是否为暂停状态 用于ui的显示
        isPlaying: false,
        lyric: "",
        currentTime: 0, //当前的播放时间
        intervalId: 0
    },
    mutations: {
        togglePaused(state, isPaused) {
            state.paused = isPaused
        },
        changeVoice(state, voiceValue) {
            state.voice = voiceValue
        },
        changeIsPlaying(state, value) {
            state.isPlaying = value
        },
        setLyric(state, value) {
            state.lyric = value
        },
        setCurrentTime(state, value) {
            state.currentTime = value
        }
    },
    actions: {
        async reqLyric(content, payload) {
            let result = await getSonglyric(payload.id)
                content.commit('setLyric', result.data.lrc.lyric)
        }
    },
    getters: {
        lyricList: function (state) {
            let arr = state.lyric.split(/\n/igs).map((item, i, arr) => {
                let min = parseInt(item.slice(1, 3)) //分钟
                let sec = parseInt(item.slice(4, 6))
                let mill = parseInt(item.slice(7, 10))

                return {
                    min,
                    sec,
                    mill,
                    lyric: item.slice(11, item.length),
                    content: item,
                    time: mill + sec * 1000 + min * 60 * 1000
                }
            })
            arr.forEach((item, i) => {
                if (i == 0) {
                    item.pre = arr[0].time
                } else {
                    item.pre = arr[i - 1].time
                }
            });
            return arr
        },
        formTime: function (state) {
            let arr = {
                min: 0,
                sec: 0
            }
            arr.min = parseInt(state.currentTime / 60) //分钟
            arr.sec = parseInt(state.currentTime % 60)
            if (arr.sec < 10) {
                arr.sec = '0' + arr.sec
            } else if (arr.min < 10) {
                arr.min = '0' + arr.min
            }
            return {
                arr
            }
        }
    },
}

export default audioStatus