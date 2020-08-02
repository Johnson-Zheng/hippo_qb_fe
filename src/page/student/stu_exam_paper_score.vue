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
                        <el-col :span="24" align="left">
                            <h2>{{examTitle}}</h2>
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
                                        <h4 :id="'question'+(index+1)">{{index+1}}、{{question.questionName}}</h4>
                                    </el-col>
                                    <el-col v-if="isChoice(question.type)" :span="24" align="left">
                                        <el-radio-group disabled v-model="youranswer[index][question.qid]" class="mt-1875" @change="updateChoice(question,index)">
                                            <el-radio v-if="question.optionA!==''" :label="'A'">A:{{question.optionA}}</el-radio>
                                            <el-radio v-if="question.optionB!==''" :label="'B'">B:{{question.optionB}}</el-radio>
                                            <el-radio v-if="question.optionC!==''" :label="'C'">C:{{question.optionC}}</el-radio>
                                            <el-radio v-if="question.optionD!==''" :label="'D'">D:{{question.optionD}}</el-radio>
                                            <el-radio v-if="question.optionE!==''" :label="'E'">E:{{question.optionE}}</el-radio>
                                            <el-radio v-if="question.optionF!==''" :label="'F'">F:{{question.optionF}}</el-radio>
                                        </el-radio-group>
                                        <div class="desc mt-1875">
                                            <p>你的答案：{{youranswer[index][question.qid]}}</p>
                                            <p>正确答案：{{question.answer}}</p>
                                            <p style="margin-bottom: 0">题目解析：{{question.context}}</p>
                                        </div>
                                    </el-col>
                                    <el-col v-if="isMultiChoice(question.type)" :span="24" align="left">
                                        <el-checkbox-group disabled v-model="youranswer[index][question.qid].split(',')" class="mt-1875" @change="updateChoice(question,index)">
                                            <el-checkbox v-if="question.optionA!==''" :label="'A'">A:{{question.optionA}}</el-checkbox>
                                            <el-checkbox v-if="question.optionB!==''" :label="'B'">B:{{question.optionB}}</el-checkbox>
                                            <el-checkbox v-if="question.optionC!==''" :label="'C'">C:{{question.optionC}}</el-checkbox>
                                            <el-checkbox v-if="question.optionD!==''" :label="'D'">D:{{question.optionD}}</el-checkbox>
                                            <el-checkbox v-if="question.optionE!==''" :label="'E'">E:{{question.optionE}}</el-checkbox>
                                            <el-checkbox v-if="question.optionF!==''" :label="'F'">F:{{question.optionF}}</el-checkbox>
                                        </el-checkbox-group>
                                        <div class="desc mt-1875">
                                            <p>你的答案：{{youranswer[index][question.qid]}}</p>
                                            <p>正确答案：{{question.answer}}</p>
                                            <p style="margin-bottom: 0">题目解析：{{question.context}}</p>
                                        </div>
                                    </el-col>
                                    <el-col v-if="!isChoice(question.type) && !isMultiChoice(question.type)" :span="24" align="left" class="mt-1875">
                                        <div class="desc mt-1875">
                                            <p>你的答案：{{youranswer[index][question.qid]}}</p>
                                            <p>正确答案：{{question.answer}}</p>
                                            <p style="margin-bottom: 0">题目解析：{{question.context}}</p>
                                        </div>
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
                        <el-col :span="12" align="left">
                            <h2 class="card-h2">答题卡</h2>
                        </el-col>
                        <el-col :span="12" align="right">
                            <div class="count-down no-select">
                                <span>{{myScore}}</span>/{{totalScore}}
                            </div>
                        </el-col>
                        <el-col :span="24" class="mt-1875">
                            <div class="card">
                                <el-row>
                                    <template v-for="(q,i) in questionList">
                                        <el-col style="margin-left: 10px;margin-bottom:15px" :span='4' align="center">
                                            <el-button :class="{'active':answerList[i]}" class="card-item" circle @click="rollTo(i)">{{i+1}}</el-button>
                                        </el-col>
                                    </template>
                                </el-row>
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
                totalScore:0,
                myScore:0,
                youranswer:[],
                wrongList:[],
                stuData:{},
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
                    //  studentId: '',
                    //   paperId: '',
                    //  answerContent: ''
                },
                fromTeacher: false,
                uno:'',
                ctTimer:null,
                notSubmit:false,
                submitLoad:false,
            }
        },
        created(){
            if(this.$route.params.fromTeacher===undefined){
                this.examData = this.$route.params.examData
                this.examTitle = this.examData.name
                this.pid = this.examData.pid
                this.kid = this.examData.kid
            }else{
                this.stuData = this.$route.params.examData
                this.fromTeacher = this.$route.params.fromTeacher
                this.uno = this.stuData.uno
                this.kid = this.$route.params.kid
                this.examTitle = this.$route.params.examName
            }

        },
        mounted(){
            if(!this.fromTeacher){
                this.checkData()
            }else{
                this.checkStuData()
            }

        },
        methods: {
            goBack(){
                if(this.fromTeacher){
                    this.$router.push({
                        path:'/stu_exam_score',
                        name:'stu_exam_score',
                        params:{
                            examName: this.examTitle,
                            kid:this.kid,
                        }
                    })
                }else{
                    this.$router.go(-1)
                }

            },
            checkData(){
              if(this.examData===undefined || this.examData.length === 0) {
                  this.$alert('获取错误，无法加载成绩','数据错误', {
                      confirmButtonText: '确定',
                      callback: action => {
                          this.$router.go(-1)
                      }
                  });
              }else{
                  this.getQuestions()

              }
            },
            checkStuData(){
                if(this.stuData===undefined || this.stuData.length === 0) {
                    this.$alert('获取学生成绩错误，无法加载成绩','数据错误', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.go('/tea_exam')
                        }
                    });
                }else{
                    this.getQuestionsByTeacher()
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
                this.$axios.get('/examdata/examresult?kid='+this.kid).then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.questionList= res.data.data.questions
                        this.examTitle = res.data.data.papername
                        this.myScore = res.data.data.yourscore
                        this.totalScore = res.data.data.fullmark
                        this.youranswer = res.data.data.youranswer
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
            getQuestionsByTeacher(){
                this.$axios.get('examdata/texamresult?kid='+this.kid+'&uno='+this.uno).then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.questionList= res.data.data.questions

                        this.myScore = res.data.data.yourscore
                        this.totalScore = res.data.data.fullmark
                        this.youranswer = res.data.data.youranswer
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
            getAnswerStatus(){
                for(let i=0; i<this.questionNum;i++){
                    if(this.questionList[i].answer === this.youranswer[i][this.questionList[i].qid]){
                        this.answerList.push(true)
                    }else{
                        this.answerList.push(false)
                    }
                }
            },
            rollTo(i){
                document.getElementById('question'+i).scrollIntoView({
                    behavior: "smooth"
                });
            },

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
        /*background: linear-gradient(to bottom right, #89bbff, #579ff8);*/
        font-size: 14px;
        border-radius: 20px;
        width: max-content;
        color:#579ff8;
        font-weight: 800;
        font-style:italic;
    }

    .count-down span{
        font-size: 28px;

    }
    .card-h2{
        line-height: 38px!important;
    }
    .card{
        width: 100%;
        height: max-content;
        background:rgba(250,250,250,1);
        padding:15px 0 0 0;
        border-radius: 10px;
    }
    .card-item{
        background: linear-gradient(to bottom right, #f68c84, #dd5c4f);
        border:0 solid rgba(220,223,230,0.5);
        font-weight: bold;
        user-select: none;
        line-height: 1;
        width: 30px;
        height: 30px;
        padding: 0;
        color: #ffffff;
        transition: all ease-in-out 0.3s;
    }
    .active{
        background: linear-gradient(to bottom right, #65fca1, #2caa47);
        color:#ffffff;
        border:0;
        font-weight: 700;
        transition: all ease-in-out 0.3s;
        box-shadow:0 7px 15px rgba(91,132,247,0.3);
        transform: translateY(-2%);
    }
    .desc{
        padding: 10px;
        background:#f5f7fa;
        transition: all ease-in-out 0.3s;
        border:1px solid rgb(235,235,235);
        border-radius: 5px;
    }
    .desc p{
        color:#8b8b8b;
        font-size:12px;
        margin-bottom: 10px;
    }

</style>
