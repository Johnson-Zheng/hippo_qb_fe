<template>
<div class="container">
    <navigation></navigation>
    <div class="table-panel panel_shadow">
        <h2>试题列表</h2>
        <el-table
                :data="tableData"
                :default-sort = "{prop: 'qid', order: 'descending'}"
                style="width: 100%"
                stripe
                height="480"
                show-overflow-tooltip="true"
                fit="true">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="qid"
                    label="编号"
                    sortable
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="questionName"
                    label="题目"
                    sortable
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="answer"
                    label="答案"
                    sortable
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="cid"
                    sortable
                    label="科目"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="type"
                    sortable
                    label="题目类型"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    sortable
                    label="添加时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="difficult"
                    sortable
                    label="题目难度"
                    width="180">
            </el-table-column>
            <el-table-column
                    fixed="right"
                label="操作"
                width="120">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情></el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
    <copyright></copyright>
</div>
</template>

<script>
    import navigation from "@/component/header/navigation";
    import Copyright from "@/component/footer/copyright";
    export default {
        name: "tea_question",
        components:{
            Copyright,
            navigation
        },
        data() {
            return {
                tableData: [{
                    qid: '1',
                    title: '1+1=',
                    answer: 'B',
                    cid:'一年级数学',
                    type:'',
                    createTime:'200',
                    difficult:'普通'

                }]
            }
        }
    }
</script>

<style scoped>
    .table-panel{
        position: relative;
        margin:30px auto;
        width: 88%;
        text-align:left;
    }
</style>