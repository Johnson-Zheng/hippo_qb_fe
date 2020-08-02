<template>
<div class="container">
    <navigation> </navigation>
    <div class="main-panel">
        <el-row class="center">
            <el-col style="margin-right:45px" :span="11" :lg="11" :xl="11" :md="24" :sm="24" :xs="24">
                <div class="panel shadow w4 panel-left">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="4">
                            <h2>统计信息</h2>
                        </el-col>
                    </el-row>
                    <el-row class="mt-1875">
                        <el-col :span="9">
                            <div class="panel shadow sta-panel">
                                <el-row type="flex" :gutter="60">
                                    <el-col :span="5">
                                        <img class="sta-icon" src="../../assets/icon/考试@2x.png" alt="题目"/>
                                    </el-col>
                                    <el-col :span="5">
                                        <div class="sta-data">
                                            <p class="data">{{examNum}}</p>
                                            <p class="title">参加考试</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="5">
                                        <div class="sta-data">
                                            <p class="data">{{paperNum}}</p>
                                            <p class="title">最低分</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="5">
                                        <div class="sta-data">
                                            <p class="data">{{examOff}}</p>
                                            <p class="title">最高分</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="5">
                                        <div class="sta-data">
                                            <p class="data">{{examOther}}</p>
                                            <p class="title">平均分</p>
                                        </div>
                                    </el-col>
                                </el-row>

                            </div>

                        </el-col>
                    </el-row>
                </div>
                <div class="panel shadow w4 panel-left">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="4">
                            <h2>近期考试</h2>
                        </el-col>
                        <el-col :span="8">
                            <p class="tips-text dec-text">最近的三场考试安排</p>
                        </el-col>
                        <el-col :span="3" :offset=8>
                            <el-button type="text" class="tips-text info-button" @click="goto('/stu_exam')">查看详情></el-button>
                        </el-col>
                    </el-row>
                    <el-table class="mt-1875" :data="examForm" ref="examForm"
                              v-loading="loading"
                              :default-sort = "{prop: 'createTime', order: 'descending'}"
                              style="width: 100%"
                              :header-cell-style="{background:'#F5F7FA',fontWeight:'400'}"
                              show-overflow-tooltip="true"
                              size="small"
                              fit
                    >
                        <el-table-column
                                align="center"
                                prop="kid"
                                label="考试编号"

                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="考试标题"
                                :show-tooltip-when-overflow="true">
                        </el-table-column>
                        <el-table-column
                                prop="starttime"
                                label="开始时间"
                                :formatter="startDateFormatter"
                                width="140">
                        </el-table-column>
                        <el-table-column
                                prop="time"
                                align="center"
                                label="考试时长"
                        >
                        </el-table-column>
                        <el-table-column
                                :formatter="examStatusFormatter"
                                align="center"
                                width="80"
                                label="考试状态">
                            <template slot-scope="status">
                                <el-tag v-if="examStatusFormatter(status.row)==='已结束'" type="danger">{{examStatusFormatter(status.row)}}</el-tag>
                                <el-tag v-if="examStatusFormatter(status.row)==='进行中'" type="success">{{examStatusFormatter(status.row)}}</el-tag>
                                <el-tag v-if="examStatusFormatter(status.row)==='未开始'" type="info">{{examStatusFormatter(status.row)}}</el-tag>
                            </template>
                        </el-table-column>

                    </el-table>
                </div>
                <div class="panel shadow w4 panel-left no-mt">
                    <el-row>
                        <el-col :span="4">
                            <h2>考试统计</h2>
                        </el-col>
                        <el-col :span="8">
                            <p class="tips-text dec-text">您最近参加考试场数</p>
                        </el-col>
                    </el-row>
                    <div id="exam-chart" :style="{width: '570px', height: '300px'}"></div>
                </div>
            </el-col>
            <el-col class="mt-30-m" :span="11" :lg="11" :xl="11" :md="24" :sm="24" :xs="24">
                <div class="panel shadow w4 panel-left">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="4">
                            <h2>通知公告</h2>
                        </el-col>
                    </el-row>
                    <el-carousel class="anno-panel mt-1875" height="150px">
                        <el-carousel-item class="anno">
                            <img class="anno-item" src="../../assets/images/anno1.png" alt="公告1">
                        </el-carousel-item>
                        <el-carousel-item class="anno">
                            <img class="anno-item" src="../../assets/images/anno1.png" alt="公告2">
                        </el-carousel-item>
                        <el-carousel-item class="anno">
                            <img class="anno-item" src="../../assets/images/anno1.png" alt="公告3">
                        </el-carousel-item>
                    </el-carousel>
                    <template v-for="i in annoList">
                        <el-row class="mt-1875">
                            <el-col :span="4">
                                <div class="anno-type">
                                    <p>{{i.type}}</p>
                                </div>
                            </el-col>
                            <el-col :span="20">
                                <div class="anno-title">
                                    <p>{{i.title}}</p>
                                </div>
                            </el-col>
                        </el-row>
                    </template>
                </div>
                <div class="panel shadow w4 panel-left">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="4">
                            <h2>推荐题目</h2>
                        </el-col>

                    </el-row>
                    <template v-for="(i,index) in questionList" v-if="i.questionName!==null">
                        <el-row class="mt-1875" v-if="index===0">
                            <el-col :span="4">
                                <div class="anno-type">
                                    <p>{{questionType(i)}}</p>
                                </div>
                            </el-col>
                            <el-col :span="20">
                                <div class="anno-title">
                                    <p>{{i.questionName}}</p>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row class="mt-1875" v-if="index===1">
                            <el-col :span="4">
                                <div class="anno-type" style="background:rgba(75,163,214,1);">
                                    <p>{{questionType(i)}}</p>
                                </div>
                            </el-col>
                            <el-col :span="20">
                                <div class="anno-title">
                                    <p>{{i.questionName}}</p>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row class="mt-1875" v-if="index===2">
                            <el-col :span="4">
                                <div class="anno-type" style="background:rgba(112,174,211,1);">
                                    <p>{{questionType(i)}}</p>
                                </div>
                            </el-col>
                            <el-col :span="20">
                                <div class="anno-title">
                                    <p>{{i.questionName}}</p>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row class="mt-1875" v-if="index>2">
                            <el-col :span="4">
                                <div class="anno-type" style="background:rgba(160,197,219,1)">
                                    <p>{{questionType(i)}}</p>
                                </div>
                            </el-col>
                            <el-col :span="20">
                                <div class="anno-title">
                                    <p>{{i.questionName}}</p>
                                </div>
                            </el-col>
                        </el-row>
                    </template>
                </div>
            </el-col>
        </el-row>


    </div>
    <copyright> </copyright>
</div>
</template>

<script>
    import navigation from "@/component/header/navigation";
    import Copyright from "@/component/footer/copyright";
    import {getWeekArray} from '@/utils/functions'
    import {startDateFormatter,examStatusFormatter,questionType} from '@/utils/validate'
    export default {
        name: "stu_index",
        components:{
            Copyright,
            navigation,
        },
        data() {
            return{
                startDateFormatter,
                examStatusFormatter,
                questionType,
                loading:true,
                username:'sys',
                paperNum:'-',
                examNum:'-',
                examOff:'-',
                examOther:'-',


                examForm:null,
                weekExamData:[],
                annoList:[],
                questionList:null,
            }
        },
        mounted(){
            this.getStatistic()
            this.getExamForm()
            this.getExamChart()
            this.getAnnoList()
            this.getQuestionList()
        },
        methods: {
            getStatistic(){
                this.$axios.get('datavisualization/Sdashboard').then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        let data = res.data.data
                        this.paperNum = data['最低分']
                        this.examNum = data['参加考试']
                        this.examOff = data['最高分']
                        this.examOther = data['平均分']

                    }
                }).catch(error => {
                    let message = error.message
                    this.$message.error(message)

                });
            },
            getExamForm(){
                this.$axios.get('exroom/Slast3exam').then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.examForm = res.data.data
                        this.loading = false
                    }
                }).catch(error => {
                    let message = error.message
                    this.$message.error(message)

                });
            },
            getExamChart(){
                let obj = require('../../assets/chart-theme')
                this.$echarts.registerTheme('theme', obj)
                let examchart = this.$echarts.init(document.getElementById('exam-chart'),'theme')
                examchart.showLoading()
                this.$axios.get('datavisualization/stuExamLast7D')
                    .then(res=> {
                        if (res && res.data.rspCode === '200'){
                            this.weekExamData = res.data.data
                            examchart.setOption({
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'line',
                                        label: {
                                            backgroundColor: '#6a7985'
                                        }
                                    }
                                },
                                xAxis: {
                                    data: getWeekArray()
                                },
                                yAxis: {
                                },
                                legend: {
                                    data: ['参与场数'],
                                    selected: {'参与场数': true},
                                    icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
                                    left: 25,
                                    bottom: 0
                                },
                                series: [{
                                    name: '参与场数',
                                    smooth:true,  //这个是把线变成曲线
                                    type: 'line',
                                    areaStyle: {},
                                    data: this.weekExamData,
                                    markPoint: {
                                        data: [{
                                            name: '最大值',
                                            type: 'max'
                                        }]
                                    },

                                }]
                            });
                            examchart.hideLoading()
                        }else {
                            this.$message.error("获取失败")
                        }
                    }).catch(error => {
                        let message = error.message
                        this.$message.error(message)
                    })
            },
            getAnnoList(){
                this.$axios.get('announcement/alist').then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        let length = res.data.data.length
                        for(let i=(length-1); i>(length-4); i--){
                            this.annoList.push(res.data.data[i])
                        }

                    }
                }).catch(error => {
                    let message = error.message
                    this.$message.error(message)
                });
            },
            getQuestionList(){
                this.$axios.get('question/questionsRec').then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.questionList = res.data.data
                    }
                }).catch(error => {
                    let message = error.message
                    this.$message.error(message)
                });
            },
            goto(path){
                this.$router.push(path)
            }
    }
}
</script>

<style scoped>
    .main-panel{
        position:relative;
        width:90%;
        height: max-content;
        margin:30px auto;
    }
    .panel{
        position:relative;
        background: #fff;
        border-radius: 8px;
        padding: 20px 30px;
        width: max-content;
    }
    .w4{
        width: 40%;
    }
    .sta-panel{
        padding: 15px 20px!important;
    }
    .panel h2{
        font-size:18px;
        margin: 0;
        line-height: 27px;
        width: 78px;

    }
    .panel >>> .el-input__inner{
        border-radius: 20px;
        padding: 0 0 0 22.5%;
        width:70px;
    }
    .panel >> .el-button{
        padding: 0!important;
    }
    .sta-icon{
        height: 40px;
        display:block

    }
    .sta-data{
        width: 40px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
    }
    .sta-data .data{
        text-align: center;
        font-size:23px;
        font-weight:bold;
        line-height:25px;
        color:rgba(28,148,219,1);
        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
    }
    .sta-data .title{
        text-align: center;
        font-size:9px;
        font-weight:400;
        line-height:15px;
        color:rgba(136,136,136,1);
        white-space: nowrap;
        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
    }
    .el-button{
        padding: 0!important;
    }
    .panel-left{
        width:490px!important;
        height: max-content;
        margin-bottom: 20px;
    }
    .info-button{
        text-align: right;
    }
    .dec-text{
        line-height: 27px;
    }
    #exam-chart{
        left: -30px;
    }
    .no-mt{
        margin-bottom: 0!important;
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
    .anno{
         width: 100%;
         height:150px;
         background:rgba(239,249,253,1);

     }
    .anno-panel{
        border-radius: 5px;
    }
    .anno-item{
        position: relative;
        left:50%;
        top:50%;
        height: 67px;
        transform: translate(-50%,-50%);
    }
    .anno-panel >>> .el-carousel__button{
        background: #1C94DB;
        width: 20px;
        height: 4px;
        border-radius: 2px;
        margin-right: 3px;
        opacity: 0.2;
    }
    .anno-panel >>> .el-carousel__indicator--horizontal{
        padding: 3px 0;
    }
    .anno-panel >>> .el-carousel__indicator.is-active button{
        opacity: 0.8;
    }
    .anno-type{
        border-radius: 10px;
        width: 64px;
        height: 20px;
        align-content: center;
        background:#1C94DB;

    }
    .anno-type p{
        position: relative;
        left:50%;
        transform:translate(-50%);
        width: max-content;
        color:white;
        font-size:7px;
        font-weight:500;
        line-height:20px;
        user-select: none;
    }
    .anno-title{
        font-size:10px;
        font-weight:400;
        line-height:20px;
        color:rgba(96,98,102,1);
    }
    .anno-title p{
        white-space: nowrap; /* 因为设置了block，所以需要设置nowrap来确保不换行 */
        overflow: hidden; /* 超出隐藏结合width使用截取采用效果*/
        text-overflow: ellipsis; /* 本功能的主要功臣，超出部分的剪裁方式 */
    }
    .center{
        width: max-content;
        position: relative;
        left:50%;
        transform: translateX(-50%);
    }
    @media screen and (max-width:1199px)  {
        .center{
            width: 50%;
            position: relative;
            left:50%;
            transform: translateX(-50%);
        }
        .mt-30-m{
            margin-top: 20px;
        }
    }
</style>
