<template>
<div class="container">
    <navigation> </navigation>
        <el-row class="main-panel" :gutter="80">
            <el-col :span="7">
                <div class="shadow panel">
                    <el-page-header @back="goBack"> </el-page-header>
                    <h2>考生列表</h2>
                    <el-table class="mt-1875" :data="stuTable" ref="stuTable"
                              :default-sort = "{prop: 'score', order: 'descending'}"
                              :header-cell-style="{background:'#F5F7FA',fontWeight:'400'}"
                              show-overflow-tooltip="true"
                              size="small"
                              fit
                              max-height="500"
                    >
                        <el-table-column
                                align="center"
                                prop="uno"
                                label="学号"
                                width="80"
                                show-overflow-tooltip
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="name"
                                label="姓名"
                                width="60"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="totalscore"
                                label="分数"
                                width="55"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="操作"
                                fixed="right"
                                width="60"
                        >
                            <template scope="scope">
                                <el-button size="small" type="text" @click="checkExamInfo(scope.row)">详情></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col :span="17" >
                <div class="shadow panel">
                    <h2>{{examName}}</h2>
                    <h4 class="mt-1875">数据概况</h4>
                    <el-row class="mt-1875">
                        <el-col :span="24">
                            <div class="shadow sta-panel">
                                <el-row type="flex" justify="space-around">
                                    <el-col :span="3">
                                        <img class="sta-icon" src="../../assets/icon/题目@2x.png" alt="题目"/>
                                    </el-col>
                                    <el-col :span="3">
                                        <div class="sta-data">
                                            <p class="data">{{dataList[0]}}</p>
                                            <p class="title">考生总数</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="3">
                                        <div class="sta-data">
                                            <p class="data">{{dataList[1]}}</p>
                                            <p class="title">及格人数</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="3">
                                        <div class="sta-data">
                                            <p class="data">{{dataList[2]}}</p>
                                            <p class="title">不及格人数</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="3">
                                        <div class="sta-data">
                                            <p class="data">{{dataList[3]}}</p>
                                            <p class="title">优秀人数</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="3">
                                        <div class="sta-data">
                                            <p class="data">{{dataList[4]}}</p>
                                            <p class="title">平均分</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="3">
                                        <div class="sta-data">
                                            <p class="data">{{dataList[5]}}</p>
                                            <p class="title">最高分</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="3">
                                        <div class="sta-data">
                                            <p class="data">{{dataList[6]}}</p>
                                            <p class="title">最低分</p>
                                        </div>
                                    </el-col>
                                </el-row>

                            </div>
                        </el-col>
                    </el-row>
                    <h4 class="mt-1875">数据分析</h4>
                    <el-row class="mt-1875" :gutter="30">
                        <el-col :span="12">
                            <div class='panel shadow' style="padding:20px 0 20px 0;">
                                <div id="score_chart" :style="{width: '360px', height: '200px'}"></div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class='panel shadow' style="padding:20px 0 20px 0;">
                                <div id="question_chart" :style="{width: '360px', height: '200px'}"></div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="mt-1875" >
                        <el-col :span="24">
                            <div class='panel shadow' style="padding:20px 0 20px 0;">
                                <div id="fault_chart" :style="{width: '800px', height: '300px'}"></div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    <copyright> </copyright>
</div>
</template>

<script>
    import navigation from "@/component/header/navigation";
    import Copyright from "@/component/footer/copyright";
    import {getWeekArray} from "@/utils/functions";
    export default {
        name: "stu_exam_score",
        components:{
            Copyright,
            navigation,
        },
        data() {
            return{
                stuTable:[],
                scoreTable:[],
                wrongTable:[],
                faultTable:[],
                dataList:['-','-','-','-','-','-'],
                examName:'考试标题',
                kid:''
            }
        },
        created(){
            this.kid = this.$route.params.kid
            this.examName = this.$route.params.name
        },
        mounted(){
            this.checkKid()
        },
        methods: {
            goBack(){
                this.$router.push('/tea_exam')
            },
            checkKid(){
                if( this.kid==='' || this.kid===undefined){
                    this.$alert("错误：考试数据不能为空", '页面错误', {
                        confirmButtonText: '返回',
                        callback: action => {
                            this.goBack()
                        }
                    })
                }else{
                    this.getStuList()
                    this.getGeneralData()
                    this.getScoreChart()
                    this.getQuestionChart()
                    this.getFaultChart()
                }
            },
            getStuList(){
                this.$axios.get('datavisualization/studentsList?kid='+this.kid).then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.stuTable = res.data.data
                    }else{
                        let message = error.message
                        this.$message.error(message)
                    }
                }).catch(error => {
                    let message = error.message
                    this.$message.error(message)
                });
            },
            getGeneralData(){
                this.$axios.get('datavisualization/generalDataOfTeacher?kid='+this.kid).then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.dataList = res.data.data
                    }else if(res && res.data.rspCode ===500){
                        this.dataList = [0,0,0,0,0,0,0]
                    }
                    else{
                        let message = "ERROR"+res.data.rspCode+' '+res.data.rspMsg
                        this.$message.error(message)
                    }
                }).catch(error => {
                    let message = error.message
                    this.$message.error(message)
                });
            },

            getScoreChart(){
                let obj = require('../../assets/chart-theme')
                this.$echarts.registerTheme('theme', obj)
                let scoreChart = this.$echarts.init(document.getElementById('score_chart'),'theme')
                this.$axios.get('datavisualization/disOfScore?kid='+this.kid).then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.scoreTable = res.data.data
                        scoreChart.showLoading()
                        scoreChart.setOption({
                            title : {
                                text: '分数层次分布',
                                textStyle: {
                                    fontSize:14,
                                    fontWeight:400,
                                },
                                x: '20',
                                y: 'top',
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: " {b}:{d}% "
                            },
                            color:['#79d5fa', '#a3a1f4', '#fad98e', '#f08a79'],
                            legend: {
                                data: ['优秀','良好','差','极差'],
                                icon: "circle",
                                right: 40,
                                top: 75,
                                type: 'scroll',
                                orient: 'vertical',
                            },
                            series: [
                                {
                                    labelLine: {
                                        show: false
                                    },
                                    emphasis: {
                                        label: {
                                            show: true,
                                            fontSize: '16',
                                            fontWeight: 'bold',

                                        }
                                    },
                                    label:{            //饼图图形上的文本标签
                                        normal:{
                                            show:true,
                                            position:'inner', //标签的位置
                                            textStyle : {
                                                fontSize : 14    //文字的字体大小
                                            },
                                            formatter:'{c}人'
                                        }
                                    },
                                    avoidLabelOverlap: false,
                                    name: '',
                                    type: 'pie',
                                    radius: ['30%','70%'],       //饼图大小
                                    center: ['35%','60%'],
                                    data: [
                                        {value: this.scoreTable[0], name: '优秀'},
                                        {value: this.scoreTable[1], name: '良好'},
                                        {value: this.scoreTable[2], name: '差'},
                                        {value: this.scoreTable[3], name: '极差'},
                                    ]
                                }
                            ],
                        })
                        scoreChart.hideLoading()
                    }else if(res && res.data.rspCode ===500){
                        this.scoreTable = [0,0,0,0]
                    }
                    else{
                        let message = "ERROR"+res.data.rspCode+' '+res.data.rspMsg
                        this.$message.error(message)
                    }
                }).catch(error => {
                    let message = error.message
                    this.$message.error(message)
                });

            },
            questionData(questionTable){
                let table = {
                    legend:[],
                    data:[],
                }
                let temp = { value:0, name:'' }
                let qidlist = questionTable.wrongqidList
                let numList = questionTable.numList
                if(qidlist.length!==0){
                    for(let i=0;i<4;i++){
                        if(numList[i]!==-1){
                            table.legend.push(qidlist[i])
                            temp = { value:numList[i], name:qidlist[i]}
                            table.data.push(temp)
                        }
                    }
                }else{
                    table={
                        legend: ['无数据1','无数据2','无数据3','无数据4'],
                        data: [
                            {value:'0',name:'无数据1'},
                            {value:'0',name:'无数据2'},
                            {value:'0',name:'无数据3'},
                            {value:'0',name:'无数据4'},
                        ],
                    }
                }
                return table
            },
            getQuestionChart(){
                let obj = require('../../assets/chart-theme')
                this.$echarts.registerTheme('theme', obj)
                let questionChart = this.$echarts.init(document.getElementById('question_chart'),'theme')
                this.$axios.get('datavisualization/wrongSituation?kid='+this.kid).then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.wrongTable = res.data.data
                        let chartData = this.questionData(this.wrongTable)
                        questionChart.showLoading()
                        questionChart.setOption({
                            title : {
                                text: '错题人数最多的4道题',
                                textStyle: {
                                    fontSize:14,
                                    fontWeight:400,
                                },
                                x:'20',
                                y: 'top',
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: " {b}:{d}% "
                            },
                            color:['#79d5fa', '#a3a1f4', '#fad98e', '#f08a79'],
                            legend: {
                                data: chartData.legend,
                                icon: "circle",
                                right: 40, // 4-75 3-85 2-95 1-105
                                top:75,
                                orient: 'vertical',
                                formatter: function (name) {
                                    return  '第'+name+'题';
                                }
                            },
                            series: [
                                {
                                    labelLine: {
                                        show: false
                                    },
                                    emphasis: {
                                        label: {
                                            show: true,
                                            fontSize: '16',
                                            fontWeight: 'bold',
                                        }
                                    },
                                    label:{            //饼图图形上的文本标签
                                        normal:{
                                            show:true,
                                            position:'inner', //标签的位置
                                            textStyle : {
                                                fontSize : 14    //文字的字体大小
                                            },
                                            formatter:'{c}人'
                                        }
                                    },
                                    avoidLabelOverlap: false,
                                    name: '',
                                    type: 'pie',
                                    radius: ['30%','70%'],       //饼图大小
                                    center: ['40%','60%'],
                                    data: chartData.data,
                                }
                            ],
                        })
                        questionChart.hideLoading()
            }else if(res && res.data.rspCode ===500){
                        questionChart.showLoading()
                        questionChart.setOption({
                            title : {
                                text: '错题人数最多的4道题',
                                textStyle: {
                                    fontSize:14,
                                    fontWeight:400,
                                },
                                x:'20',
                                y: 'top',
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: " {b}:{d}% "
                            },
                            color:['#79d5fa', '#a3a1f4', '#fad98e', '#f08a79'],
                            legend: {
                                data: ['无数据1','无数据2','无数据3','无数据4'],
                                icon: "circle",
                                right: 40,
                                top:75,
                                orient: 'vertical',
                            },
                            series: [
                                {
                                    labelLine: {
                                        show: false
                                    },
                                    emphasis: {
                                        label: {
                                            show: true,
                                            fontSize: '16',
                                            fontWeight: 'bold',
                                        }
                                    },
                                    label:{            //饼图图形上的文本标签
                                        normal:{
                                            show:true,
                                            position:'inner', //标签的位置
                                            textStyle : {
                                                fontSize : 14    //文字的字体大小
                                            },
                                            formatter:'{c}人'
                                        }
                                    },
                                    avoidLabelOverlap: false,
                                    name: '',
                                    type: 'pie',
                                    radius: ['30%','70%'],       //饼图大小
                                    center: ['40%','60%'],
                                    data: [
                                        {value:'0',name:'无数据1'},
                                        {value:'0',name:'无数据2'},
                                        {value:'0',name:'无数据3'},
                                        {value:'0',name:'无数据4'},
                                    ],
                                }
                            ],
                        })
                        questionChart.hideLoading()
                    }
                    else{
                        let message = "ERROR"+res.data.rspCode+' '+res.data.rspMsg
                        this.$message.error(message)
                    }
                }).catch(error => {
                    let message = error.message
                    this.$message.error(message)
                });

            },
            faultData(faultTable){
                let qidList = faultTable.qidList
                let data = faultTable.rightRateList
                let table = []
                let temp = {}
                if(qidList.length!==0){
                    for(let i=0;i<qidList.length;i++){
                        temp={value:(data[i]*100),name:qidList[i]}
                        table.push(temp)
                    }
                }

                return  table
            },
            getFaultChart(){
                let obj = require('../../assets/chart-theme')
                this.$echarts.registerTheme('theme', obj)
                let faultChart = this.$echarts.init(document.getElementById('fault_chart'),'theme')
                this.$axios.get('datavisualization/riaghtRate?kid='+this.kid).then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.faultTable = res.data.data
                        let table = this.faultData(this.faultTable)
                        let qidList = this.faultTable.qidList
                        let rightRateList = table
                        faultChart.showLoading()
                        faultChart.setOption({
                            title : {
                                text: '各试题正确率分布',
                                textStyle: {
                                    fontSize:14,
                                    fontWeight:400,
                                },
                                x:'20',
                                y:'top',
                            },
                            tooltip: {
                                trigger: 'axis',
                                formatter: " 第{b}题:{c}% ",
                                axisPointer: {
                                    type: 'line',

                                    label: {
                                        backgroundColor: '#6a7985',
                                    },

                                }
                            },
                            xAxis: {
                                data: qidList,
                            },
                            yAxis: {
                                max : 100,
                                min : 0,
                                splitNumber : 5,
                                axisLabel: {
                                    show: true,
                                    interval: 'auto',
                                    formatter: '{value} %',
                                },
                            },
                            legend: {
                                data: ['试题正确率'],
                                icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
                                x:'center',
                                y:'bottom'
                            },
                            series: [{
                                name: '试题正确率',
                                type: 'bar',
                                smooth:true,  //这个是把线变成曲线
                                areaStyle: {},
                                data: rightRateList,
                                markPoint: {
                                    data: [{
                                        name: '最大值',
                                        type: 'max'
                                    },
                                    {
                                        name: '最小值',
                                        type: 'min'
                                    },
                                    ]
                                },

                            }]
                        });
                        faultChart.hideLoading()
                    }else if(res && res.data.rspCode ===500){
                        faultChart.showLoading()
                        faultChart.setOption({
                            title : {
                                text: '各试题正确率分布',
                                textStyle: {
                                    fontSize:14,
                                    fontWeight:400,
                                },
                                x:'20',
                                y: 'top',
                            },
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
                                data: [0],
                                boundaryGap: false,
                            },
                            yAxis: {
                                max : 100,
                                min : 0,
                                splitNumber : 5,
                                axisLabel: {
                                    show: true,
                                    interval: 'auto',
                                    formatter: '{value} %',
                                },
                            },
                            legend: {
                                data: ['无数据'],
                                icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
                                x:'center',
                                y:'bottom'
                            },
                            series: [{
                                name: '无数据',
                                type: 'line',
                                smooth:true,  //这个是把线变成曲线
                                areaStyle: {},
                                data: [{value:0,name:0}],
                                markPoint: {
                                    data: [{
                                        name: '最大值',
                                        type: 'max'
                                    },
                                        {
                                            name: '最小值',
                                            type: 'min'
                                        },
                                    ]
                                },

                            }]
                        });
                        faultChart.hideLoading()
                    }
                    else{
                        let message = "ERROR"+res.data.rspCode+' '+res.data.rspMsg
                        this.$message.error(message)
                    }
                }).catch(error => {
                    let message = error.message
                    this.$message.error(message)
                });

            },
            checkExamInfo(row){
                this.$router.push({
                    path:'/stu_exam_paper_score',
                    name:'stu_exam_paper_score',
                    params:{
                        examData: row,
                        examName: this.examName,
                        fromTeacher:true,
                        kid:this.kid,
                    }
                })
            }
    }
}
</script>

<style scoped>
    .main-panel{
        position:relative;
        width:80%;
        margin:30px auto !important;
    }
    .panel{
        position:relative;
        background: #fff;
        border-radius: 8px;
        padding: 20px 30px;
        width: 100%;
    }
    .sta-panel{
        padding: 15px 20px!important;
        border-radius: 8px;
    }
    .panel h2{
        font-size:18px;
        margin: 18px 0 0  0;
        line-height: 27px;

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
    .main-panel >>> .el-page-header__title{
        line-height: 18px;
        font-size: 15px;
        color: #cccccc;
        transition: all ease 0.2s;
    }
    .main-panel >>> .el-icon-back{
        color: #cccccc;
        transition: all ease 0.2s;
        font-size: 14px;
    }
    .main-panel >>> .el-page-header :hover .el-page-header__title{
        color: #555555;
    }
    .main-panel >>> .el-page-header :hover .el-icon-back{
        color: #555555;
    }
    .el-row{
        margin-left: 0;
        margin-right: 0;
    }
    .el-col-8{
        padding-left: 0!important;
    }
    .w100{
        width: 100% !important;
    }
</style>
