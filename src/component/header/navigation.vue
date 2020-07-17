<template>
    <div class="nav shadow">
        <img class="logo" src="../../assets/logo/nav-logo-tea.png"/>
        <el-menu :default-active="menuIndex" class="menu" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">题库</el-menu-item>
            <el-menu-item index="3">试卷</el-menu-item>
            <el-menu-item index="4">考试</el-menu-item>
        </el-menu>
        <router-link class="nav-link" to="login">登陆</router-link>
    </div>
</template>

<script>
    export default {
        name: "navigation",
        data(){
            return{
                menuIndex:"2"
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .nav{
        position:relative;
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
        position: absolute;
        right: 15vw;
        font-size:14px;
        font-weight:400;
        line-height:17px;
        color:rgba(136,136,136,1);
        opacity:1;
        text-decoration: none;
    }
</style>