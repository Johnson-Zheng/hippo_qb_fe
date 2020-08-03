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
                    label="考试ID"
                    width="70">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="pid"
                    label="试卷ID"
                    width="70">
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
                    label="考试开始时间"
                    :formatter="startDateFormatter"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="deadline"
                    sortable
                    label="截止入场时间"
                    :formatter="deadlineDateFormatter"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="time"
                    align="center"
                    label="时长/分钟"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="grouptype"
                    :formatter="groupTypeFormatter"
                    label="考试名单"
                    width="90"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="security"
                    align="center"
                    :formatter="securityFormatter"
                    label="防作弊"
                    width="80">
            </el-table-column>
            <el-table-column
                    :formatter="examStatusFormatter"
                    width="100"
                    align="center"
                    label="考试状态">
                <template slot-scope="status">
                    <el-tag v-if="examStatusFormatter(status.row)==='已结束'" type="danger">{{examStatusFormatter(status.row)}}</el-tag>
                    <el-tag v-if="examStatusFormatter(status.row)==='进行中'" type="success">{{examStatusFormatter(status.row)}}</el-tag>
                    <el-tag v-if="examStatusFormatter(status.row)==='未开始'" type="info">{{examStatusFormatter(status.row)}}</el-tag>
                    <el-tag v-if="examStatusFormatter(status.row)==='截止入场'" type="info">{{examStatusFormatter(status.row)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    sortable
                    :formatter="dateFormatter"
                    label="添加时间"
                    min-width="140">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"

                    width="200">
            <template slot-scope="scope">
                <el-row>
                    <el-col :span='8'>
                        <el-button @click="checkInfo(scope.row)" type="text" size="mini">查看详情</el-button>
                    </el-col>
                    <el-col :span="8" v-if="scope.row.grouptype===1">
                        <el-button @click="checkStuList(scope.row)" type="text" size="mini">考生列表</el-button>
                    </el-col>
                    <el-col :span="8" v-if="examStatusFormatter(scope.row)==='进行中' || examStatusFormatter(scope.row)==='已结束' || examStatusFormatter(scope.row)==='截止入场'" >
                        <el-button @click="checkScore(scope.row)" type="text" size="mini">成绩统计</el-button>
                    </el-col>
                </el-row>
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
                    <el-button class="operate-button" type="primary " @click="addExam">添加考试</el-button>

                </el-col>
            </el-row>

        </div>

    </div>
    <copyright></copyright>
    <exam-info id="examInfo" :dialogVisible="dialogVisible" :dialogInfo="dialogInfo" @update:dialogVisible="dialogVisibles "> </exam-info>
    <add-exam id="addExam" :addDialogVisible="addDialogVisible" @update:addDialogVisible="addDialogVisibles"> </add-exam>
    <exam-stu-list id="examStuList" :stuListVisible="stuListVisible" :stuList="stuList" :kid="selectKid" @update:stuListVisible="stuListVisibles"> </exam-stu-list>
</div>
</template>

<script>
    import navigation from "@/component/header/navigation";
    import Copyright from "@/component/footer/copyright";
    import examInfo from "@/component/exam/examInfo";
    import addExam from "@/component/exam/addExam";
    import examStuList from "@/component/exam/examStuList";
    import {dateFormatter,startDateFormatter,deadlineDateFormatter,groupTypeFormatter,securityFormatter,examStatusFormatter} from "@/utils/validate"
    export default {
        name: "tea_paper",
        components:{
            examStuList,
            examInfo,
            addExam,
            Copyright,
            navigation,
        },
        data() {
            return {
                //当前页码
                currentPage:0,
                //每页数据数量
                selectKid:0,
                dataPerPage:10,
                //总元素数
                totalElements: 0,
                dateFormatter,
                startDateFormatter,
                deadlineDateFormatter,
                groupTypeFormatter,
                securityFormatter,
                examStatusFormatter,
                //控制弹窗 显示
                dialogVisible: false,
                stuListVisible:false,
                //点击查看按钮  这条数据详细信息
                dialogInfo: {},
                stuList:[],
                addDialogVisible: false,
                loading: false,
                examTable: null,
            }
        },
        mounted(){
            this.loading = true
            this.getExamTable(this.dataPerPage,this.currentPage)
        },
        methods:{
            getExamTable(dataPerpage, currentPage){
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
            //考生列表请求
            checkStuList(row){
                this.stuListVisible = true;
                this.selectKid = row.kid

                this.$axios.get('exroom/getpeset?exid='+this.selectKid).then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.stuList = res.data.data
                    }
                }).catch(error => {
                    let message = error.message
                    this.$message.error(message)

                });

            },
            stuListVisibles(v){
                this.stuListVisible = v
            },
            dialogVisibles(v){
                this.dialogVisible = v
            },
            handleSizeChange(val){
                this.dataPerPage = val
                this.loading = true
                this.getExamTable(this.dataPerPage,this.currentPage-1)
            },
            handleCurrentChange(val){
                this.currentPage = val
                this.loading = true
                this.getExamTable(this.dataPerPage,this.currentPage-1)
            },
            addDialogVisibles(v){
                this.addDialogVisible = v
            },
            addExam(){
                this.addDialogVisible = true;
            },
            checkScore(row){
                this.$router.push({
                    name: 'stu_exam_score',
                    path:'/stu_exam_score',
                    params: {
                        kid: row.kid,
                        name:row.name,
                    }
                });
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

    #addExam >>> .el-dialog{
        width: 550px;
        height: max-content;
        border-radius: 10px;
        padding: 20px 20px 10px  20px;
    }
    #addExam >>>.el-dialog__title{
        font-size:24px;
        font-weight: 500;
        text-align: left!important;
    }
    #addExam >>> .el-radio-group{
        width: 100%;
    }
    #addExam >>> .el-select{
        width:100%;
    }

    #addExam >>> .el-date-editor.el-input{
        width: 100% !important;
    }
    #examStuList >>>.el-dialog{
        width: 550px;
        height: max-content;
        border-radius: 10px;
        padding: 20px 20px 10px  20px;
    }
    #examStuList >>>.el-dialog__title{
        font-size:24px;
        font-weight: 500;
        text-align: left!important;
    }
    .el-tag{
        user-select: none;
        -webkit-user-drag: none;
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select:none;
        -khtml-user-select:none;
        -webkit-user-select:none;
        -ms-user-select:none;
    }
</style>
