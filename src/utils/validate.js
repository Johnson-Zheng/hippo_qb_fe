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