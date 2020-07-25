<template>
<div class="container">
    <navigation></navigation>
    <div class="table-panel panel_shadow">
        <h2>考试列表</h2>
        <el-table
                :data="examTable"
                ref="examTable"
                v-loading="loading"
                :default-sort = "{prop: 'createTime', order: 'descending'}"
                style="width: 100%"
                :header-cell-style="{background:'#F5F7FA',fontWeight:'400'}"
                max-height="420"
                show-overflow-tooltip="true"
                size="small"
                fit>
            <el-table-column
                    align="center"
                    prop="kid"
                    label="考试编号"
                    sortable
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="pid"
                    label="试卷编号"
                    sortable
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="考试标题"
                    width="150"
                    sortable
                    :show-tooltip-when-overflow="true">
            </el-table-column>
            <el-table-column
                    prop="starttime"
                    sortable
                    label="开始时间"
                    :formatter="startDateFormatter"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="time"
                    align="center"
                    label="考试时长"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="grouptype"
                    :formatter="groupTypeFormatter"
                    label="可参加人员"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="allowtimes"
                    align="center"
                    label="可进入时间"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    sortable
                    :formatter="dateFormatter"
                    label="添加时间"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    prop="createBy"
                    min-width="100"
                    sortable
                    label="创建者"
                    align="center">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    min-width="80">
            <template slot-scope="scope">
                <el-button @click="checkInfo(scope.row)" type="text" size="small">查看详情></el-button>
            </template>
            </el-table-column>
        </el-table>

        <div class="operate-panel" >
            <el-row type="flex" justify="end">
                <el-col :span="20">
                    <el-pagination
                            @size-change="handleSizeChange"
                            :page-sizes="[10,20,50]"
                            :page-size=dataPerPage
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            layout="total, prev, pager, next,sizes"
                            background
                            :total=totalElements>
                    </el-pagination>
                </el-col>
                <el-col :span="4">
                    <el-button class="operate-button" type="primary " @click="addQuestion">添加试卷</el-button>

                </el-col>
            </el-row>

        </div>

    </div>
    <copyright></copyright>
    <add-paper id="addPaper" :addDialogVisible="addDialogVisible" @update:addDialogVisible="addDialogVisibles"></add-paper>
<!--    <add-question id="addQuestion" :addDialogVisible="addDialogVisible" @update:addDialogVisible="addDialogVisibles"></add-question>-->
<!--    <paper-info id="paperInfo" :dialogVisible="dialogVisible" :dialogInfo="dialogInfo" @update:dialogVisible="dialogVisibles "></paper-info>-->
    <exam-info id="examInfo" :dialogVisible="dialogVisible" :dialogInfo="dialogInfo" @update:dialogVisible="dialogVisibles "></exam-info>
</div>
</template>

<script>
    import navigation from "@/component/header/navigation";
    import Copyright from "@/component/footer/copyright";
    import PaperInfo from "@/component/paper/paperInfo";
    import examInfo from "@/component/exam/examInfo";
    import {questionType,dateFormatter,startDateFormatter,deadlineDateFormatter,groupTypeFormatter} from "@/utils/validate"
    import addPaper from "@/component/paper/addPaper";
    export default {
        name: "tea_paper",
        components:{
            examInfo,
            addPaper,
            // addQuestion,
            Copyright,
            navigation,
        },
        data() {
            return {
                //当前页码
                currentPage:0,
                //每页数据数量
                dataPerPage:10,
                //总元素数
                totalElements: 0,
                questionlist:[],
                questionType: questionType,
                dateFormatter,
                startDateFormatter,
                deadlineDateFormatter,
                groupTypeFormatter,
                //控制弹窗 显示
                dialogVisible: false,
                //点击查看按钮  这条数据详细信息
                dialogInfo: {},
                addDialogVisible: false,
                loading: false,
                examTable: null,
            }
        },
        mounted(){
            this.loading = true
            this.getPaperTable(this.dataPerPage,this.currentPage)
        },
        methods:{
            getPaperTable(dataPerpage, currentPage){
                this.$axios.get('exroom/listnum?num='+dataPerpage+'&start='+currentPage).then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.examTable = res.data.data["content"]
                        this.totalElements = res.data.data['totalElements']
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
            handleSizeChange(val){
                this.dataPerPage = val
                this.loading = true
                this.getPaperTable(this.dataPerPage,this.currentPage-1)
            },
            handleCurrentChange(val){
                this.currentPage = val
                this.loading = true
                this.getPaperTable(this.dataPerPage,this.currentPage-1)
            },
            addDialogVisibles(v){
                this.addDialogVisible = v
            },
            addQuestion(){
                this.addDialogVisible = true;
            },
            showqlist:function (msg){
                this.questionlist=msg
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

    #examInfo >>> .el-dialog{
        width: 700px;
        height: max-content;
        border-radius: 10px;
        padding: 20px;
    }
    #examInfo >>> .el-dialog__title{
        font-size:24px;
        font-weight: 500;
        text-align: left!important;
    }

    #addPaper >>> .el-dialog{
        width: 550px;
        height: max-content;
        border-radius: 10px;
        padding: 20px 20px 10px  20px;
    }
    #addPaper >>>.el-dialog__title{
        font-size:24px;
        font-weight: 500;
        text-align: left!important;
    }
    #addPaper >>> .el-radio-group{
        width: 100%;
    }
    #addPaper >>> .el-select{
        width:100%;
    }


</style>
