<template>
    <el-dialog title="考试详情" :visible.sync="dialogVisible" :before-close="cancelDialog" >
        <el-row>
            <el-col :span="4">
                <h4>考试编号</h4>
            </el-col>
            <el-col :span="8">
                <p>{{dialogInfo.kid}}</p>
            </el-col>
            <el-col :span="4">
                <h4>试卷编号</h4>
            </el-col>
            <el-col :span="8">
                <p>{{dialogInfo.pid}}</p>
            </el-col>
        </el-row>

        <el-row class="mt-1875">
            <el-col :span="4">
                <h4>考试标题</h4>
            </el-col>
            <el-col :span="20">
                <p>{{dialogInfo.name}}</p>
            </el-col>
        </el-row>

        <el-row class="mt-1875">
            <el-col :span="4">
                <h4>开始时间</h4>
            </el-col>
            <el-col :span="8">
                <p>{{startDateFormatter(dialogInfo)}}</p>
            </el-col>
            <el-col :span="4">
                <h4>截止时间</h4>
            </el-col>
            <el-col :span="8">
                <p>{{deadlineDateFormatter(dialogInfo)}}</p>
            </el-col>
        </el-row>

        <el-row class="mt-1875">
            <el-col :span="4">
                <h4>考试时长</h4>
            </el-col>
            <el-col :span="8">
                <p>{{dialogInfo.time}}</p>
            </el-col>
            <el-col :span="4">
                <h4>可考次数</h4>
            </el-col>
            <el-col :span="8">
                <p>{{dialogInfo.allowtimes}}</p>
            </el-col>
        </el-row>

        <el-row class="mt-1875">
            <el-col :span="4">
                <h4>创建时间</h4>
            </el-col>
            <el-col :span="8">
                <p>{{dateFormatter(dialogInfo)}}</p>
            </el-col>
            <el-col :span="4">
                <h4>创建者</h4>
            </el-col>
            <el-col :span="8">
                <p>{{dialogInfo.createBy}}</p>
            </el-col>
        </el-row>

        <el-row class="mt-1875">
            <el-col :span="4">
                <h4>可参与人员</h4>
            </el-col>
            <el-col :span="8">
                <p>{{groupTypeFormatter(dialogInfo)}}</p>
            </el-col>
            <el-col :span="4">
                <h4>防作弊</h4>
            </el-col>
            <el-col :span="8">
                <p>{{securityFormatter(dialogInfo)}}</p>
            </el-col>
        </el-row>

    </el-dialog>
</template>

<script>
    import {dateFormatter,startDateFormatter,deadlineDateFormatter,groupTypeFormatter,securityFormatter} from "@/utils/validate"
    export default {
        name: "examInfo",
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
                dateFormatter,
                groupTypeFormatter,
                startDateFormatter,
                deadlineDateFormatter,
                securityFormatter
            };
        },
        methods: {
            //修改父组件传过来的值
            cancelDialog() {
                this.$emit("update:dialogVisible", false);
            },

        }
    }
</script>

<style scoped>

</style>
