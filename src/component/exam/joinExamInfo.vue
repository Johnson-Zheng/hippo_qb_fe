<template>
    <el-dialog :visible.sync="dialogVisible" :before-close="cancelDialog" >
        <el-row>
            <el-col :span="24" align="center">
                <h2 class="title">{{dialogInfo.name}}</h2>
            </el-col>
        </el-row>
        <el-row class="mt-1875" type="flex" justify="center">
            <el-col :span="6" align="right">
                <p class="data">考试时长：{{dialogInfo.time}}分钟</p>
            </el-col>
            <el-col :span="8" align="center">
                <p class="data">截止时间：{{deadlineDateFormatter(dialogInfo)}}</p>
            </el-col>
            <el-col :span="6" align="left">
                <p class="data">防作弊：{{securityFormatter(dialogInfo)}}</p>
            </el-col>
        </el-row>
        <div class="desc mt-30">
            <h3>考试须知</h3>
            <strong>1、注意考试截止时间</strong>
            <p>考生在设定的试卷内没有完成答题的话成绩会为0，考生一定要留意考试时间，在时限范围内登录系统完成考试</p>
            <strong>2、严守考试规则</strong>
            <p>请务必仔细阅读考试规则，不要尝试触碰“红线”</p>
        </div>
        <el-row class="mt-1875">
            <el-col :span="24" align="center">
                <el-button type="primary" style="letter-spacing: 2px" @click="joinExam">阅读完毕进入考试</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
    import {deadlineDateFormatter, securityFormatter} from "@/utils/validate";

    export default {
        name: "joinExamInfo",
        props: {
            dialogVisible: {
                type: Boolean,
                default: false
            },
            dialogInfo: {
                type: Object,
                default: {}
            }

        },
        data() {
            return {
                securityFormatter,
                deadlineDateFormatter,
            };
        },
        methods: {
            //修改父组件传过来的值
            cancelDialog() {
                this.$emit("update:dialogVisible", false);
            },
            joinExam(){
                let form = {'kid':this.dialogInfo.kid}
                this.$axios.post('exroom/enter',form).then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        let data = this.dialogInfo
                        let restTime = res.data.data
                        this.$router.push({
                            path:'/stu_exam_paper',
                            name:'stu_exam_paper',
                            params:{
                                examData:  data,
                                enterTime: Date.now(),
                                restTime: restTime
                            }
                        })
                    }else{
                        let message = "Error"+res.data.rspMsg+':'+res.data.data
                        this.$message.error(message)
                    }
                }).catch(error => {
                    let message = error.message
                    this.$message.error(message)

                });

            },

        }
    }
</script>

<style scoped>
    .title{
        text-align: center;
        margin: 0;
        font-size:24px;
        font-weight:bold;
        line-height:44px;
        color:rgba(0,0,0,1);
    }
    .desc{
        background:rgba(250,250,250,1);
        padding:20px;
        border-radius: 10px;
    }

    .desc p{
        font-size:14px;
        font-weight:400;
        line-height:26px;
        color:rgba(82,82,82,1);
    }
    .desc strong{
        line-height:35px;
    }
</style>
