<template>
    <div>
        <el-select
            v-model="course"
            value-key="cid"
            filterable
            remote
            reserve-keyword
            placeholder="课程名称(3-5个字符)"
            :remote-method="remoteMethod"
            no-data-text="系统暂无此课程"
            loading-text="正在检索课程"
            :loading="loading"
            @change="showvalue">
            <el-option
                    v-for="item in options"
                    :key="item.cid"
                    :label="item.courseName"
                    :value="item">
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
                course:'',
                list: [],
                states:[],
                loading:true,
                flag:true
            }
        },
        methods:{
            remoteMethod(query) {
                if (query !== ''&&query.length>= 3&&query.length <= 10) {
                    this.loading = true;
                    this.flag=false
                    var time = 3

                    setTimeout(() => {
                        this.loading = false;
                        var _this = this
                        this.$axios.get('course/queryCourse?coursename='+query).then(resp => {
                            if (resp && resp.data.rspCode === '200') {
                                _this.list = resp.data.data
                                _this.options = resp.data.data
                                this.loading=false
                            }else {
                                this.$message("查询出错："+resp.data.data)
                                this.loading=false
                            }
                        })
                    }, 300);
                    var timer = setInterval(() => {
                        time--;
                        if (time === 0) {
                            clearInterval(timer);
                            this.flag=true
                        }
                    }, 1000)
                } else {
                    this.$message("请不要输入小于3个或大于10个字符或频繁请求")
                    this.options = [];
                    this.loading=false
                }
            }, showvalue(){
                this.$emit('courseid', this.course)
            }
        }

    }
</script>

<style scoped>

</style>
