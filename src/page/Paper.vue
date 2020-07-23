<template>
    <body id="paper">
    <el-form :model="paperQuestion"  class="login-container" label-position="left"
             label-width="0px" v-loading="loading">
        <h3 class="Paper_title">【{{ paperQuestion.papername}}】</h3>
        <h6 class="Paper_title" >答题过程中请不要关闭页面或复制粘贴试题及答案</h6>

        <el-row :gutter="10">

            <el-col v-for="(question,questionIndex) in paperQuestion.questions" :key="question.type" :xs="24" :sm="24">
                <div>
                    <h4>{{ questionIndex + 1 +'：' }} {{ question.questionName }}</h4>
                    <!-- 单项选择题选项template -->
                    <template v-if="isChoice(question.type)">
                        <el-radio-group v-model="question.answerContent" @change="updateChoice(question)">
                            <div class="box-card">
                                <el-radio :label="choices[0]">{{ choices[0] }}. {{question.optionA }}</el-radio>
                                <el-radio :label="choices[1]">{{ choices[1] }}. {{question.optionB }}</el-radio>
                                <el-radio :label="choices[2]">{{ choices[2] }}. {{question.optionC }}</el-radio>
                                <el-radio :label="choices[3]">{{ choices[3] }}. {{question.optionD }}</el-radio>
                            </div>
                        </el-radio-group>
                    </template>
                    <!-- 多项选择题选项template -->
                    <template v-if="isMultiChoice(question.type)" >
                        <el-checkbox-group v-model="question.optionList" @change="updateChoice(question,mulchoice)">
                            <el-checkbox label='A'>{{ choices[0] }}.{{question.optionA }}</el-checkbox>
                            <el-checkbox label='B'>{{ choices[1] }}.{{question.optionB }}</el-checkbox>
                            <el-checkbox label='C'>{{ choices[2] }}.{{question.optionC }}</el-checkbox>
                            <el-checkbox label='D' >{{ choices[3] }}.{{question.optionD }}</el-checkbox>
                            <el-checkbox label='E'>{{ choices[4] }}.{{question.optionE }}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                    <!--主观题template -->
                    <template v-if="!isChoice(question.type) && !isMultiChoice(question.type) &&security">
                        <el-input
                                @paste.native.capture.prevent="handlePaste"
                                v-model="question.answerContent"
                                type="textarea"
                                :autosize="{ minRows: 1, maxRows: 4}"
                                :maxlength="300"
                                :clearable="true"
                                @change="updateChoice(question)"
                        />
                    </template>
                    <template v-if="!isChoice(question.type) && !isMultiChoice(question.type) &&security===false">
                        <el-input
                                v-model="question.answerContent"
                                type="textarea"
                                :autosize="{ minRows: 1, maxRows: 4}"
                                :maxlength="300"
                                :clearable="true"
                                @change="updateChoice(question)"
                        />
                    </template>
                </div>
            </el-col>
        </el-row>


        <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="submit">提交</el-button>


    </el-form>
    <h6 class="Paper_warn" v-if="security">注意：本场考试属于标准化考试,禁止复制粘贴题目及答案，请勿从随意刷新、退出考试界面，网络波动请联系老师！</h6>
    </body>
</template>
<script>
    export default {
        name: 'paper',
        data () {
            return {
                kid:'',
                pid:'',
                choices: ['A', 'B', 'C', 'D', 'E', 'F'],
                checkList: ['选中且禁用','复选框 A'],
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
                mulchoice:[],
                singlechoice:'',
                paperQuestion: null,
                checked: true,
                answer: {},
                paper:'',
                security:'',
                updateInfo: {
                    //  studentId: '',
                    //   paperId: '',
                    //  answerContent: ''
                },

                loading: false
            }
        },
        mounted () {
            this.loading = true
            this.getpaperinfo()
        },
        created() {
            if(this.$route.params.security){
            this.$nextTick(() => {
                // 禁用右键
                document.oncontextmenu = new Function("event.returnValue=false");
                // 禁用选择
                document.onselectstart = new Function("event.returnValue=false");
            });}
                this.pid = this.$route.params.pid
                this.kid = this.$route.params.kid
                this.security = this.$route.params.security
                console.log(this.msg)

        },
        methods:{
            getpaperinfo () {
                var _this = this
                if(_this.pid!==undefined){
                this.$axios.get('paper/getpaperinfo?pid='+this.pid).then(resp => {
                    if (resp && resp.data.rspCode === '200') {
                        _this.paperQuestion = resp.data.data
                        _this.loading = false
                    }else {
                        this.$alert(resp.data.rspMsg+"：获取试卷信息异常，请勿从非官方链接参加考试", '提示', {
                            confirmButtonText: '确定'
                        })
                    }
                })}else {
                    this.$alert("请勿从非官方链接参加考试,刷新页面后需要重新参加考试", '提示：试卷获取失败', {
                        confirmButtonText: '确定'
                    })
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
                 //   this.$message("添加单选成功")
                }
                console.log(question)

            }, setUpdateInfo(question) {
                //   this.updateInfo.answerContent = question.answerContent
                //  this.updateInfo.qid = question.qid
                this.$set(this.updateInfo ,question.qid, question.answerContent)
            }, setarrUpdateInfo(question,mul) {
                //   this.updateInfo.answerContent = question.answerContent
                //  this.updateInfo.qid = question.qid
                //   this.$set(this.updateInfo ,question.qid, JSON.stringify(mul))
                this.$set(this.updateInfo ,question.qid,mul.toString())
            },
            submit () {

                var _this = this
                this.$axios
                    .post('paper/'+this.kid+'/'+this.pid+'/submit', _this.updateInfo)
                    .then(resp => {
                        if (resp.data.rspCode === '200') {
                            var data = resp.data
                            this.$alert(resp.data.data,resp.data.rspMsg, {
                                confirmButtonText: '确定'
                            })
                        } else {
                            this.$alert(resp.data.data,resp.data.rspMsg, {
                                confirmButtonText: '确定'
                            })
                        }
                    })
                    .catch(failResponse => {})
            },
        }
    }
</script>

<style scoped>
    #paper {
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
    body{
        margin: 0;
    }
    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 850px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .Paper_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .Paper_warn{
        text-align: center;
        color:#FF0000;
    }

</style>
