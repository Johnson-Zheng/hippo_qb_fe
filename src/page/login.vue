<template>
    <div id="container">
        <img id="logo" src="../assets/logo/横向@2x.png">
        <img id="img1" src="../assets/images/login_img1.png">
        <div id="panel" class="panel_shadow">
            <div id="login-panel">
                <el-tabs v-model="tabSelect" align="center">
                    <el-tab-pane label="登陆" name="first">
                        <el-form
                                label-position="left"
                                ref="form"
                                :rules="login_rules"
                                status-icon :model="login_form" label-width="80px" class="mt-30">
                            <el-form-item label="用户名" prop="username" style="margin-top:40px">
                                <el-input v-model="login_form.username" placeholder="请输入用户名"/>
                            </el-form-item>
                            <el-form-item label="密码" prop="user_password" style="margin-bottom:40px">
                                <el-input placeholder="请输入密码" v-model="login_form.user_password" show-password/>
                            </el-form-item>
                            <el-row class="mt-1875">
                                <el-col :span="6">
                                    <el-checkbox v-model="remember_me">记住密码</el-checkbox>
                                </el-col>
                                <el-col :span="12">
                                    <div style="width:100%;opacity: 0">.</div>
                                </el-col>
                                <el-col :span="6">
                                    <router-link to='reset_password' class="forget">忘记密码？</router-link>
                                </el-col>
                            </el-row>

                            <el-col :span="24" class="mt-30"><el-button type="primary" style="width:100%;" @click="user_login(login_form)" :loading='loginLoading'>登陆</el-button></el-col>

                        </el-form>

                    </el-tab-pane>
                    <el-tab-pane label="注册" name="second">
                        <el-form label-position="left"
                                 ref="register_form"
                                 :rules="register_rules"
                                 status-icon :model="register_form" label-width="80px" class="mt-30">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="register_form.username" placeholder="请输入用户名"/>
                            </el-form-item>
                            <el-form-item label="密码" prop="user_password">
                                <el-input placeholder="请输入密码" v-model="register_form.user_password" show-password/>
                            </el-form-item>
                            <el-form-item label="重复密码" prop="password2">
                                <el-input placeholder="请再次输入密码" v-model="register_form.password2" show-password/>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input placeholder="请输入您的邮箱" v-model="register_form.email"/>
                            </el-form-item>
                            <el-form-item label="验证码" prop="code" >
                                <el-input style="border-radius: 4px 0 0 4px;" placeholder="输入验证码" v-model="register_au_form.code"/>
                                <el-button type="primary" plain style="position:absolute;right:0;" :disabled='isDisabled' @click="send_code">{{buttonText}}</el-button>
                            </el-form-item>
                            <el-form-item label="身份">
                                <el-select v-model="register_form.role" placeholder=请选择身份 style="width: 100%">
                                    <el-option
                                            v-for="item in roles"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="学/工号" prop="uno">
                                <el-input placeholder="请输入您的学号/工号" v-model="register_form.uno"/>
                            </el-form-item>

                            <el-col :span="24"><el-button type="primary" style="width:100%;" @click="submitregister">注册</el-button></el-col>
                        </el-form>
                    </el-tab-pane>

                </el-tabs>
            </div>
            <copyright style="margin-bottom: 0;"> </copyright>

        </div>
    </div>
</template>

<script>
    import {isEmail,findValue} from '@/utils/validate'
    import {mapMutations} from 'vuex'
    import axios from 'axios'
    import Copyright from "@/component/footer/copyright";

    export default {
        name: "login",
        components: {
            Copyright
        },
        created(){
            this.clearCache()
        },
        data() {
            let checkName = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error('用户名不能为空'))
                } else {
                    callback()
                }
            }
            let validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('邮箱不能为空'))
                }else if(!isEmail(value)) {
                    callback(new Error('邮箱格式错误'))
                }else {
                    callback()
                }
            }
            let validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"))
                } else {
                    callback()
                }
            }
            let validatePass2 = (rule, value, callback) => {
                var pass1 = this.register_form.user_password
                if(pass1){
                    if (value==='') {
                        callback(new Error("请再次输入密码"))
                    }else if (value!==pass1) {
                        callback(new Error("两次输入密码不一致!"))
                    }else {
                        callback();
                    }
                }else{
                    callback(new Error("请输入您的密码"))
                }

            }
            let checkUno = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error('请输入学/工号'))
                } else {
                    callback()
                }
            }
            return {
                loginLoading:false,
                tabSelect:"first",
                remember_me : true,
                login_form: {
                    username: '',
                    user_password: '',
                },
                login_rules: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'change' },
                        // { min: 1, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    user_password: [
                        { required: true, message: '密码不能为空', trigger: 'change' },
                        // { min: 1, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]

                },

                register_au_form:{
                    password2:'',
                    code:'',
                },

                register_form:{
                    username:'',
                    user_password:'',
                    password2:'',
                    email:'',
                    role:1,
                    enabled:true,
                    uno:'',
                    phone:' '
                },
                roles: [{
                    value: 1,
                    label: '老师'
                }, {
                    value: 2,
                    label: '学生'
                }],

                register_rules: {
                    username: [{required:true, validator: checkName, trigger: 'blur' }],
                    user_password: [{ required:true,validator: validatePass, trigger: 'blur' }],
                    password2: [{ required:true,validator: validatePass2, trigger: 'blur' }],
                    email: [{ required:true, validator: validateEmail, trigger: 'blur' }],
                    uno:[{ required:true,validator: checkUno, trigger: 'blur' }],
                },
                buttonText: '获取验证码',
                isDisabled: false, // 是否禁止点击发送验证码按钮
                flag: true

            }
        },
        methods:{
            ...mapMutations(['changeLogin']),
            //登陆表单提交及验证
            user_login(form_name){
                this.loginLoading = true
                var _this = this
                let user_name = this.login_form.username
                let user_password = this.login_form.user_password
                axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
                axios.defaults.withCredentials=false
                if(user_name && user_password){
                    axios.post('login', JSON.stringify(this.login_form),
                    ).then(res => {
                        let resdata = res.data
                        let code = resdata.rspCode
                        let userdata = resdata.data

                        if(resdata.rspCode==='200'){
                            this.$message({
                                duration:2000,
                                showClose:true,
                                message: '登陆成功',
                                type: 'success'
                            });
                            let username = userdata.username
                            let uid = userdata.uid
                            let uno = userdata.uno
                            let role = userdata.role[0].rid
                            window.localStorage.setItem('uname', username)
                            window.localStorage.setItem('urole', role)
                            _this.$store.commit('login', userdata.token)
                            if(role===1){
                                this.$router.push('/tea_index')
                            }else if(role===2){
                                this.$router.push('/stu_index')
                            }

                        }else{
                            let errorMessage = "ERROR:"+code+" "+userdata
                            this.$message({
                                message: errorMessage,
                                type:'error'
                            });
                            this.loginLoading=false
                        }

                    }).catch(error => {
                        let message = error.message
                        this.$message.error(message)
                        this.loginLoading=false
                    });
                }else if(user_name==='' || user_password===''){
                    this.$message({
                        message: '用户名或密码不能为空',
                        type: 'warning'
                    });
                }

            },
            //发送邮件
            send_code(){
                let email = this.register_form.email
                let isemail = isEmail(email)

                if (email && isemail) {
                    axios.post('user/sendcheckcode?to='+email,
                    ).then(res => {
                        let code = res.data.rspCode
                        let message = res.data.rspMsg
                        if(code==='200'){
                            this.$message({
                                message: "发送成功",
                                type:'success'
                            })
                            let time = 60
                            this.buttonText = '已发送'
                            this.isDisabled = true
                            if (this.flag) {
                                this.flag = false;
                                let timer = setInterval(() => {
                                    time--;
                                    this.buttonText = time + ' 秒'
                                    if (time === 0) {
                                        clearInterval(timer);
                                        this.buttonText = '重新获取'
                                        this.isDisabled = false
                                        this.flag = true;
                                    }
                                }, 1000)
                            }
                        }else{
                            let errorMessage = "ERROR:"+code+" "+message
                            this.$message({
                                message: errorMessage,
                                type:'error'
                            });
                        }
                    }).catch(error => {
                        let message = error.message
                        this.$message.error(message)
                        console.log(error)
                    });
                }else if(email===""){
                    this.$message({
                        message: '邮箱不能为空',
                        type: 'warning'
                    });

                } else if(!isemail){
                    this.$message({
                        message: '邮箱格式错误',
                        type: 'warning'
                    });
                }
            },
            submitregister() {
                this.$refs.register_form.validate((valid) => {
                    if (valid) {
                        this.$axios
                            .post('register?code='+this.register_au_form.code, this.register_form).then(resp => {
                            if (resp && resp.data.rspCode === '200') {
                                this.$message.success(resp.data.data+"注册成功")
                                this.tabSelect = 'first'
                                this.login_form.username  = this.register_form.username
                                this.login_form.user_password = this.register_form.user_password

                            }
                            else {
                                this.loading = false;
                                this.$message.warning(resp.data.data+",请重新尝试")
                            }
                        })
                    } else {
                        this.$message.error('请核验表单信息是否遗漏');
                        return false;
                    }
                });
            },
            clearCache(){
                window.sessionStorage.clear()
                window.localStorage.clear()
            }

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

