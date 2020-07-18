<template>
<div><h1>Register</h1>
<CourseQuery @courseid="showcid"></CourseQuery>
    <a>查询结果：{{qdata}}</a>
</div>
</template>

<script>
    import CourseQuery from "./CourseQuery";
    export default {
        name: "register",
        components:{CourseQuery},
        data(){
            return{
                qdata:''
            }
        },
        methods:{
            showcid:function (msg){
                this.qdata=msg
            }
        }
    }
</script>

<style scoped>

</style>
