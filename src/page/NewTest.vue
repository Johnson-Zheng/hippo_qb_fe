<template>
    <div><h1>Register</h1>
        <!--复制这里 引用组件-->
        <CourseQuery @courseid="showcid"></CourseQuery>
        <a>课程查询结果：{{qdata.cid}}-{{qdata.courseName}}</a>
        <el-button type="text" @click="jumppage">页面传参跳转测试</el-button>
        <PaperQuery @paperid="showpid"></PaperQuery>
        <a>试卷查询结果：{{pdata.pid}}-{{pdata.name}}</a>
        <a>题目添加测试：{{questionlist}}</a>
        <QuestionsList @questuonlist="showqlist"  ref="questionlist"></QuestionsList>
        <el-button
                @click.native.prevent="addquestion()"
                size="small">
            添加题目
        </el-button>
    </div>
</template>

<script>
    import CourseQuery from "../component/question/CourseQuery";//引用组件
    import PaperQuery from "../component/question/PaperQuery";//引用组件
    import QuestionsList from "../component/question/QuestionsList";
    export default {
        name: "NewTest",
        components:{CourseQuery,PaperQuery,QuestionsList},//组件注册
        data(){
            return{
                qdata:{},
                pdata:{},//接受组件值
                pid:'10',
                kid:'1',
                security:true,
                questionlist:[]
            }
        },
        methods:{
            //接受组件传递参数的方法（复制粘贴把this.内容换成自己需要赋值的参数即可）
            showcid:function (msg){
                this.qdata=msg
            },
            showpid:function (msg){
                this.pdata=msg
            },
            showqlist:function (msg){
                this.questionlist=msg
            },
            addquestion(){
                // this.questionlist=[]
                this.$refs.questionlist.dialogFormVisible = true
                this.$refs.questionlist.type = 1
                this.$refs.questionlist.cid = 3
            },
            jumppage(){
                this.$router.push({
                    path: '/paper',
                    name: 'Paper',
                    params: {
                        msgKey: this.qdata.cid,
                        kid:this.kid,
                        pid:this.pid,
                        security:this.security
                    }
                    /*query: {
                        key: 'key',
                        msgKey: this.msg
                    }*/
                })
            }
        }
    }
</script>

<style scoped>

</style>

