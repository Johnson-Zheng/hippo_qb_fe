<template>
<div class="container">

    <navigation></navigation>
    <div class="table-panel panel_shadow">
        <h2>试题列表</h2>
        <el-table
                :data="questionTable"
                ref="questionTable"
                v-loading="loading"
                :default-sort = "{prop: 'createTime', order: 'descending'}"
                style="width: 100%"
                :header-cell-style="{background:'#F5F7FA',fontWeight:'400'}"
                max-height="420"
                size="small"
                show-overflow-tooltip="true"
                fit>
          <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="课程编号">
                        <p class="tips-text">{{ props.row.course.cid}}</p>
                    </el-form-item>
                    <el-form-item label="课程名称">
                        <p class="tips-text">{{ props.row.course.courseName}}</p>
                    </el-form-item>
                    <el-form-item label="课程介绍">
                        <p class="tips-text">{{ props.row.course.coursecontext}}</p>
                    </el-form-item>
                </el-form>
            </template>
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
                    min-width="150"
                    sortable
                    :show-tooltip-when-overflow="true"
                    >
            </el-table-column>
            <el-table-column
                    prop="answer"
                    label="答案"
                    :show-tooltip-when-overflow="true"
                    width="100"
                    align="center"
                    >
            </el-table-column>
            <el-table-column
                    prop="course.courseName"
                    sortable
                    label="课程"
                    width="120"
                    >
            </el-table-column>
            <el-table-column
                    prop="type"
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
                    width="170"
                    >
            </el-table-column>
            <el-table-column
                    prop="createBy"
                    width="100"
                    sortable
                    label="创建者"
                    align="center"
                    >
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="100"
                >
            <template slot-scope="scope">
                <el-button @click="checkInfo(scope.row)" type="text" size="small">查看详情></el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="operate-panel" >
            <el-row type="flex" justify="end">
                <el-col :span="4">
                    <el-button class="operate-button" type="primary " @click="addQuestion">添加试题</el-button>
                </el-col>
            </el-row>
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
        data() {
            return {
                // delVisible:false,
                selectBoxList:[],
                questionType: questionType,
                dateFormatter,
                //控制弹窗 显示
                dialogVisible: false,
                //点击查看按钮  这条数据详细信息
                dialogInfo: {},
                addDialogVisible: false,
                loading: false,
                questionTable: [],
            }
        },
        mounted(){
            this.loading = true
            this.getQuestionTable()
        },
        methods:{
            getQuestionTable(){
                this.$axios.get('question/alllist').then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.questionTable = res.data.data
                        this.loading = false
                    }
                }).catch(error => {
                    let message = error.message
                    this.$message.error(message)

                });
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
            },

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
        padding: 20px 20px 10px  20px;
    }
    #addQuestion >>>.el-dialog__title{
        font-size:24px;
        font-weight: 500;
        text-align: left!important;
    }
    #addQuestion >>> .el-radio-group{
        width: 100%;
    }
    #addQuestion >>> .el-select{
        width:100%;
    }
    .demo-table-expand >>> .el-form-item__label{
        font-weight: 500;
        font-size: 14px;
    }

</style>
