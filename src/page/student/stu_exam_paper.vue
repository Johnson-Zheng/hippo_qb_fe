<template>
<div class="container">
    <navigation> </navigation>
        <el-row class="main-panel" :gutter="80">
            <el-col :span="14" align="center">
                <div class="panel shadow">
                    <!--返回页头-->
                    <el-page-header @back="goBack"> </el-page-header>
                    <!--标题和倒计时-->
                    <el-row class="mt-1875" type="flex" justify="space-between">
                        <el-col :span="14" align="left">
                            <h2>{{examTitle}}</h2>
                        </el-col>
                        <el-col :span="10" align="right">
                            <div class="count-down no-select">
                                倒计时 {{countTime}}
                            </div>
                        </el-col>
                    </el-row>
                    <!--题目列表-->
                    <el-row>
                        <!--一行试题-->
                        <template v-for="(question,index) in questionList" >
                            <el-col :span="24">
                                <el-row class="mt-30">
                                    <!--试题题目-->
                                    <el-col :span="24" align="left">
                                        <h4>{{index+1}}、{{question.questionName}}</h4>
                                    </el-col>
                                    <el-col v-if="isChoice(question.type)" :span="24" align="left">
                                        <el-radio-group v-model="question.answerContent" class="mt-1875" @change="updateChoice(question)">
                                            <el-radio v-if="question.optionA!==''" :label="'A'">A:{{question.optionA}}</el-radio>
                                            <el-radio v-if="question.optionB!==''" :label="'B'">B:{{question.optionB}}</el-radio>
                                            <el-radio v-if="question.optionC!==''" :label="'C'">C:{{question.optionC}}</el-radio>
                                            <el-radio v-if="question.optionD!==''" :label="'D'">D:{{question.optionD}}</el-radio>
                                            <el-radio v-if="question.optionE!==''" :label="'E'">E:{{question.optionE}}</el-radio>
                                            <el-radio v-if="question.optionF!==''" :label="'F'">F:{{question.optionF}}</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                    <el-col v-if="isMultiChoice(question.type)" :span="24" align="left">
                                        <el-checkbox-group v-model="question.optionList" class="mt-1875" @change="updateChoice(question)">
                                            <el-checkbox v-if="question.optionA!==''" :label="'A'">A:{{question.optionA}}</el-checkbox>
                                            <el-checkbox v-if="question.optionB!==''" :label="'B'">B:{{question.optionB}}</el-checkbox>
                                            <el-checkbox v-if="question.optionC!==''" :label="'C'">C:{{question.optionC}}</el-checkbox>
                                            <el-checkbox v-if="question.optionD!==''" :label="'D'">D:{{question.optionD}}</el-checkbox>
                                            <el-checkbox v-if="question.optionE!==''" :label="'E'">E:{{question.optionE}}</el-checkbox>
                                            <el-checkbox v-if="question.optionF!==''" :label="'F'">F:{{question.optionF}}</el-checkbox>
                                        </el-checkbox-group>
                                    </el-col>
                                    <el-col v-if="!isChoice(question.type) && !isMultiChoice(question.type) && security" :span="24" align="left" class="mt-1875">
                                        <el-input
                                                @paste.native.capture.prevent="handlePaste"
                                                v-model="question.answerContent"
                                                type="textarea"
                                                :autosize="{ minRows: 3, maxRows: 5}"
                                                :maxlength="1000"
                                                show-word-limit
                                                :clearable="true"
                                                @change="updateChoice(question)"
                                                placeholder="请输入内容"
                                                resize="none"
                                        />
                                    </el-col>
                                    <el-col v-if="!isChoice(question.type) && !isMultiChoice(question.type) && !security" :span="24" align="left" class="mt-1875">
                                        <el-input
                                                v-model="question.answerContent"
                                                type="textarea"
                                                :autosize="{ minRows: 3, maxRows: 5}"
                                                :maxlength="1000"
                                                show-word-limit
                                                :clearable="true"
                                                @change="updateChoice(question)"
                                                placeholder="请输入内容"
                                                resize="none"
                                        />
                                    </el-col>

                                </el-row>
                            </el-col>
                        </template>
                    </el-row>
                </div>
            </el-col>
            <el-col :span='8' align="center">
                <div class="panel shadow">
                    <el-row>
                        <el-col :span="24" align="left">
                            <h4>答题卡</h4>
                        </el-col>
                        <el-col :span="24" class="mt-1875">
                            <div class="card">
                                <el-row>
                                    <template v-for="(q,i) in questionList">
                                        <el-col style="margin-left: 10px;margin-bottom:10px" :span='4' align="center">
                                            <el-button class="card-item" circle>{{i+1}}</el-button>
                                        </el-col>
                                    </template>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="11" class="mt-1875">
                            <el-button style="width:100%" type="primary" size="small" @click="submitPaper()" :disabled="notSubmit" :loading="submitLoad">确认交卷</el-button>
                        </el-col>
                        <el-col :span="11" :offset="1" class="mt-1875">
                            <el-button style="width:100%" type="danger" plain size="small" @click='goBack()'>离开</el-button>
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
    import {time2HMS, timeBetween} from "@/utils/functions";

    export default {
        name: "stu_exam_score",
        components:{
            Copyright,
            navigation,
        },
        mounted(){
        },
        data() {
            return{
                choices: ['A', 'B', 'C', 'D', 'E', 'F'],
                mulchoices: [{
                    "label": "A",
                    "value": 'A'
                }, {
                    "label": "B",
                    "value": "B"
                }, {
                    "label": "C",
                    "value": 'C'
                }, {
                    "label": "D",
                    "value": 'D'
                },{
                    "label": "E",
                    "value": 'E'
                }],
                examData:{},
                examTitle:'',
                enterTime:'',
                totalTime:0,
                countTime:'',
                questionList:[],
                questionNum:0,
                answerList:[],
                pid:0,
                kid:0,
                updateInfo: {
                    //  studentId: '',
                    //   paperId: '',
                    //  answerContent: ''
                },
                security:true,
                restTime:0,
                ctTimer:null,
                notSubmit:false,
                submitLoad:false,
            }
        },
        created(){
            this.examData = this.$route.params.examData
            this.examTitle = this.examData.name
            this.enterTime = this.$route.params.enterTime
            this.totalTime = this.examData.time
            this.pid = this.examData.pid
            this.kid = this.examData.kid
            this.security = this.examData.security
            this.restTime = this.$route.params.restTime
            if(this.security){
                this.$nextTick(() => {
                    // 禁用右键
                    document.oncontextmenu = new Function("event.returnValue=false");
                    // 禁用选择
                    document.onselectstart = new Function("event.returnValue=false");
                });}
            this.$once("hook:beforeDestory",()=>{
                clearInterval(this.ctTimer)
                clearTimeout(this.ctTimer)
                this.ctTimer = null
            })
        },
        mounted(){
            this.getCountDown()
            this.getQuestions()
        },
        methods: {
            goBack(){
                this.$confirm('离开会丢失所有数据和本次考试机会，确定吗？', '离开考试', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'warning',
                        message: '您已离开考试'
                    });
                    this.ctTimer = null
                    clearTimeout(this.ctTimer)
                    this.$router.go(-1)
                })
            },
            getCountDown(){
                let start = Date.now()
                let endTime = this.enterTime + this.restTime*1000
                let lefttime = timeBetween(start,endTime)
                this.countTime = time2HMS(lefttime)
                if(lefttime>=0){
                    if(lefttime===60*5){
                        let waring = '距离考试结束还有5分钟，请尽快完成'
                        this.$message.warning(waring)
                    }
                    this.ctTimer = setTimeout(this.getCountDown,1000)
                }else{
                    this.countTime = '已结束'
                    this.notSubmit = true
                    this.$alert('本场考试已结束，请离开考场', '考试结束', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.ctTimer = null
                            clearTimeout(this.ctTimer)
                            this.$router.go(-1)
                        }
                    });

                }
            },
            isChoice(typeId) {
                return typeId === 1
            }, isMultiChoice(typeId) {
                return typeId === 2
            },updateChoice(question,mul) {
                if(question.type===2){
                    this.setarrUpdateInfo(question,mul)}
                else {
                    this.setUpdateInfo(question)
                }
            }, setUpdateInfo(question) {
                this.$set(this.updateInfo, question.qid, question.answerContent)
                console.log(this.updateInfo)
            }, setarrUpdateInfo(question) {
                this.$set(this.updateInfo , question.qid, question.optionList.toString())
                console.log(this.updateInfo)
            },
            getQuestions(){
                this.$axios.get('paper/getpaperinfo?pid='+this.pid).then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.questionList= res.data.data.questions
                        this.questionNum = this.questionList.length
                    }else{
                        let message = "Error"+res.data.rspCode+":"+res.data.rspMsg
                        this.$message.error(message)
                    }
                }).catch(error => {
                    let message = error.message
                    this.$message.error(message)

                });
            },
            submitPaper(){
                this.submitLoad = true
                if(this.getMapLength(this.updateInfo) === this.questionList.length){
                    this.$axios.post('paper/'+this.kid+'/'+this.pid+'/submit', this.updateInfo).then(resp => {
                            if (resp && resp.data.rspCode === '200') {
                                this.submitLoad = false
                                this.notSubmit = true
                                let data = resp.data
                                this.$alert('试卷提交成功，请离开考场', '交卷成功', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.ctTimer = null
                                        clearTimeout(this.ctTimer)
                                        this.$router.go(-1)
                                    }
                                });
                            } else {
                                this.submitLoad = false
                                this.notSubmit = false
                                let message = "Error"+resp.data.rspCode+":"+resp.data.rspMsg
                                this.$message.error(message)
                            }
                        }).catch(error => {
                        let message = error.message
                        this.$message.error(message)
                    })
                }else{
                    this.$message.warning('您还有未完成的题目，无法交卷')
                    this.submitLoad = false
                }
            },
            getMapLength(map){
                let length = 0;
                for(let i in map){
                    length++;
                }
                return length
            },
            getAnswerStatus(q,i){
                let qIndex = i
                let qid = i.qid
                return (this.updateInfo[qid] === undefined)
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
    .main-panel >>> .el-page-header__title{
        line-height: 25px;
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
    .panel{
        position:relative;
        background: #fff;
        border-radius: 8px;
        padding: 30px;
        width: 100%;
    }
    .panel h2{
        font-size:18px;
        margin: 0;
        line-height: 30px;

    }
    .count-down{
        background:rgba(250,250,250,1);
        padding:5px 15px;
        font-size: 14px;
        border-radius: 20px;
        width: max-content;
        color: rgb(110, 110, 110);
        font-weight: 500;
    }
    .card{
        width: 100%;
        height: max-content;
        background:rgba(250,250,250,1);
        padding:10px 0;
        border-radius: 10px;
    }
    .card-item{
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,223,230,1);
        user-select: none;
        line-height: 1;
        width: 30px;
        height: 30px;
        padding: 0;
        color:rgb(110, 110, 110);
    }
</style>
