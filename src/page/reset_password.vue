<template>
<div><h1>Register</h1>
    <!--复制这里 引用组件-->
<CourseQuery @courseid="showcid"></CourseQuery>
    <a>查询结果：{{qdata}}</a>
</div>
</template>

<script>
    import CourseQuery from "./CourseQuery";//引用组件
    export default {
        name: "register",
        components:{CourseQuery},//组件注册
        data(){
            return{
                qdata:''//接受组件值
            }
        },
        methods:{
            //接受组件传递参数的方法（复制粘贴把this.内容换成自己需要赋值的参数即可）
            showcid:function (msg){
                this.qdata=msg
            }
        }
    }
</script>

<style scoped>

</style>
