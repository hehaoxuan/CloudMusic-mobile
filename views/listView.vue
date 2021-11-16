<!-- 该视图是用来显示 推荐 '歌单' 列表 -->
<template>
  <ListViewTop :playlist="state.playlist" />
  <PlayList :playlist="state.playlist" />
</template>

<script lang='ts'>
  import playList from '../src/components/playList.vue'
  import listViewTop from '../src/components/listViewTop.vue'
  import {
    defineComponent,
    onMounted,
    reactive,
  } from 'vue'
  import { useRoute} from 'vue-router'
  import {playlistDetail} from "../api/index";
  import { useStore } from 'vuex'

  export default defineComponent({
    name: 'listView',
    components: {
      ListViewTop: listViewTop,
      PlayList: playList
    },
    setup() {
      const route = useRoute()
      const state = reactive({
        listData: [],
        playlist: {
          creator: [],
          tracks: [],
        }
      })
      const store = useStore()


      onMounted(async () => {
        const listid = route.query.id; //接收router里的query属性里的id值
        const res = await playlistDetail(listid)
        state.playlist = res.data.playlist
        
        store.commit('setPlaylist', state.playlist.tracks)
        console.log(route);
        
      })
      return {
        state
      }
    }
  })
</script>

<style>

</style>