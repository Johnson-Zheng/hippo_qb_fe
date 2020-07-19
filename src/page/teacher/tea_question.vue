<template>
<div class="container">

    <navigation></navigation>
    <div class="table-panel panel_shadow">
        <h2>试题列表</h2>
        <el-table
                :data="questionTable"
                v-loading="loading"
                :default-sort = "{prop: 'qid', order: 'ascending'}"
                style="width: 100%"
                :header-cell-style="{background:'#F5F7FA',fontWeight:'400'}"
                height="420"
                show-overflow-tooltip="true"
                fit=true
        >
            <el-table-column
                    align="center"
                    type="selection"
                    width="50">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="qid"
                    label="编号"
                    sortable
                    width="80"
                    >
            </el-table-column>
            <el-table-column
                    prop="questionName"
                    label="题目"
                    min-width="120"
                    sortable
                    :show-tooltip-when-overflow="true"
                    >
            </el-table-column>
            <el-table-column
                    prop="answer"
                    label="答案"
                    :show-tooltip-when-overflow="true"

                    sortable
                    >
            </el-table-column>
            <el-table-column
                    prop="cid"
                    sortable
                    label="科目"
                    width="80"
                    >
            </el-table-column>
            <el-table-column
                    prop="type"
                    align="center"
                    sortable
                    :formatter="questionType"
                    label="题目类型"
                    width="100"
                    >
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    sortable
                    :formatter="dateFormatter"
                    label="添加时间"
                    min-width="100"
                    >
            </el-table-column>
            <el-table-column
                    prop="diffcult"
                    min-width="100"
                    sortable
                    label="题目难度"
                    align="center"
                    >
            </el-table-column>
            <el-table-column
                    fixed="right"
                label="操作"
                    min-width="80"
                >
            <template slot-scope="scope">
                <el-button @click="checkInfo(scope.row)" type="text" size="small">查看详情></el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="operate-panel">
            <el-button class="operate-button" type="danger">删除</el-button>
            <el-button class="operate-button add-button" type="primary " @click="addQuestion">添加试题</el-button>
        </div>
    </div>
    <copyright></copyright>
    <question-info id="questionInfo" :dialogVisible="dialogVisible" :dialogInfo="dialogInfo" @update:dialogVisible="dialogVisibles "></question-info>
    <add-question id="addQuestion" :addDialogVisible="addDialogVisible" @update:addDialogVisible="addDialogVisibles"></add-question>
</div>
</template>

<script>
    import navigation from "@/component/header/navigation";
    import Copyright from "@/component/footer/copyright";
    import dayjs from 'dayjs'
    import questionInfo from "@/component/question/questionInfo";
    import {questionType,dateFormatter} from "@/utils/validate"
    import addQuestion from "@/component/question/addQuestion";
    export default {
        name: "tea_question",
        components:{
            addQuestion,
            Copyright,
            navigation,
            questionInfo
        },
        data(){
            return{
                questionType: questionType,
                dateFormatter,
                //控制弹窗 显示
                dialogVisible: false,
                //点击查看按钮  这条数据详细信息
                dialogInfo:{},
                addDialogVisible:false,
                loading:false,
                questionTable: null,
                testTableData: [{
                    qid: '1',
                    questionName: '1+1=',
                    answer: 'B',
                    type: '单选',
                    cid: '一年级数学',
                    createTime: '200',
                    diffcult: '普通'
                }],
            }
        },
        mounted(){
            this.loading = true
            this.getQuestionTable()
        },
        methods:{
            getQuestionTable(){
                this.$axios.get('/api/question/alllist').then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.questionTable = res.data.data
                        console.log(this.questionTable)
                        this.loading = false
                    }
                })
            },
            checkInfo(row){
                this.dialogVisible = true;
                this.dialogInfo = row
            },
            dialogVisibles(v){
                this.dialogVisible = v
            },
            addDialogVisibles(v){
                this.addDialogVisible = v
            },
            addQuestion(){
                this.addDialogVisible = true;
            }
        }
    }
</script>

<style scoped>
    .table-panel{
        position: relative;
        margin:30px auto;
        width: 88%;
        text-align:left;
    }
    .operate-panel{
        position: relative;
        margin-top:20px;
    }

    #questionInfo >>> .el-dialog{
        width: 550px;
        height: max-content;
        border-radius: 10px;
        padding: 20px;
    }
    #questionInfo >>> .el-dialog__title{
        font-size:24px;
        font-weight: 500;
        text-align: left!important;
    }
    #addQuestion >>> .el-dialog{
        width: 550px;
        height: max-content;
        border-radius: 10px;
        padding: 20px;
    }
    #addQuestion >>>.el-dialog__title{
        font-size:24px;
        font-weight: 500;
        text-align: left!important;
    }
</style>
