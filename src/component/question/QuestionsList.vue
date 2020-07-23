<template>
    <div>
        <el-dialog
                title="添加题目"
                :visible.sync="dialogFormVisible"
                @close="clear">
            <a>科目代码：{{cid}}</a>
            <el-radio-group v-model="type">
                <el-radio-button :label="1">单选题</el-radio-button>
                <el-radio-button :label="2">多选题</el-radio-button>
                <el-radio-button :label="3">主观题</el-radio-button>
            </el-radio-group>
            <el-button icon="el-icon-search" @click="getquestionlist" circle></el-button>
    <el-table
            ref="multipleTable"
            :data="tableData"
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
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "QuestionsList",
        data(){
            return{

                dialogFormVisible: false,
                tableData: [],
                multipleSelection: [],
                cid:'1',
                type:'1',
            }
        },
        mounted () {
            this.loading = true
            this.getquestionlist(1,1)
        },
        methods: {
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
                    this.$axios.get('question/qlistbytypecid?cid='+this.cid+'&type='+this.type).then(resp => {
                        if (resp && resp.data.rspCode === '200') {
                            _this.tableData = resp.data.data
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
            addquestion(){
                this.$emit('questuonlist', this.multipleSelection);
                this.dialogFormVisible = false
            }
        }
    }
</script>

<style scoped>

</style>
