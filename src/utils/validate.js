/**
 * 邮箱
 * @param {*}
 */

export function isEmail (s) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

export  function findValue(dir_data, fvalue){
    let result = false
    for(let key in dir_data){
        if(dir_data[key] === fvalue){
        result = true
        return result
        }
    }
}

export  function questionType(row){
    let status = row.type
    switch (status) {
        case 1:
            return '单选题'
        case 2:
            return '多选题'
        case 3:
            return '主观题'
        default:
            return '新题型'
    }
}

function checkTime(i){
    if ( i < 10 ) { i="0" + i }
    return i
}

function timestamp2datetime(datetime){
    if(datetime){
        datetime = new Date(datetime)
        let y = datetime.getFullYear() + '-'
        let mon = checkTime(datetime.getMonth()+1)+ '-'
        let d = checkTime(datetime.getDate())+ ' '
        let h = checkTime(datetime.getHours())+':'
        let m = checkTime(datetime.getMinutes())+':'
        let s = checkTime(datetime.getSeconds())
        return y + mon + d + ' ' +h+m+s
    }
    return 'NULL'
}

export function dateFormatter (row) {
    let datetime = row.createTime
    return timestamp2datetime(datetime)
}
export function startDateFormatter (row) {
    let datetime = row.starttime
    return timestamp2datetime(datetime)
}
export function deadlineDateFormatter (row) {
    let datetime = row.deadline
    return timestamp2datetime(datetime)
}

export function isEmptyObject(obj){ // 判断对象为空
    for (let n in obj) {
        return false
    }
    return true
}
export function sleep(ms) {
    return new Promise(resolve =>
        setTimeout(resolve, ms)
    )
}
export function groupTypeFormatter(row){
    let groupType = row.grouptype
    switch (groupType) {
        case 0:
            return '全部'

        case 1:
            return '名单内可参与'
    }
}

export function securityFormatter(row){
    return row.security? "开启":"关闭"
}

export function examStatusFormatter(row){
    let now = Date.now()
    let start = row.starttime
    let dead = row.deadline
    if( now < start ){
        return '未开始'
    }else if( start < now && now < dead ){
        return '进行中'
    }else if( dead < now){
        return '已结束'
    }
}