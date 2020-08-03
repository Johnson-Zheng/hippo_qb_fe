<template>
<div class="container">
    <navigation> </navigation>
        <el-row class="main-panel" :gutter="80">
            <el-col :span="14" align="center">
                <div class="panel shadow">
                    <!--返回页头-->
                    <el-page-header @back="goBack"> </el-page-header>
                    <!--标题和倒计时-->
                    <el-row class="mt-1875" type="flex" justify="end">
                        <el-col :span="6">

                        </el-col>
                        <el-col :span="12" align="center">
                            <h2 class="examTitle">{{examTitle}}</h2>
                        </el-col>
                        <el-col :span="6" align="right">
                            <div class="count-down no-select">
                                倒计时 {{countTime}}
                            </div>
                        </el-col>
                    </el-row>
                    <!--题目列表-->
                    <el-divider content-position="center">诚信考试，诚信人生</el-divider>
                    <el-row style="margin-top:50px">
                        <!--一行试题-->
                        <template  v-for="(question,index) in questionList" >
                            <el-col :span="24">
                                <el-row style="padding:0 10px">
                                    <!--试题题目-->
                                    <el-col :span="24" align="left">
                                        <h4 class="questionTitle" :id="'question'+(index+1)"><span class="req">*</span>{{index+1}}、{{question.questionName}}</h4>
                                    </el-col>
                                    <el-col v-if="isChoice(question.type)" align="left">
                                        <el-radio-group  style="width: 100%"  v-model="question.answerContent" class="mt-1875" @change="updateChoice(question,index)">
                                            <el-radio class="option"  style="width: 18%;margin-bottom:15px"  v-if="question.optionA!==''" :label="'A'"><span class="optionChar">A</span>、{{question.optionA}}</el-radio>
                                            <el-radio class="option" style="width: 18%;margin-bottom:15px" v-if="question.optionB!==''" :label="'B'"><span class="optionChar">B</span>、{{question.optionB}}</el-radio>
                                            <el-radio class="option" style="width: 18%;margin-bottom:15px" v-if="question.optionC!==''" :label="'C'"><span class="optionChar">C</span>、{{question.optionC}}</el-radio>
                                            <el-radio class="option" style="width: 18%;margin-bottom:15px" v-if="question.optionD!==''" :label="'D'"><span class="optionChar">D</span>、{{question.optionD}}</el-radio>
                                            <el-radio class="option" style="width: 18%" v-if="question.optionE!==''" :label="'E'"><span class="optionChar">E</span>、{{question.optionE}}</el-radio>
                                            <el-radio class="option" style="width: 18%" v-if="question.optionF!==''" :label="'F'"><span class="optionChar">F</span>、{{question.optionF}}</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                    <el-col v-if="isMultiChoice(question.type)" :span="24" align="left">
                                        <el-checkbox-group style="width: 100%" v-model="question.optionList" class="mt-1875" @change="updateChoice(question,index)">
                                            <el-checkbox style="width: 18%;margin-bottom:15px" v-if="question.optionA!==''" :label="'A'"><span class="optionChar">A</span>、{{question.optionA}}</el-checkbox>
                                            <el-checkbox style="width: 18%;margin-bottom:15px" v-if="question.optionB!==''" :label="'B'"><span class="optionChar">B</span>、{{question.optionB}}</el-checkbox>
                                            <el-checkbox style="width: 18%;margin-bottom:15px" v-if="question.optionC!==''" :label="'C'"><span class="optionChar">C</span>、{{question.optionC}}</el-checkbox>
                                            <el-checkbox style="width: 18%;margin-bottom:15px" v-if="question.optionD!==''" :label="'D'"><span class="optionChar">D</span>、{{question.optionD}}</el-checkbox>
                                            <el-checkbox style="width: 18%" v-if="question.optionE!==''" :label="'E'"><span class="optionChar">E</span>、{{question.optionE}}</el-checkbox>
                                            <el-checkbox style="width: 18%" v-if="question.optionF!==''" :label="'F'"><span class="optionChar">F</span>、{{question.optionF}}</el-checkbox>
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
                                                @change="updateChoice(question,index)"
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
                                                @change="updateChoice(question,index)"
                                                placeholder="请输入内容"
                                                resize="none"
                                        />
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="24" style="opacity: 0.3;padding:0 10px;">
                                <el-divider> </el-divider>
                            </el-col>
                        </template>
                    </el-row>
                </div>
            </el-col>
            <el-col :span='8' align="center">
                <div>
                </div>
                <div class="fix-panel panel shadow">
                    <el-row>
                        <el-col :span="24" align="left">
                            <h4>答题卡</h4>
                        </el-col>
                        <el-col :span="24" class="mt-1875">
                            <div class="card">
                                <el-row >
                                    <template v-for="(q,i) in questionList">
                                        <el-col class="hover-item" style="margin-left: 5px;margin-bottom:15px;" :span='4' align="center">
                                            <el-button :class="{'active':answerList[i]}" class="card-item" circle @click="rollTo(i)"><span>{{i+1}}</span></el-button>
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
            window.onbeforeunload = e => {      //刷新时弹出提示
                return '123123'
            };
        },
        data() {
            return{
                choices: ['A', 'B', 'C', 'D', 'E', 'F'],
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
                    clearInterval(this.ctTimer)
                    clearTimeout(this.ctTimer)
                    this.ctTimer = null
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
            },
            isMultiChoice(typeId) {
                return typeId === 2
            },
            updateChoice(question,index) {
                if(question.type===2){
                    this.setarrUpdateInfo(question,index)}
                else {
                    this.setUpdateInfo(question,index)
                }
            },
            setUpdateInfo(question,index) {
                this.$set(this.updateInfo, question.qid, question.answerContent)
                if(question.answerContent!==''){
                    this.answerList[index] = true
                }else{
                    this.answerList[index] = false
                }


            },
            setarrUpdateInfo(question,index) {
                this.$set(this.updateInfo , question.qid, question.optionList.toString())
                if(question.optionList.toString()!==''){
                    this.answerList[index] = true
                }else{
                    this.answerList[index] = false
                }
            },
            getQuestions(){
                this.$axios.get('paper/getpaperinfo?pid='+this.pid).then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.questionList= res.data.data.questions
                        this.questionNum = this.questionList.length
                        this.getAnswerStatus()

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
                this.notSubmit = true
                if(this.checkAnswerList()){
                    this.$axios.post('paper/'+this.kid+'/'+this.pid+'/submit', this.updateInfo).then(resp => {
                            if (resp && resp.data.rspCode === '200') {
                                let data = resp.data
                                this.ctTimer = null
                                clearTimeout(this.ctTimer)
                                this.$alert('试卷提交成功，请离开考场', '交卷成功', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.ctTimer = null
                                        clearTimeout(this.ctTimer)
                                        this.$router.go(-1)
                                    }
                                });
                            }else{
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
            checkAnswerList(){
                for(let i in this.answerList){
                    if(!this.answerList[i]){
                        return false
                    }
                }
                return true
            },
            getAnswerStatus(){
                for(let i=0;i<this.questionNum;i++){
                    this.answerList.push(false)
                }
            },
            rollTo(i){
                document.getElementById('question'+i).scrollIntoView({
                    behavior: "smooth"
                });
            },
            calcOptionNum(question){
                let list = ['optionA','optionB','optionC','optionD','optionE','optionF']
                let num = 0
                for(i in list){
                    if(question[i]!==''){
                        count++
                    }
                }
                return num
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
        padding:15px 0 0 0;
        border-radius: 10px;
    }
    .card-item{
        background:#fafafa;
        border:0 solid rgba(220,223,230,0.5);
        font-weight: bold;
        user-select: none;
        line-height: 1;
        width: 30px;
        height: 30px;
        padding: 0;
        color: rgb(139, 139, 139);
        transition: all ease-in-out 0.3s;
    }
    .card-item :hover{
        color: rgb(72, 72, 72);
    }
    .hover-item :hover{
        transform: translateY(-3px);
    }
    .active{
        background: linear-gradient(to bottom right, #89bbff, #579ff8);
        color:#ffffff;
        border:0;
        font-weight: 700;
        transition: all ease-in-out 0.3s;
        box-shadow:0 7px 15px rgba(91,132,247,0.3);
    }
    .active :hover{
        transition: all ease-in-out 0.3s;
        transform: translateY(-3px);
        color: #ffffff;
    }
    .fix-panel{
        position: fixed;
        width: 20%;
    }
    .questionTitle{
        font-size: 15px;
        font-weight: bold;
        letter-spacing:1px;
        line-height: 2;
        color:#444444;
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;

    }
    .examTitle{
        font-size: 24px!important;
        font-weight: bolder!important;
    }
    .req{
        color: red;
        font-weight: bold;
        top: 3px;
        margin-right: 5px;
        left: -10px;
    }
    .option{
        letter-spacing: 1px;
        font-weight: bolder;
    }
    .optionChar{
        font-size: 15px;
        font-weight: normal;
    }
</style>
