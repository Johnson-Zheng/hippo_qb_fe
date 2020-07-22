<template>
    <el-dialog title="添加试卷" :visible.sync="addDialogVisible" :before-close="cancelAddDialog" :close-on-click-modal="false" append-to-body>
        <el-form label-position="left" :model="addPaperForm" ref="addPaperForm" label-width="80px" :rules="addQuetionRules">
            <el-form-item label="试卷标题" >
                <el-input placeholder="XX课程期末考试测验卷"  v-model="addPaperForm.name"/>
            </el-form-item>
                </el-row>
            <el-row type="flex" justify="space-between">
                <el-col :span="7">
                    <el-form-item label="单选分值">
                        <el-input placeholder="5"  v-model="addPaperForm.sincore"/>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="多选分值">
                        <el-input placeholder="5"  v-model="addPaperForm.sincore"/>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="主观分值">
                        <el-input placeholder="5"  v-model="addPaperForm.sincore"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <h3>添加试题</h3>
            <p class="tips-text">请在指定科目和题目类型后添加试题</p>
            <el-form-item label="科目选择" class="mt-1875">
                <CourseQuery @courseid="showcid"></CourseQuery>
            </el-form-item>
            <el-form-item label="题目类型">
                <el-radio-group v-model="type">
                    <el-radio-button :label="1">单选题</el-radio-button>
                    <el-radio-button :label="2">多选题</el-radio-button>
                    <el-radio-button :label="3">主观题</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label='选择题目'>
                <el-table
                        ref="multipleTable"
                        :data="this.tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="qid"
                            label="题目编号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="questionName"
                            label="题目"
                            show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="addquestion">确认添加</el-button>
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
        name: "addPaper",
        components: {
            CourseQuery
        },
        mounted(){
            this.loading = true
            this.getquestionlist(this.type,this.cid)
        },
        data(){

            return{
                loading:true,
                tableData: [],
                multipleSelection: [],
                questionType:'',
                cid:'1',
                type:'1',
                checkboxList:[],
                alphabet:   ["A", "B", "C", 'D', 'E', 'F'],
                optionList: ['', '', '', '', '', ''],
                questionNum:2,
                addPaperForm:{
                    type:'',
                    //TODO:创建者需要题库页面传参
                    name:'',
                    sinscore:'',
                    mulscore:'',
                    subscore:'',
                    sinsum:'',
                    mulsum:'',
                    subsum:'',

                },
                addQuetionRules:{
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
                    this.$refs.addPaperForm.resetFields();
                    //TODO:数据重置
                    this.addPaperForm = {

                    }
                    this.questionType=''
                    this.checkboxList=[]
                    this.questionNum = 2
                    this.optionList=['', '', '', '', '', '']

            },
            handleSelectionChange(val) {
                this.multipleSelection=[]
                // this.$set(this.multipleSelection ,val.date,val.address)
                for (let i=0; i<= val.length-1;i++){
                    this.multipleSelection.push(val[i].qid)
                }
                console.log(this.multipleSelection);
            },
            getquestionlist(type,cid){
                var _this = this
                if(_this.cid!==undefined){
                    this.$axios.get('/api/quesion/qlistbytypecid?cid='+this.cid+'&type='+this.type).then(resp => {
                        if (resp && resp.data.rspCode === '200') {
                            _this.tableData = resp.data.dtata
                            _this.loading = false
                        }else {
                            this.$alert(resp.data.rspMsg+"：获取题目信息异常", '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                    })}else {
                    this.$alert("请勿直接访问接口", '提示：题目获取失败', {
                        confirmButtonText: '确定'
                    })
                }

            },
            showcid:function (msg){
                this.cid = msg.cid
            },
            addQuestionHandle(){
                this.addPaperForm.type = this.questionType.toString()
                let qtype = this.addPaperForm.type
                if(qtype === '2'){
                    this.addPaperForm.answer = this.checkboxList.toString()
                }

                this.$refs.addPaperForm.validate((valid) => {
                    this.addPaperForm.optionA = this.optionList[0]
                    this.addPaperForm.optionB = this.optionList[1]
                    this.addPaperForm.optionC = this.optionList[2]
                    this.addPaperForm.optionD = this.optionList[3]
                    this.addPaperForm.optionE = this.optionList[4]
                    this.addPaperForm.optionF = this.optionList[5]

                    if (valid && this.checkOptions() && this.checkAnswer()) {
                        this.$axios
                            .post('/api/question/addquestion', this.addPaperForm).then(resp => {
                            if (resp && resp.data.rspCode === '200') {
                                this.cancelAddDialog()
                                this.$message.success("试题添加成功")
                                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                                    confirmButtonText: '确定',
                                    type: 'warning'
                                }).then(() => {
                                    location.reload();
                                });
                            }
                            else {
                                this.loading = false;
                                this.$message.warning(resp.data.data+",请重新尝试")
                            }
                        })

                    } else if(!this.checkOptions()){
                        this.$message.warning('选项对应内容未填写完整');
                        return false;
                    }else if(!this.checkAnswer() ){
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
                return this.addPaperForm.answer!==''
            }
        }
    }
</script>

<style scoped>
    .mr-10{
        margin-right: 20px;
    }
</style>