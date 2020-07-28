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
