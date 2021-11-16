import { createStore } from 'vuex'
import audioStatus from './audioStatus'
const store = createStore({
  state: {
    playlist:[{
      name: "Hello",
      al:{
        id: 3377030,
        picUrl: "http://p3.music.126.net/PrO7oPvnjvH4xdujdGbf2w==/1407374890649284.jpg",
      },
      ar:[{
        id:1,
        name:'unknow'
      },
      {
        id:2,
        name:'unknow'
    }]
    }], //播放列表
    playCurrentIndex:0, //当前播放的位置
    isShowplayCountroller:true, //是否显示 播放控制器
  },
  // [playCurrentIndex].al.picUrl
  mutations: {
    setPlaylist:function(state,value){ //重设 playList
      state.playlist = value
    },
    setPlayIndex(state,value){
      state.playCurrentIndex = value
    },
    toggleShowCountroller(state){
      state.isShowplayCountroller = !state.isShowplayCountroller
    }
  },
  getters: {
    TotalTime: function (state) {
      if(state.playCurrentIndex!=null){
         var time = state.playlist[state.playCurrentIndex].dt/1000
      }
      let arr = {
          min: 0,
          sec: 0,
          time:0
      }
      arr.min = parseInt(time / 60) //分钟
      arr.sec = parseInt(time % 60)
      arr.time =  time
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
  actions: {

  },
  modules: {
    audioStatus
  }
})

export default store
