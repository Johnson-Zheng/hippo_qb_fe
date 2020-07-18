<template>
    <div><el-select
            v-model="svalue"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
            @change="showvalue">
        <el-option
                v-for="item in options"
                :key="item.cid"
                :label="item.courseName"
                :value="item.cid">
        </el-option>
    </el-select>
   </div>
</template>

<script>
    export default {
        name: "CourseQuery",
        data(){
            return{
                options: [],
                svalue: '',
                list: [],
                states:[],
                loading:true,
            }
        },
        methods:{
            remoteMethod(query) {
                if (query !== ''&&query.length>= 3&&query.length <= 10) {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        var _this = this
                        this.$axios.get('api/course/queryCourse?coursename='+query).then(resp => {
                            if (resp && resp.data.rspCode === '200') {
                                _this.list = resp.data.data
                                _this.options = resp.data.data
                                this.loading=false
                            }else {
                                this.$message("查询出错："+resp.data.data)
                                this.loading=false
                            }
                        })
                    }, 200);
                } else {
                    this.$message("请不要输入小于3个或大于10个字符")
                    this.options = [];
                    this.loading=false
                }
            }, showvalue(){
                this.$emit('courseid', this.svalue)
            }
        }

    }
</script>

<style scoped>

</style>
