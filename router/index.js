import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import home from '../views/home.vue'
import listView from '../views/listView.vue'
import playMusic from '../views/playMusic.vue'
import search from '../views/search.vue'
import loginPage from '../views/loginPage.vue'

const routes = [{
    path: '/',
    name: 'home',
    component: home,
    meta:{
      title:'hhx的音乐播放器'
    }
  },
  {
    path:'/listView',
    name:'listView',
    component:listView
  },{
    path:'/playMusic',
    name:'playMusic',
    component:playMusic
  },{
    path:'/search',
    name:'search',
    component:search
  },{
    path:'/loginPage',
    name:'loginPage',
    component:loginPage
  }
]

const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router