import axios from 'axios'
//获取轮播图的api 默认为0
//type的值 = 1: android; 2: iphone; 3:ipad
// const localUrl = "http://localhost:3030"'
const localUrl = "http://music.cpengx.cn"


export function getBanner(type = 0) {
    return axios.get(`${localUrl}/banner?type=${type}`)
}

//说明 : 调用此接口 , 可获取推荐歌单
// 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
export function getCommentSongs(number = 10) {
    return axios.get(`${localUrl}/personalized?limit=${number}`)
}

// 说明:调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐
// 必选参数 : id : 歌单 id
// 可选参数 : s : 歌单最近的 s 个收藏者,默认为8
export function playlistDetail(id) {
    return axios.get(`${localUrl}/playlist/detail?id=${id}`)
}


//说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
// 必选参数 : id: 音乐 id
export function getSonglyric(id) {
    return axios.get(`${localUrl}/lyric?id=${id}`)
}

// 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 
// 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 
// 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export function search(keyword) {
    return axios.get(`${localUrl}/cloudsearch?keywords=${keyword}`)
}

