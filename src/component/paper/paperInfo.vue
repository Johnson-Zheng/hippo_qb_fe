<template>
    <el-dialog title="试卷详情" :visible.sync="dialogVisible" :before-close="cancelDialog" >
        <el-row>
            <el-col :span="4">
                <h4>试卷标题</h4>
            </el-col>
            <el-col :span="20">
                <p>{{dialogInfo.name}}</p>
            </el-col>
        </el-row>
        <el-row class="mt-1875">
            <el-col :span="4">
                <h4>试题列表</h4>
            </el-col>
            <el-col :span="20">
                <p>{{dialogInfo.questionId}}</p>
            </el-col>

        </el-row>
        <el-row class="mt-1875">
            <el-col :span="4">
                <h4>创建时间</h4>
            </el-col>
            <el-col :span="8">
                <p>{{dateFormatter(dialogInfo)}}</p>
            </el-col>

        </el-row>
        <el-row class="mt-1875">
            <el-col :span="4">
                <h4>创建者</h4>
            </el-col>
            <el-col :span="2">
                <p>{{dialogInfo.createBy}}</p>
            </el-col>
            <el-col :span="4">
                <h4>单选分数</h4>
            </el-col>
            <el-col :span="2">
                <p>{{dialogInfo.sinscore}}/题</p>
            </el-col>
            <el-col :span="4">
                <h4>多选分数</h4>
            </el-col>
            <el-col :span="2">
                <p>{{dialogInfo.mulscore}}/题</p>
            </el-col>
            <el-col :span="4">
                <h4>主观分数</h4>
            </el-col>
            <el-col :span="2">
                <p>{{dialogInfo.subscore}}/题</p>
            </el-col>
        </el-row>


        <el-row class="mt-1875" v-if="dialogInfo.qucontent!==''">
            <el-col :span="6">
                <h4>题目列表</h4>
            </el-col>
            <el-col :span="24" class="mt-1875">
                <div class="answer-desc">
                <el-table :data="JSON.parse(dialogInfo.qucontent)" ref="qucontent"
                          :default-sort = "{prop: 'createTime', order: 'descending'}"
                          style="width: 100%"
                          :header-cell-style="{background:'#F5F7FA',fontWeight:'400'}"
                          height="300"
                          show-overflow-tooltip="true"
                fit>
                    <el-table-column
                            align="center"
                            prop="qid"
                            label="编号"
                            sortable
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="questionName"
                            label="题目"
                            sortable
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="answer"
                            label="答案"
                            :show-tooltip-when-overflow="true"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="course.courseName"
                            sortable
                            label="课程"
                            width="80"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            sortable
                            :formatter="questionType"
                            label="题目类型"
                            width="100"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            sortable
                            :formatter="dateFormatter"
                            label="添加时间"
                            width="150"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="createBy"
                            min-width="100"
                            sortable
                            label="创建者"
                            align="center"
                    >
                    </el-table-column>
                </el-table>
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
        name: "paperInfo",
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
            date(val) {
                // 过滤器过滤时间格式
                return dayjs(val).format("YYYY-MM-DD HH:mm");
            },

        }
    }
</script>

<style scoped>

    .form{
        background: #fff;
    }
    .answer-desc{
        border:unset!important;
    }

</style>
