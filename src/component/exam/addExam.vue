<template>
    <el-dialog title="添加考试" :visible.sync="addDialogVisible" :before-close="cancelAddDialog" :close-on-click-modal="false" append-to-body>
        <el-form label-position="left" :model="addExamForm" ref="addExamForm" label-width="80px" :rules="addExamRules">
            <el-form-item label="考试标题" prop="name">
                <el-input placeholder="XXX学校期末考试"  v-model="addExamForm.name"/>
            </el-form-item>
            <el-form-item label="开始时间" prop="starttime" >
                <el-date-picker
                        v-model="addExamForm.starttime"
                        type="datetime"
                        placeholder="开始入场时间"
                        value-format="timestamp"
                        default-time="12:00:00"
                >
                </el-date-picker>
            </el-form-item>

            <el-form-item label="截止时间" prop="deadline" >
                <el-date-picker
                        v-model="addExamForm.deadline"
                        type="datetime"
                        placeholder="考生截止入场时间"
                        value-format="timestamp"
                        default-time="12:00:00"
                >
                </el-date-picker>
            </el-form-item>

            <el-row type="flex" justify="space-between">
                <el-col :span="12">
                    <el-form-item label="考试时长" prop="time">
                        <el-input placeholder="考试总时长(分钟)"  v-model="addExamForm.time"/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="可考次数" prop="allowtimes">
                        <el-input placeholder="考试可参与次数"  v-model="addExamForm.allowtimes"/>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="参与人员">
                <el-radio v-model="addExamForm.grouptype" label="0">全部</el-radio>
                <el-radio v-model="addExamForm.grouptype" label="1">指定名单</el-radio>
                <p class="tips-text" v-if="addExamForm.grouptype==='1'">提示：请在创建考试后，进入考试详情添加考生名单</p>
            </el-form-item>
            <el-form-item label="选择试卷">
                <paper-query @paperid="showpid" ></paper-query>
            </el-form-item>

            <el-form-item label="防作弊">
                <el-switch v-model="addExamForm.security">
                </el-switch>
            </el-form-item>
        </el-form>
        <el-alert
                close-text="我知道了"
                title="截止时间和考试时长说明"
                :description="'① 超过截止时间后，未进入的考生无法入场，已进入的考生可以继续作答交卷\n② 考试时长是考试可以答题、交卷的时间（考试时间 = 开始时间 + 考试时长）'"
                type="warning">
        </el-alert>
        <el-row class="mt-30" type="flex" justify="end">
            <el-col :span="6">
                <el-button @click="cancelAddDialog" size="medium" class="normal-button">取消</el-button>
            </el-col>
            <el-col :span="10">
                <el-button type="primary" @click="addExamHandler" size="medium" class="ok-button">添加考试</el-button>
            </el-col>
        </el-row>

    </el-dialog>
</template>
<script>
    import {sleep,securityFormatter} from "@/utils/validate";
    import PaperQuery from "@/component/question/PaperQuery";
    export default {
        name: "addExam",
        components: {
            PaperQuery,
        },
        mounted(){
            this.loading = true
        },
        data(){
            return{
                pdata:{},
                securityFormatter,
                timeNow :Date.now(),
                loading:true,
                addExamForm:{
                    pid:'',
                    name: '',
                    starttime: '',
                    deadline: '',
                    grouptype: '0',
                    security: true,
                    allowtimes: '',
                    time: '',
                },
                addExamRules:{
                    name:[{required:true, message:'考试标题不能为空', trigger: 'blur' }],
                    starttime:[{required:true, message:'开始时间不能为空', trigger: 'blur' }],
                    deadline:[{required:true, message:'截止入场时间不能为空', trigger: 'blur' }],
                    time:[{required:true, message:'考试时长不能为空', trigger: 'blur' }],
                    allowtimes:[{required:true, message:'可考次数不能为空', trigger: 'blur' }],

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
                this.pdata={}
                this.timeNow =Date.now()
                this.addExamForm = {
                    name: '',
                    pid:'',
                    starttime: '',
                    deadline: '',
                    grouptype: '0',
                    security: true,
                    allowtimes: '',
                    time: '',
                }
            },

            showpid:function (msg){
                this.addExamForm.pid= msg.pid
            },

            addExamHandler(){
                this.$refs.addExamForm.validate((valid) => {
                    if (valid && this.checkDate() && this.checkPid()) {
                        this.$axios.post('exroom/addexroom', this.addExamForm).then(resp => {
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
                    }
                    else if(!this.checkDate()){
                        this.$message.warning('开始时间必须在截止时间前，或与截止时间相等');
                        return false;
                    }
                    else if(!this.checkPid()){
                        this.$message.warning('未选择试卷');
                        return false;
                    }
                });

            },
            checkPid(){
                return (this.addExamForm.pid !== '')
            },
            checkDate(){
                return (this.addExamForm.starttime <= this.addExamForm.deadline)
            }

        }
    }
</script>

<style scoped>

</style>