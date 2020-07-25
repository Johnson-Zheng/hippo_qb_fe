<template>
    <div id="container">
        <img id="logo" src="../assets/logo/横向@2x.png">
        <img id="img1" src="../assets/images/login_img1.png">
        <div id="panel" class="panel_shadow">
            <div id="login-panel">
                <el-tabs v-model="tabSelect" align="center">
                    <el-tab-pane label="重置密码" name="first">
                        <el-form
                                label-position="left"
                                ref="resetform"
                                status-icon :model="login_form" label-width="80px" class="mt-30">
                            <el-form-item label="用户名" prop="username" style="margin-top:40px">
                                <el-input v-model="login_form.username" placeholder="请输入用户名"/>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email" style="margin-bottom:40px">
                                <el-input placeholder="请输入邮箱" v-model="login_form.email" />
                            </el-form-item>
                            <el-button type="primary" style="width:100%;" @click="resetpwd">重置密码</el-button>
                        </el-form>
                    </el-tab-pane>

                </el-tabs>
                <copyright> </copyright>

            </div>
        </div>
    </div>
</template>

<script>
    import Copyright from "@/component/footer/copyright";

    export default {
        name: "reset_password",
        components: {
            Copyright
        },

        data() {
            return {

                tabSelect:"first",
                remember_me : true,
                login_form: {
                    username: '',
                    email: '',
                },
            }
        },
        methods:{

            //发送邮件
            resetpwd() {
                        this.$axios
                            .post('user/resetpassword',
                                {
                                    username:this.login_form.username,
                                    email:this.login_form.email
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
            //注册用户

        }
    };
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
