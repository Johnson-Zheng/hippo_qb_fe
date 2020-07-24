<template>
    <el-dialog title="题目详情" :visible.sync="dialogVisible" :before-close="cancelDialog" >
        <el-row>
            <el-col :span="4">
                <h4>试题题目</h4>
            </el-col>
            <el-col :span="20">
                <p>{{dialogInfo.questionName}}</p>
            </el-col>
        </el-row>
        <el-row class="mt-1875">
            <el-col :span="4">
                <h4>题目选项</h4>
            </el-col>
            <el-col :span="20">
              <p>{{getOptions(dialogInfo)}}</p>
            </el-col>
        </el-row>
        <el-row class="mt-1875">
            <el-col :span="4">
                <h4>试题答案</h4>
            </el-col>
            <el-col :span="20">
                <p>{{dialogInfo.answer}}</p>
            </el-col>
        </el-row>
        <el-row class="mt-1875">
            <el-col :span="4">
                <h4>试题编号</h4>
            </el-col>
            <el-col :span="10">
                <p>{{dialogInfo.qid}}</p>
            </el-col>
            <el-col :span="4">
                <h4>题目类型</h4>
            </el-col>
            <el-col :span="6">
                <p>{{questionType(dialogInfo)}}</p>
            </el-col>
        </el-row>
        <el-row class="mt-1875">
            <el-col :span="4">
                <h4>创建时间</h4>
            </el-col>
            <el-col :span="10">
                <p>{{dateFormatter(dialogInfo)}}</p>
            </el-col>
            <el-col :span="4">
                <h4>创建者</h4>
            </el-col>
            <el-col :span="6">
                <p>{{dialogInfo.createBy}}</p>
            </el-col>
        </el-row>



        <el-row class="mt-1875" v-if="dialogInfo.context!==''">
            <el-col :span="4">
                <h4>题目解析</h4>
            </el-col>
            <el-col :span="20">
                <div class="answer-desc">
                    <p>{{dialogInfo.context}}</p>
                </div>
            </el-col>
        </el-row>
<!--        <el-row class="mt-30"><el-button type="primary" @click="cancelDialog" size="medium" class="ok-button">确认信息</el-button></el-row>-->


    </el-dialog>
</template>

<script>
    import dayjs from "dayjs";
    import {dateFormatter,questionType} from "@/utils/validate"
    export default {
        name: "questionInfo",
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
                questionType: questionType,
                dateFormatter
            };
        },
        methods: {
            //修改父组件传过来的值
            cancelDialog() {
                this.$emit("update:dialogVisible", false);
            },
            getOptions(info){
                let list1 = ["A:","B:","C:","D:","E:","F:"]
                let list = [info.optionA,info.optionB,info.optionC,info.optionD,info.optionE,info.optionF]
                let result = ""
                for (let i=0;i<list.length;i++){
                    if(list[i] !== ''){
                        result += list1[i]+list[i]+'\r\n'
                    }
                }
                return result;
            }

        }
    }
</script>

<style scoped>

    .form{
        background: #fff;
    }

</style>
