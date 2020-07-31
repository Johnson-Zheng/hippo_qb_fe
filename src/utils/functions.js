function dayFormatter(time){
    time = new Date(time)
    return (time.getMonth()+1)+'.'+time.getDate()
}

function getUpDay(day) {
    day = new Date(day)
    day -= 1000 * 60 * 60 * 24
    day = new Date(day)
    return day
}

export function getWeekArray() {
    let weekList = []
    let today = new Date()
    weekList.push(getUpDay(today))
    for(let i=0;i<6;i++){
        weekList.push(getUpDay(weekList[i]))
    }
    for(let i in weekList){
        weekList[i] = dayFormatter(weekList[i])
    }
    weekList = weekList.reverse()
    // console.log(weekList)
    return weekList
}

//求到某时间的秒数
export function timeBetween(startTime,endTime){
    let now = startTime;
    let end = new Date(endTime);
    return parseInt((end - now) / 1000)
}

function addZero(i){
    return i < 10 ? "0" + i: i + "";
}

export function time2HMS(seconds) {
    let h = parseInt(seconds / (60 * 60) % 24)
    let m = parseInt(seconds / 60 % 60)
    let s = parseInt(seconds% 60)
    h = addZero(h)
    m = addZero(m)
    s = addZero(s)
    return h + ':' + m + ':' + s
}

