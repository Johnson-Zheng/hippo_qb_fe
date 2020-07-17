import Vue from "vue"
import Router from 'vue-router'
import login from '@/page/login'
import reset_password from "@/page/reset_password";
import tea_question from "@/page/teacher/tea_question";
import Paper from "@/page/Paper";

Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:login
        },
        {
            path:'/login',
            name:'login',
            component:login,
            meta:{
                // 页面标题title
                title: '河马题库-登陆注册'
            }
        },
        {
            path:'/reset_password',
            name:'reset_password',
            component: reset_password,
            meta:{
                // 页面标题title
                title: '河马题库-找回密码'
            }
        },
        {
            path:'/tea_question',
            name:'tea_question',
            component: tea_question,
            meta:{
                // 页面标题title
                title: '老师端-题库'
            }
        },
        {
            path:'/Paper',
            name:'Paper',
            component: Paper,
            meta:{
                // 页面标题title
                title: 'Paper'
            }
        }
    ]

})