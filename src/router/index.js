import Vue from "vue"
import Router from 'vue-router'
import login from '@/page/login'
import reset_password from "@/page/reset_password";
import tea_question from "@/page/teacher/tea_question";
import Paper from "@/page/Paper";
import CourseQuery from "../component/question/CourseQuery";
import test from "../page/test";
import QuestionsList from "../component/question/QuestionsList";

Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:login
        },
        {
            path:'/course',
            name:'course',
            component:CourseQuery,
            meta:{
                // 页面标题title
                title: '课程检索组件'
            }
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
            path:'/test',
            name:'test',
            component: test,
            meta:{
                // 页面标题title
                title: '接收参数测试'
            }
        },
        {
            path:'/questionlist',
            name:'QuestionsList',
            component: QuestionsList,
            meta:{
                // 页面标题title
                title: '题目列表'
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
