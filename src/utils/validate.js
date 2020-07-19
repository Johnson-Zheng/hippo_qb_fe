/**
 * 邮箱
 * @param {*} s
 */
import axios from "axios";

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

function checkTime(i)
{
    if (i<10)
    {i="0" + i}
    return i
}

export  function dateFormatter (row) {
        let datetime = row.createTime;
        if(datetime){
            datetime = new Date(datetime);
            let y = datetime.getFullYear() + '-';
            let mon = checkTime(datetime.getMonth()+1)+ '-';
            let d = checkTime(datetime.getDate())+ ' ';

            let h = checkTime(datetime.getHours())+':';
            let m = checkTime(datetime.getMinutes())+':'
            let s = checkTime(datetime.getSeconds())
            return y + mon + d + ' ' +h+m+s;
        }
        return 'NULL'
    }

