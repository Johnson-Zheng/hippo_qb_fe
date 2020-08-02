<template>
<div class="container">
    <navigation></navigation>
    <div class="table-panel panel_shadow">
        <h2>试卷列表</h2>
        <el-table
                :data="paperTable"
                ref="paperTable"
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
                    prop="pid"
                    label="编号"
                    sortable
                    width="80"
                    >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="试卷标题"
                    min-width="120"
                    sortable
                    :show-tooltip-when-overflow="true"
                    >
            </el-table-column>
            <el-table-column
                    prop="sinscore"
                    sortable
                    align="center"
                    label="单选分数"
                    width="100"
                    >
            </el-table-column>
            <el-table-column
                    prop="mulscore"
                    align="center"
                    sortable
                    label="多选分数"
                    width="100"
                    >
            </el-table-column>
            <el-table-column
                    prop="subscore"
                    align="center"
                    label="主观分数"
                    width="100"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    sortable
                    :formatter="dateFormatter"
                    label="添加时间"
                    width="140"
                    >
            </el-table-column>
            <el-table-column
                    prop="createBy"
                    min-width="100"
                    sortable
                    label="创建者"
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

        <div class="operate-panel" >
<!--            <el-button class="operate-button" type="danger" @click="showDeleteDialog">删除所选</el-button>-->
            <el-row type="flex" justify="end">
                <el-col :span="20">
                    <el-pagination
                            @size-change="handleSizeChange"
                            :page-sizes="[5,10,15,20,25,50]"
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
    <paper-info id="paperInfo" :dialogVisible="dialogVisible" :dialogInfo="dialogInfo" @update:dialogVisible="dialogVisibles "></paper-info>
</div>
</template>

<script>
    import navigation from "@/component/header/navigation";
    import Copyright from "@/component/footer/copyright";
    import dayjs from 'dayjs'
    import PaperInfo from "@/component/paper/paperInfo";
    import {questionType,dateFormatter} from "@/utils/validate"
    import addPaper from "@/component/paper/addPaper";
    import addQuestion from "@/component/question/addQuestion";
    export default {
        name: "tea_paper",
        components:{
            PaperInfo,
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
                //控制弹窗 显示
                dialogVisible: false,
                //点击查看按钮  这条数据详细信息
                dialogInfo: {},
                addDialogVisible: false,
                loading: false,
                paperTable: [],
            }
        },
        mounted(){
            this.loading = true
            this.getPaperTable(this.dataPerPage,this.currentPage)
        },
        methods:{
            getPaperTable(dataPerpage, currentPage){
                this.$axios.get('paper/list?num='+dataPerpage+'&start='+currentPage).then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.paperTable = res.data.data["content"]
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

    #paperInfo >>> .el-dialog{
        width: 700px;
        height: max-content;
        border-radius: 10px;
        padding: 20px;
    }
    #paperInfo >>> .el-dialog__title{
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
