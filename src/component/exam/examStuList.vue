<template>
    <el-dialog title="考生列表" :visible.sync="stuListVisible" :before-close="cancelDialog" >
        <el-row>
            <el-col :span="4">
                <h4>考场编号</h4>
            </el-col>
            <el-col :span="20">
                <p>{{kid}}</p>
            </el-col>
        </el-row>
        <el-row v-if='stuList.length!==0' class="mt-1875">
            <el-col :span="4">
                <h4>考号列表</h4>
            </el-col>
        </el-row>
        <div v-if='stuList.length!==0' class="stu-list mt-1875">
            <el-row :gutter="10" >
                <template  v-for="i in stuList">
                    <el-col class="stu-id" :span="6" align="center">
                        <el-tag style="width: 100%">{{i}}</el-tag>
                    </el-col>
                </template>
            </el-row>
        </div>

        <div class="addStu mt-1875">
            <el-form :model="addStuForm" ref="addStuForm" label-position="left" label-width="80px">
                <el-row>
                    <el-col :span="18">
                        <el-form-item label="添加考生">
                            <el-input v-model="addStuForm.uno" placeholder="请输入考生考号"> </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-button style="width: 100%;" type="primary" plain @click="addStuHandler">添加</el-button>
                    </el-col>
                </el-row>

            </el-form>
        </div>

    </el-dialog>
</template>

<script>
    export default {
        name: "examStuList",
        props: {
            stuListVisible: {
                type: Boolean,
                default: false
            },
            stuList: {
                type: Array,
                default: []
            },
            kid: {
                type: Number,
                default: 0
            }

        },
        data() {
            return {
                addStuForm: {
                    uno: '',
                },
            };
        },
        methods: {
            //修改父组件传过来的值
            cancelDialog() {
                this.$emit("update:stuListVisible", false);
            },
            addStuHandler() {
                if (this.checkUno()) {
                    this.$axios.post('exroom/putsingleper?exid='+this.kid+"&uno="+this.addStuForm.uno).then(resp => {
                        if (resp && resp.data.rspCode === '200') {
                            this.$message.success("考生添加成功")
                            this.stuList.push(this.addStuForm.uno)
                            this.addStuForm.uno=''
                        } else {
                            this.loading = false;
                            this.$message.warning(resp.data.data + ",请重新尝试")
                        }
                    }).catch(error => {
                        let message = error.message
                        this.$message({
                            message: message,
                            type: 'error'
                        });
                    });
                }else{
                    this.$message({
                        message: '考号不能为空',
                        type: 'warning'
                    });
                }
            },
            checkUno(){
                return (this.addStuForm.uno!=='')
            },
        },
    }
</script>

<style scoped>
    .stu-list{
        padding: 10px;
        background: #fafafa;
        border-radius: 5px;
        overflow-y:scroll;
        height: max-content;
        max-height: 200px;
    }
    .stu-id{
        margin-bottom: 5px;
    }
    .addStu >>> .el-input__inner{
        border-radius:  5px 0 0 5px ;
    }
    .addStu >>> .el-button{
        border-radius:  0 5px 5px 0;
    }
    .addStu >>> .el-form-item{
        margin-bottom: 0;
    }
</style>
