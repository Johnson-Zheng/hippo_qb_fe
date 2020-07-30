<template>
    <div>
        <div class="anchor">
            <p>1</p>
        </div>
        <div class="nav shadow ">
            <img v-if="role==='1'" class="logo" src="../../assets/logo/nav-logo-tea.png"/>
            <img v-if="role==='2'" class="logo" src="../../assets/logo/nav-logo-stu.png"/>
            <el-menu :default-active="path" class="menu hidden-sm-and-down"  mode="horizontal" router>
                <template v-for="(item, index) in nav_menu">
                    <el-menu-item :index = "item.path" :key = "index">
                        {{item.name}}
                    </el-menu-item>
                </template>
            </el-menu>
            <el-row class="user" type="flex" justify="end">
                <el-col :span="16">
                    <p class="nav-link">{{name}}</p>
                </el-col>
                <el-col :span="8">
                    <el-button class="logout" @click="logout" ><img class="logout-icon" src="../../assets/icon/注销.svg"/></el-button>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
    export default {
        name: "navigation",
        data(){
            return{
                path: '',
                nav_menu: [],
                tea_nav_menu: [
                    {
                        name:'首页',
                        path:'/tea_index',
                    },
                    {
                        name:'题库',
                        path:'/tea_question',
                    },
                    {
                        name:'试卷',
                        path:'/tea_paper',
                    },
                    {
                        name:'考试',
                        path:'/tea_exam',
                    },
                ],
                stu_nav_menu: [
                    {
                        name:'首页',
                        path:'/stu_index',
                    },
                    {
                        name:'考试',
                        path:'/stu_exam',
                    },
                ],
                name:'',
                role:'1'
            }
        },
        mounted(){
            this.getLogo()
            this.getName()
            this.routerChange()
        },
        methods: {
            routerChange(){
                this.path = this.$route.path
            },
            getLogo(){
                let role = window.localStorage.getItem('urole')
                this.role = role
                if(role==='1'){
                    this.nav_menu = this.tea_nav_menu
                }else if(role==='2'){
                    this.nav_menu = this.stu_nav_menu
                }
                this.path  = this.$route.path
            },
            getName(){
                if(window.localStorage.getItem('uname')){
                    this.name = window.localStorage.getItem('uname')
                }else{
                    this.name = 'user'
                }
            },
            logout(){
                window.localStorage.clear()
                window.sessionStorage.clear()
                this.$router.replace('/')
            }

        }
    }
</script>

<style scoped>
    .anchor{
        z-index: -99;
        position: relative;
        height: 80px;
        opacity: 0;
    }
    .nav{
        position:fixed;
        height: 80px;
        width:100%;
        background:white;
        top:0;
        left:0;
        z-index: 99;
        align-items: center;
        align-content: center;
        vertical-align: center;
        display: -webkit-flex;
    }
    .logo{
        position:absolute;
        left:5vw;
        line-height: 80px;
        height: 50px;

    }
    .menu{
        position: absolute;
        left:50%;
        transform: translateX(-50%);
        letter-spacing: 2px;
    }
    .nav >>> .el-menu.el-menu--horizontal{
        border-bottom:unset;
    }
    .nav >>> .el-menu-item{
        margin-right: 20px;
        font-size:14px

    }
    .nav >>> .el-menu--horizontal>.el-menu-item.is-active  {
        color:#1C94DB;
        font-weight: 500;
    }
    .nav-link{
        width: max-content;
        font-size:14px;
        font-weight:400;
        line-height:30px;
        color:rgba(136,136,136,1);
        opacity:1;
        text-decoration: none;
        text-align: right;
    }
    .logout{
        margin-left: 10px;
        font-size:30px;
        font-weight:400;
        line-height: 20px;
        color:rgba(136,136,136,1);
        opacity:1;
        text-decoration: none;
        border-radius: 15px;
        height: 30px;
        width: 30px;
        padding: 0;
    }
    .logout-icon{
        position: relative;
        height: 20px;
        object-fit:cover;
    }
    .user{
        position: absolute;
        right: 10vw;
        width: max-content;
    }

</style>