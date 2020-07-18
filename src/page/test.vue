<template>
    <div><a>接受参数页面</a>
    <a>参数：{{msg}}</a>

    </div>
</template>

<script>
    export default {
        name: "test",
        data(){
            return{
                msg:''

            }
        },
        mounted: function () {
            this.msg = this.$route.params.msgKey
            console.log(this.msg)
        }
    }
</script>

<style scoped>

</style>
