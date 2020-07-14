<template>
    <div id="container">
        <img id="logo" src="../assets/logo/横向@2x.png">
        <img id="img1" src="../assets/images/login_img1.png">
        <div id="panel" class="panel_shadow">
            <div id="login-panel">
                <el-tabs value="first">
                    <el-tab-pane label="登陆" name="first">
                        <el-form label-position="left" ref="form" :rules="login_rules" status-icon :model="login_form" label-width="80px" class="mt-30">
                            <el-form-item label="用户名" prop="user">
                                <el-input v-model="login_form.user" placeholder="请输入用户名"/>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input placeholder="请输入密码" v-model="login_form.password" show-password/>
                            </el-form-item>
                            <el-row class="mt-1875">
                                <el-col :span="6">
                                    <el-checkbox v-model="login_form.remember_me">记住密码</el-checkbox>
                                </el-col>
                                <el-col :span="12">
                                    <div style="width:100%;opacity: 0">.</div>
                                </el-col>
                                <el-col :span="6">
                                    <router-link to='reset_password' class="forget">忘记密码？</router-link>
                                </el-col>
                            </el-row>

                            <el-col :span="24" class="mt-30"><el-button type="primary" style="width:100%;">登陆</el-button></el-col>

                        </el-form>

                    </el-tab-pane>
                    <el-tab-pane label="注册" name="second">
                        <el-form label-position="left" ref="form" :rules="register_rules" status-icon :model="register_form" label-width="80px" class="mt-30">
                            <el-form-item label="用户名" prop="user">
                                <el-input v-model="register_form.user" placeholder="请输入用户名"/>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input placeholder="请输入密码" v-model="register_form.password" show-password/>
                            </el-form-item>
                            <el-form-item label="重复密码" prop="password2">
                                <el-input placeholder="请再次输入密码" v-model="register_form.password2" show-password/>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input placeholder="请输入您的邮箱" v-model="register_form.email"/>
                            </el-form-item>
                            <el-form-item label="验证码" prop="code">
                                <el-input style="border-radius: 4px 0 0 4px;"  placeholder="输入验证码" v-model="register_form.code"/>
                                    <el-button type="primary" plain style="position:absolute;right:0;" :disabled='isDisabled' @click="send_code">{{buttonText}}</el-button>
                            </el-form-item>
                            <el-form-item label="身份" prop="role">
                                <el-select v-model="value" placeholder=请选择身份 style="width: 100%">
                                    <el-option
                                            v-for="item in roles"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-col :span="24"><el-button type="primary" style="width:100%;">注册</el-button></el-col>
                        </el-form>
                    </el-tab-pane>

                </el-tabs>
            </div>
        </div>
        <p id="copyright">©2020 河马题库开发小组 软件sy1701<br>郑文伟、顾晓健、肖俊杰、潘喜睿</p>
    </div>
</template>

<script>
    import {isEmail} from '@/utils/validate'
    export default {
        name: "login",
        componets:{

        },
        data() {
            let checkName = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error('请输入用户名'))
                } else {
                    callback()
                }
            }
            let validateEmail = (rule, value, callback) => {
                if (!isEmail(value)) {
                    callback(new Error('邮箱格式错误'))
                } else {
                    callback()
                }
            }
            let checkSmscode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'))
                } else {
                    callback()
                }
            }
            let validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"))
                } else {
                    if (this.register_form.password2 !== "") {
                        this.$refs.register_form.validateField("checkPass");
                    }
                    callback()
                }
            }
            let validatePass2 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.register_form.password) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            return {
                login_form: {
                    user: '',
                    password: '',
                    remember_me: true,
                },
                login_rules: {
                    user: [
                        { required: true, message: '用户名不能为空', trigger: 'change' },
                        // { min: 1, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'change' },
                        // { min: 1, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]

                },

                register_form:{
                    user:'',
                    password:'',
                    password2:'',
                    email:'',
                    code:'',
                    role:'',
                },
                roles: [{
                    value: '角色1',
                    label: '老师'
                }, {
                    value: '角色2',
                    label: '学生'
                }],
                value: '角色2',

                register_rules: {
                    user: [{ required:true,message:"用户名不能为空",trigger:"blur"},{validator: checkName, trigger: 'change' }],
                    password: [{ required:true,message:"密码不能为空",trigger:"blur"},{validator: validatePass, trigger: 'change' }],
                    password2: [{ required:true,message:"重复密码不能为空",trigger:"blur"},{validator: validatePass2, trigger: 'change' }],
                    email: [{ required:true, message:'邮箱不能为空', trigger: 'change'}, {validator: validateEmail, trigger: 'change' }],
                    code: [{ required:true,message:"验证码不能为空",trigger:"blur"},{validator: checkSmscode, trigger: 'change' }],


                },
                buttonText: '获取验证码',
                isDisabled: false, // 是否禁止点击发送验证码按钮
                flag: true

            }
        },
        methods:{
            send_code(){
                let email = this.register_form.email
                let isemail = isEmail(email)

                if (email && isemail) {
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
                } else if(email===""){
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
    #copyright{
        position:absolute;
        font-size:12px;
        bottom:2vh;
        left: 50%;
        transform: translateX(-50%);

        font-weight:400;
        line-height:21px;
        color:rgba(188,188,188,1);
        opacity:1;
    }
    #panel{
        right: 10vw;
        top:20vh;
        width:350px;
        position: absolute;

    }

    #login-panel >>> .el-tabs__item {
        width: 175px;
    }
    #login-panel >>> .el-tabs__item {
        width: 175px;
    }

    .forget{
        font-size:14px;
        font-weight:400;
        line-height:17px;
        color:rgba(136,136,136,1);
        opacity:1;
        text-decoration: none;
    }


</style>

