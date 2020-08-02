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
                    width="170"
                    sortable
                    :show-tooltip-when-overflow="true">
            </el-table-column>
            <el-table-column
                    prop="starttime"
                    sortable
                    label="开始时间"
                    :formatter="startDateFormatter"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    prop="time"
                    align="center"
                    label="考试时长/分钟"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="grouptype"
                    :formatter="groupTypeFormatter"
                    label="可参加人员"
                    width="100"
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
                    prop="deadline"
                    sortable
                    :formatter="deadlineDateFormatter"
                    label="截止入场"

                    min-width="150">
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
                    fixed="right"
                    align="center"
                    label="操作"
                    width="160">
            <template slot-scope="scope">
                <el-row >
                    <el-col :span="24" align="center">
                        <el-button v-if="examStatusFormatter(scope.row)==='截止入场'" @click="checkInfo(scope.row)" type="text" size="small">考试详情></el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button v-if="examStatusFormatter(scope.row)==='已结束'" @click="checkInfo(scope.row)" type="text" size="small">考试详情></el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button v-if="examStatusFormatter(scope.row)==='已结束'" type="text" size="small" @click="checkScore(scope.row)">查看成绩></el-button>
                    </el-col>
                    <el-col :span="24">
                        <el-button  v-if="examStatusFormatter(scope.row)==='进行中'"  @click="joinExamInfo(scope.row)" type="success" size="mini" round plain>参加考试</el-button>
                    </el-col>
                    <el-col :span="24">
                        <el-button  v-if="examStatusFormatter(scope.row)==='未开始'"  @click="checkInfo(scope.row)" type="info" size="mini" round plain disabled>参加考试</el-button>
                    </el-col>

                </el-row>

            </template>
            </el-table-column>
        </el-table>
        <div class="operate-panel" >
            <el-row type="flex">
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
            </el-row>

        </div>
    </div>
    <copyright></copyright>
    <exam-info id="examInfo" :dialogVisible="dialogVisible" :dialogInfo="dialogInfo" @update:dialogVisible="dialogVisibles "> </exam-info>
    <join-exam-info id="joinExamInfo" :dialogVisible="joinExamVisible" :dialogInfo="joinExamData" @update:dialogVisible="joinExamVisibles"> </join-exam-info>
</div>
</template>

<script>
    import navigation from "@/component/header/navigation";
    import Copyright from "@/component/footer/copyright";
    import examInfo from "@/component/exam/examInfo";
    import joinExamInfo from "@/component/exam/joinExamInfo";
    import {dateFormatter,startDateFormatter,deadlineDateFormatter,groupTypeFormatter,securityFormatter,examStatusFormatter} from "@/utils/validate"
    export default {
        name: "stu_exam",
        components:{
            examInfo,
            Copyright,
            navigation,
            joinExamInfo
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
                joinExamVisible:false,
                //点击查看按钮  这条数据详细信息
                dialogInfo: {},
                joinExamData:{},
                stuList:[],
                loading: false,
                examTable: null,
            }
        },
        created(){
            this.loading = true
            this.getExamTable(this.dataPerPage,this.currentPage)
        },
        methods:{
            getExamTable(dataPerpage, currentPage){
                this.$axios.get('exroom/list?num='+dataPerpage+'&start='+currentPage).then(res=>{
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
            joinExamInfo(row){
                this.joinExamVisible = true
                this.joinExamData = row
            },
            dialogVisibles(v){
                this.dialogVisible = v
            },
            joinExamVisibles(v){
                this.joinExamVisible  = v
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
            checkScore(row){
                this.$router.push({
                    path:'/stu_exam_paper_score',
                    name:'stu_exam_paper_score',
                    params:{
                        examData: row
                    }
                })
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
    #joinExamInfo >>> .el-dialog{
        width: 700px;
        height: max-content;
        border-radius: 10px;
        padding: 20px;
    }
    #joinExamInfo >>> .el-dialog__body{
        padding:0;
    }
    #joinExamInfo >>> h3{
        margin: 0 0 10px 0;
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
