<template>
    <el-dialog title="添加试题" :visible.sync="addDialogVisible" :before-close="cancelAddDialog" :close-on-click-modal="false" append-to-body>
        <el-form label-position="left" :model="addQuestionForm" ref="addQuestionForm" label-width="80" >
            <el-form-item label="试题科目" >
                <el-input v-model=  "addQuestionForm.cid" placeholder="一年级数学"/>
            </el-form-item>
            <el-form-item label="试题类型">
                <el-radio v-model="questionType" label="1">单选题</el-radio>
                <el-radio v-model="questionType" label="2">多选题</el-radio>
                <el-radio v-model="questionType" label="3">主观题</el-radio>
            </el-form-item>
            <el-form-item label="试题科目">
                <CourseQuery @courseid="showcid"></CourseQuery>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import CourseQuery from "@/component/question/CourseQuery";
    export default {
        name: "addQuestion",
        components: {
            CourseQuery
        },

        data(){
            return{
                questionType:'1',
                addQuestionForm:{
                    type:'',
                    //TODO:创建者需要题库页面传参
                    questionName:'',
                    answer:'',
                    optionA:'',
                    optionB:'',
                    optionC:'',
                    optionD:'',
                    optionE:'',
                    optionF:'',
                    diffcult:'', //难度
                    context:'', //答案解析
                    remarks:'',//备注
                    cid: '', //科目编号

                }
            }
        },
        props: {
            addDialogVisible: {
                type: Boolean,
                default: false
            }
        },
        methods:{
            cancelAddDialog() {
                this.$emit("update:addDialogVisible", false)
                this.$refs.addQuestionForm.resetFields();
            },
            showcid:function (msg){
                this.addQuestionForm.cid = msg.cid
            },
        }
    }
</script>

<style scoped>

</style>