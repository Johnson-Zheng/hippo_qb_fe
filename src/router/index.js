import Vue from "vue"
import Router from 'vue-router'

import login from '@/page/login'
import reset_password from "@/page/reset_password";
import reset_pwd from "../page/reset_pwd";

import tea_question from "@/page/teacher/tea_question";
import tea_paper from "@/page/teacher/tea_paper";
import tea_exam from "@/page/teacher/tea_exam";
import tea_index from "@/page/teacher/tea_index";

import stu_index from "@/page/student/stu_index";
import stu_exam from "@/page/student/stu_exam";
import stu_exam_score from "@/page/student/stu_exam_score";
import stu_exam_paper from "@/page/student/stu_exam_paper";
import stu_exam_paper_score from "@/page/student/stu_exam_paper_score";

import test from "../page/test";
import NewTest from "../page/NewTest";
import Paper from "@/page/Paper";

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

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
            path:'/reset_pwd',
            name:'reset_pwd',
            component: reset_pwd,
            meta:{
                // 页面标题title
                title: '河马题库-重置密码'
            }
        },
        {
            path:'/newtest',
            name:'newtest',
            component: NewTest,
            meta:{
                // 页面标题title
                title: '河马题库-新功能测试页面'
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
        },
        {
            path:'/tea_paper',
            name:'tea_paper',
            component: tea_paper,
            meta:{
                // 页面标题title
                title: '老师端-试卷'
            }
        },
        {
            path:'/tea_exam',
            name:'tea_exam',
            component: tea_exam,
            meta:{
                // 页面标题title
                title: '老师端-考试'
            }
        },
        {
            path:'/tea_index',
            name:'tea_index',
            component: tea_index,
            meta:{
                // 页面标题title
                title: '老师端-首页'
            }
        },
        {
            path:'/stu_index',
            name:'stu_index',
            component: stu_index,
            meta:{
                // 页面标题title
                title: '学生端-首页'
            }
        },
        {
            path:'/stu_exam',
            name:'stu_exam',
            component: stu_exam,
            meta:{
                // 页面标题title
                title: '学生端-考试'
            }
        },
        {
            path:'/stu_exam_score',
            name:'stu_exam_score',
            component: stu_exam_score,
            meta:{
                // 页面标题title
                title: '教师端-考试-成绩列表'
            }
        },
        {
            path:'/stu_exam_paper',
            name:'stu_exam_paper',
            component: stu_exam_paper,
            meta:{
                // 页面标题title
                title: '学生端-考试-开始考试'
            }
        },
        {
            path:'/stu_exam_paper_score',
            name:'stu_exam_paper_score',
            component: stu_exam_paper_score,
            meta:{
                // 页面标题title
                title: '学生端-考试-考试成绩'
            }
        }

    ]

})
