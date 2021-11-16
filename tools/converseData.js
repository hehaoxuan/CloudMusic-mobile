// 传入一个 num 返回一个保留1位数字的string的 万、亿 播放量格式
export function computedNumber(num = 0) {
        let res
        if (num > 100000000) {
            res = num / 100000000 //res是number类型
            res = res.toFixed(1) + '亿'
        } else if (num > 10000) {
            res = num / 10000
            res = res.toFixed(1) + '万'
        } else{
            res = num
        }
        return res
}