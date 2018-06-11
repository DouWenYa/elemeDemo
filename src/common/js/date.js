export function formatDate (time, fmt) {
    let date = new Date(time)
    let o = {
        'Y+': date.getFullYear(),
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k]+''
            if (k==='Y+') {
                fmt = fmt.replace(RegExp.$1, str.substr(4-RegExp.$1.length))
            } else {
                fmt = fmt.replace(RegExp.$1, addZero(str))
            }
        }
    }
    return fmt
}
function addZero (str) {
    return ('00'+str).substr(str.length)
}
