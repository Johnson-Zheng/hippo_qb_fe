<template>
    <div><el-select
            v-model="paper"
            value-key="pid"
            filterable
            remote
            reserve-keyword
            placeholder="试卷名称(3-5个字符)"
            :remote-method="remoteMethod"
            no-data-text="系统暂无此试卷"
            loading-text="正在检索试卷"
            :loading="loading"
            @change="showvalue">
        <el-option
                v-for="item in options"
                :key="item.cid"
                :label="item.name"
                :value="item">
        </el-option>
    </el-select>

    </div>
</template>
<script>
    export default {
        name: "PaperQuery",
        data(){
            return{
                options: [],
                paper:{},
                list: [],
                states:[],
                loading:true,
                flag:true
            }
        },
        methods:{
            remoteMethod(query) {
                if (query !== ''&&query.length>= 3&&query.length <= 10&&this.flag===true) {
                    this.loading = true;
                    this.flag=false
                    var time = 3
                    setTimeout(() => {
                        this.loading = false;
                        var _this = this
                        this.$axios.get('paper/queryPaper?papername='+query).then(resp => {
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
                    if(this.flag===false){this.$message("请求过于频繁、请稍后再试")}
                    this.options = [];
                    this.loading=true
                }
            }, showvalue(){
                this.$emit('paperid', this.paper)
            }
        }
    }
</script>

<style scoped>

</style>
