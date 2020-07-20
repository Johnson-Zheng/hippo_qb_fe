<template>
    <el-dialog title="添加试题" :visible.sync="addDialogVisible" :before-close="cancelAddDialog" :close-on-click-modal="false" append-to-body>
        <el-form label-position="left" :model="addQuestionForm" ref="addQuestionForm" label-width="80px" :rules="addQuetionRules">
            <el-form-item label="试题课程" prop="cid" >
                <CourseQuery @courseid="showcid"></CourseQuery>
            </el-form-item>
            <el-form-item label="试题类型" prop="type">
                <el-radio-group v-model="questionType">
                    <el-radio label="1">单选题</el-radio>
                    <el-radio label="2">多选题</el-radio>
                    <el-radio label="3">主观题</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="试题题目" prop="questionName">
                <el-input placeholder="1+1=？"  v-model="addQuestionForm.questionName"/>
            </el-form-item>
            <el-form-item label="选项数量" v-if="questionType==='1'|| questionType==='2' ">
                <el-input-number v-model="questionNum" :min="2" :max="6" size="small"></el-input-number>
            </el-form-item>
            <el-form-item v-if="questionType==='1' || questionType==='2'" label='题目选项'>
                <el-row>
                    <el-col :span="8" v-for="option in questionNum">
                        <el-input class="mt-1875" :placeholder="alphabet[option-1]" v-model="optionList[option-1]"/>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item v-if="questionType==='1'" label="单选答案" prop="answer">
                <el-row >
                    <el-radio-group v-model="addQuestionForm.answer" prop="answer">
                        <el-col :span="4" v-for="i in questionNum" >
                                <el-radio :label="alphabet[i-1]" >{{alphabet[i-1]}}</el-radio>
                        </el-col>
                    </el-radio-group>
                </el-row>
            </el-form-item>
            <el-form-item v-if="questionType==='2'" label="多选答案" prop="answer">
                <el-row >
                    <el-checkbox-group v-model="checkboxList">
                        <el-col :span="4" v-for="i in questionNum">
                            <el-checkbox :label="alphabet[i-1]" >{{alphabet[i-1]}}</el-checkbox>
                        </el-col>
                    </el-checkbox-group>
                </el-row>
            </el-form-item>
            <el-form-item v-if="questionType==='3'" label="主观答案" prop="answer">
                <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入主观题答案"
                        maxlength="1000"
                        show-word-limit
                        v-model="addQuestionForm.answer">
                </el-input>
            </el-form-item>
            <el-form-item label="试题解析">
                <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="说明题目目的或说明答题思路"
                        maxlength="1000"
                        show-word-limit
                        v-model="addQuestionForm.context">
                </el-input>
            </el-form-item>
        </el-form>
        <el-row class="mt-30">

            <el-col :span="8" style="opacity:0">
                <p>1</p>
            </el-col>
            <el-col :span="6">
                <el-button @click="cancelAddDialog" size="medium" class="normal-button">取消</el-button>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="addQuestionHandle" size="medium" class="ok-button">确定添加</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
    import CourseQuery from "@/component/question/CourseQuery";
    import {questionType} from "@/utils/validate";
    export default {
        name: "addQuestion",
        components: {
            CourseQuery
        },

        data(){

            return{
                questionType:'',
                checkboxList:[],
                alphabet:   ["A", "B", "C", 'D', 'E', 'F'],
                optionList: ['', '', '', '', '', ''],
                questionNum:2,
                addQuestionForm:{
                    type:'',
                    //TODO:创建者需要题库页面传参
                    questionName:'',
                    answer:'',
                    optionA:'',
                    optionB:'',
                    optionC:'',
                    optionD:'',
                    optionE:'',
                    optionF:'',
                    diffcult:'', //难度
                    context:'', //答案解析
                    remarks:'',//备注
                    cid: '', //科目编号
                },
                addQuetionRules:{
                    cid: [{required:true, message:'题目课程不能为空', trigger: 'blur'}],
                    type:[{required:true, message:'请选择试题类型', trigger: 'blur' }],
                    questionName: [{required:true, message:'请输入题目', trigger: 'blur' }],
                }
            }
        },
        props: {
            addDialogVisible: {
                type: Boolean,
                default: false
            }
        },
        methods:{
                cancelAddDialog() {
                    this.$emit("update:addDialogVisible", false)
                    this.$refs.addQuestionForm.resetFields();
                    this.addQuestionForm = {
                        type:'',
                        questionName:'',
                        answer:'',
                        optionA:'',
                        optionB:'',
                        optionC:'',
                        optionD:'',
                        optionE:'',
                        optionF:'',
                        diffcult:'', //难度
                        context:'', //答案解析
                        remarks:'  ',//备注
                        cid: '', //科目编号
                    }
                    this.questionType=''
                    this.checkboxList=[]
                    this.questionNum = 2
                    this.optionList=['', '', '', '', '', '']

            },
            showcid:function (msg){
                this.addQuestionForm.cid = msg.cid
            },
            addQuestionHandle(){
                this.addQuestionForm.type = this.questionType.toString()
                let qtype = this.addQuestionForm.type
                if(qtype === '2'){
                    this.addQuestionForm.answer = this.checkboxList.toString()
                }

                this.$refs.addQuestionForm.validate((valid) => {
                    this.addQuestionForm.optionA = this.optionList[0]
                    this.addQuestionForm.optionB = this.optionList[1]
                    this.addQuestionForm.optionC = this.optionList[2]
                    this.addQuestionForm.optionD = this.optionList[3]
                    this.addQuestionForm.optionE = this.optionList[4]
                    this.addQuestionForm.optionF = this.optionList[5]

                    if (valid && this.checkOptions() && this.checkAnswer()) {
                        this.$axios
                            .post('/api/question/addquestion', this.addQuestionForm).then(resp => {
                            if (resp && resp.data.rspCode === '200') {
                                this.cancelAddDialog()
                                this.$message.success("试题添加成功")
                                location.reload();
                            }
                            else {
                                this.loading = false;
                                this.$message.warning(resp.data.data+",请重新尝试")
                            }
                        })

                    } else if(!this.checkOptions()){
                        this.$message.warning('选项对应内容未填写完整');
                        return false;
                    }else if(!this.checkAnswer()){
                        this.$message.warning('未填写答案');
                        return false;
                    }
                    else {
                        this.$message.warning('请核验表单信息是否遗漏');
                        return false;
                    }
                });

            },
            checkOptions(){
                let num  = this.questionNum //选项数量
                let count = 0
                for(let i=0;i<num;i++) {
                    if(this.optionList[i] !==''){
                        count+=1
                        console.log(count)
                    }
                }
                return num===count
            },
            checkAnswer(){
                return this.addQuestionForm.answer!==''
            }
        }
    }
</script>

<style scoped>

</style>