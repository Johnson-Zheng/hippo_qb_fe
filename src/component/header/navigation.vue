<template>
    <div>
        <div class="anchor">
            <p>1</p>
        </div>
        <div class="nav shadow ">
            <img class="logo" src="../../assets/logo/nav-logo-tea.png"/>
            <el-menu :default-active="path" class="menu hidden-sm-and-down"  mode="horizontal" router>
                <template v-for="(item, index) in nav_menu_data">
                    <el-menu-item :index = "item.path" :key = "index">
                        {{item.nameZh}}
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
                nav_menu_data: [],
                name:''
            }
        },
        created () {
            this.getName()
            this.onRouteChanged()
            this.showMenu()
        },
        methods: {
            onRouteChanged () {
                let that = this
                that.path  = that.$route.path
            },
            showMenu(){
                if(window.sessionStorage.getItem('navList')!==null){
                    this.nav_menu_data = JSON.parse(window.sessionStorage.getItem('navList'))
                }else{
                    this.getMenu()
                }
            },
            getMenu(){
                this.$axios.get('menu').then(res=>{
                    if(res && res.data.rspCode ==='200'){
                        this.nav_menu_data = res.data.data
                        window.sessionStorage.setItem('navList',JSON.stringify(this.nav_menu_data))
                        this.path = this.nav_menu_data[0]['path']
                        if(this.path==='/stu_index'){
                            this.$router.replace('/stu_index')
                        }
                    }
                }).catch(error => {
                    let message = error.message
                    this.$message.error(message)

                });
            },
            getName(){
                if(window.localStorage.getItem('username').length <= 30){
                    this.name = window.localStorage.getItem('username')
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