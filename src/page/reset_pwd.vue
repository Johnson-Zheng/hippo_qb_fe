<template>

    <div id="container">
        <a>{{url}}</a>
        <img id="logo" src="../assets/logo/横向@2x.png">
        <img id="img1" src="../assets/images/login_img1.png">
        <div id="panel" class="panel_shadow">
            <div id="login-panel">
                <el-tabs v-model="tabSelect" align="center">
                    <el-tab-pane label="重置密码" name="first">
                        <el-form
                                label-position="left"
                                ref="resetform"
                                status-icon :model="reset_form" label-width="80px" class="mt-30">
                            <el-form-item label="新密码" prop="password" style="margin-top:40px">
                                <el-input v-model="reset_form.password" placeholder="请输入密码"/>
                            </el-form-item>
                            <el-form-item label="重复密码" prop="passwoed_2" style="margin-bottom:40px">
                                <el-input placeholder="请再一次输入密码" v-model="reset_form.password_2" />
                            </el-form-item>

                            <el-button type="primary" style="width:100%;" @click="resetpwd">重置密码</el-button>

                        </el-form>

                    </el-tab-pane>


                </el-tabs>
            </div>
            <copyright> </copyright>

        </div>
    </div>
</template>

<script>
    import Copyright from "@/component/footer/copyright";
    export default {
        name: "reset_pwd",
        component(){
            cop
        },
        data(){
            return{
                tabSelect:"first",
                url:'',
                name:'',
                reset_form: {
                    password: '',
                    password_2: '',
                },
            }
        },
        methods:{
            resetpwd() {
                        this.$axios.put('user/resetpwd',
                                {
                                    user_password:this.reset_form.password,
                                    username:this.url,
                                    name:this.name
                                }).then(resp => {
                            if (resp && resp.data.rspCode === '200') {
                                this.$message.success(resp.data.data)
                            }
                            else {
                                this.loading = false;
                                this.$message.warning(resp.data.data+",请重新尝试")
                            }
                        })
            },
        },
        mounted() {
            this.url=this.$route.query.url;
            this.name=this.$route.query.name;
        }
    }
</script>

<style scoped>

    #container{
        min-height: 100%;
    }
    #logo{
        position: absolute;
        left: 10vw;
        top:5vh;
        height:66px;
        object-fit: cover;
    }
    #img1{
        position: absolute;
        left: 10vw;
        top: 15vh;
        width: 711px;
        height:546px;
        object-fit: cover;
    }

    #panel{
        right: 9.5%;
        top:50%;
        transform: translateY(-50%);
        width:350px;
        position: absolute;
    }

    #login-panel >>> .el-tabs__item {
        width: 175px;
    }
    #login-panel >>> .el-tabs__item {
        width: 175px;
    }




</style>
