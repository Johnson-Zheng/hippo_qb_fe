<template>
    <el-dialog title="添加试卷" :visible.sync="addDialogVisible" :before-close="cancelAddDialog" :close-on-click-modal="false" append-to-body>
        <el-form label-position="left" :model="addPaperForm" ref="addPaperForm" label-width="80px" :rules="addPaperRules">
            <el-form-item label="试卷标题" prop="name">
                <el-input placeholder="XX课程期末考试测验卷"  v-model="addPaperForm.name"/>
            </el-form-item>
            <el-row type="flex" justify="space-between">
                <el-col :span="7">
                    <el-form-item label="单选分值" prop="sinscore" >
                        <el-input placeholder="5" size="small"  v-model="addPaperForm.sinscore" @change="setTotalScore"/>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="多选分值" prop="mulscore" @change="setTotalScore">
                        <el-input placeholder="5" size="small"  v-model="addPaperForm.mulscore" @change="setTotalScore"/>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="主观分值" prop="subscore" @change="setTotalScore">
                        <el-input placeholder="5" size="small"  v-model="addPaperForm.subscore" @change="setTotalScore"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="addQuestion">
                <h3 style="margin: 0 0 10px 0">添加试题</h3>
                <el-form-item label="选择课程" class="mt-1875">
                    <CourseQuery @courseid="showcid"></CourseQuery>
                </el-form-item>
                <el-form-item v-if="this.cid!==0" label="题目类型">
                    <el-radio-group v-model="type" @change=this.handleTypechange size="small">
                        <el-radio-button :label="1">单选题</el-radio-button>
                        <el-radio-button :label="2">多选题</el-radio-button>
                        <el-radio-button :label="3">主观题</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="this.cid!==0" label='选择题目'>
                    <el-table
                            ref="multipleTable"
                            :data="this.tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                            size="small"
                            max-height="200"
                    >
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
                    <el-row type="flex">
                        <el-col justify="end">
                            <el-button type="text" @click="addSelectQuestion">添加所选试题</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item v-if="postQidList.length!==0" label='已选列表' style="margin:0">
                    <el-table ref="multipleTable"
                              :data="this.selectForm"
                              tooltip-effect="dark"
                              style="width: 100%"
                              size="small"
                              max-height="200"
                    >
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
                        <el-table-column
                                prop="type"
                                label="题目类型"
                                :formatter="questionType"
                                show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <el-row>
                        <el-col :span="8" v-if="addPaperForm.sinsum!==0">
                            <p  class="tips-text">单选题共 {{this.addPaperForm.sinsum}} 个</p>
                        </el-col>
                        <el-col :span="8" v-if="addPaperForm.mulsum!==0">
                            <p  class="tips-text">多选题共 {{this.addPaperForm.mulsum}} 个</p>
                        </el-col>
                        <el-col :span="8" v-if="addPaperForm.subsum!==0">
                            <p  class="tips-text">主观题共 {{this.addPaperForm.subsum}} 个</p>
                        </el-col>
                    </el-row>
                </el-form-item>
            </div>
            <el-form-item v-if="this.addPaperForm.totalscore!==0" label="试卷总分" class="mt-1875">
                <p>{{this.addPaperForm.totalscore}}</p>
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
                <el-button type="primary" @click="addQuestionHandle" size="medium" class="ok-button">添加试卷</el-button>
            </el-col>
        </el-row>

    </el-dialog>


</template>

<script>
    import CourseQuery from "@/component/question/CourseQuery";
    import {questionType,sleep} from "@/utils/validate";

    export default {
        name: "addPaper",
        components: {
            CourseQuery
        },
        mounted(){
            this.loading = true

        },
        data(){
            return{
                loading:true,
                tableData: [],
                multipleSelection: [],
                selectForm:[],
                postQidList:[],
                questionType:questionType,
                cid:0,
                type:1,
                addPaperForm:{
                    name:'',
                    sinscore:'',
                    mulscore:'',
                    subscore:'',
                    sinsum:0,
                    mulsum:0,
                    subsum:0,
                    questionId:'',
                    totalscore:0,
                },
                addPaperRules:{
                    name:[{required:true, message:'试卷标题不能为空', trigger: 'blur' }],
                    sinscore: [{required:true, message:'单选分值不能为空', trigger: 'blur' }],
                    mulscore: [{required:true, message:'多选分值不能为空', trigger: 'blur' }],
                    subscore: [{required:true, message:'主观分值不能为空', trigger: 'blur' }],
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
                this.$emit("update:addDialogVisible", false);
                this.$refs.addPaperForm.resetFields();
                this.cid=0;
                this.type=1;
                this.multipleSelection=[];
                this.selectForm=[];
                this.addPaperForm = {
                    name:'',
                    sinscore:'',
                    mulscore:'',
                    subscore:'',
                    sinsum:0,
                    mulsum:0,
                    subsum:0,
                    questionId:'',
                    totalscore:0,
                }
                this.postQidList=[]
            },
            handleSelectionChange(val) {
                this.multipleSelection=[]
                for (let i=0; i< val.length;i++){
                    this.multipleSelection.push(val[i])
                }
            },
            getquestionlist(type,cid){
                var _this = this
                if(this.checkClass()){
                    this.$axios.get('question/qlistbytypecid?cid='+this.cid+'&type='+this.type).then(resp => {
                        if (resp && resp.data.rspCode === '200') {
                            _this.tableData = resp.data.data
                            _this.loading = false
                        }else {
                            this.$alert(resp.data.rspMsg+"：获取题目信息异常", '提示', {
                                confirmButtonText: '确定'
                            })
                        }
                    })
                }else {
                    this.$message.warning('未选择课程，无法获取数据')
                    return false;
                }
            },
            showcid:function (msg){
                this.cid = msg.cid
                this.getquestionlist(this.type,this.cid)
            },
            handleTypechange(val){
                this.type = val
                this.getquestionlist(this.type,this.cid)
            },
            async addSelectQuestion(){
                let list = this.multipleSelection
                let sincount = this.addPaperForm.sinsum
                let mulcount = this.addPaperForm.mulsum
                let subcount = this.addPaperForm.subsum
                if(list.length!==0){
                    for(let i in list){
                        let qid = list[i].qid
                        let qtype = list[i].type
                        if(this.postQidList.indexOf(qid)===-1)
                        {
                            this.selectForm.push(this.multipleSelection[i])
                            this.postQidList.push(qid)
                            if(qtype===1){
                                sincount++
                            }else if(qtype===2){
                                mulcount++
                            }else if(qtype===3){
                                subcount++
                            }
                        }else{
                            let message = "编号为"+qid+"的试题已存在，请勿重复添加"
                            await this.$message.warning(message);
                            continue
                        }
                    }
                    this.addPaperForm.sinsum = sincount
                    this.addPaperForm.mulsum = mulcount
                    this.addPaperForm.subsum = subcount
                    this.setTotalScore()
                }else{
                    this.$message.warning("未选中任何数据，无法添加")
                }
            },
            addQuestionHandle(){
                this.$refs.addPaperForm.validate((valid) => {
                    if (valid && this.checkClass() && this.checkQidList()) {
                        this.addPaperForm.questionId = this.postQidList.sort().toString()
                        this.$axios.post('paper/addpaper', this.addPaperForm).then(resp => {
                            if (resp && resp.data.rspCode === '200') {
                                this.cancelAddDialog()
                                this.$message.success("试卷添加成功")
                                sleep(1000).then(()=>{
                                    location.reload();
                                })
                            }
                            else {
                                this.loading = false;
                                this.$message.warning(resp.data.data+",请重新尝试")
                            }
                        }).catch(error => {
                            let message = error.message
                            this.$message({
                                message: message,
                                type: 'error'
                            });
                        });
                    }else if(!valid){
                        this.$message.warning('请核验表单信息是否遗漏');
                        return false;
                    } else if(!this.checkClass()){
                        this.$message.warning('未选择课程');
                        return false;
                    }else if(!this.checkQidList()){
                        this.$message.warning('未选择试题');
                        return false;
                    }
                });

            },
            checkClass(){
                return (this.cid!==0)
            },
            checkQidList(){
                return this.postQidList.length
            },
            setTotalScore(){
                let sinscore = (this.addPaperForm.sinscore!=='' ) ? parseInt(this.addPaperForm.sinscore) : 0
                let mulscore = (this.addPaperForm.mulscore!=='' ) ? parseInt(this.addPaperForm.mulscore) : 0
                let subscore = (this.addPaperForm.subscore!=='' ) ? parseInt(this.addPaperForm.subscore) : 0
                let sinsum = this.addPaperForm.sinsum
                let mulsum = this.addPaperForm.mulsum
                let subsum = this.addPaperForm.subsum
                this.addPaperForm.totalscore = sinscore * sinsum + mulscore * mulsum + subscore * subsum
            }
        }
    }
</script>

<style scoped>
    .addQuestion{
        padding: 10px;
        background: #fafafa;
        border-radius: 5px;
    }
</style>