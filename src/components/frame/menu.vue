<!--系统管理员后台---Vanilla-->
<template>
  <el-row  class="tac  firstmenu" style="height:100%;" >
    <el-col style="height:100%;">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :router="true"
        text-color="#fff"
        @select="handleSelect"
        style="height:100%;">
        <el-submenu index="教师管理" style="background-color: #42485b"  v-if="admin.role===0">
          <template slot="title">
            <p style="color:#ffffff;font-size: 14px; ">
              <i class="icon-jiaoshi" style="width: 18px;height: 18px"></i>
<!--              <img src="../../assets/basic_msg.png" style="width: 16px;height: 16px"/>-->
              &nbsp;&nbsp;教师管理</p>
          </template>
          <el-menu-item index="教师列表" route="admin">教师列表</el-menu-item>
        </el-submenu>
        <el-submenu index="学生管理" style="background-color: #42485b" >
          <template slot="title">
            <p style="color:#ffffff;font-size: 14px; ">
              <i class="icon-xueshengguanli" style="width: 18px;height: 18px"></i>
<!--              <img src="../../assets/basic_msg.png" style="width: 16px;height: 16px"/>-->
              &nbsp;&nbsp;学生管理</p>
          </template>
          <el-menu-item index="学生列表" route="student">学生列表</el-menu-item>
          <el-menu-item index="上传学生信息" route="studentinfoUpload">上传学生信息</el-menu-item>
        </el-submenu>
        <el-submenu index="指标管理" style="background-color: #42485b" >
          <template slot="title">
            <p style="color:#ffffff;font-size: 14px; ">
              <i class="icon-tiku" style="width: 18px;height: 18px"></i>
<!--              <img src="../../assets/basic_msg.png" style="width: 16px;height: 16px"/>-->
              &nbsp;&nbsp;指标管理</p>
          </template>
          <el-menu-item index="题库列表" route="bankSingleChoiceQue">题库列表</el-menu-item>
<!--          <el-submenu index="双选题管理" style="background-color: #263238" >-->
<!--            <template slot="title">-->
<!--              <p style="color:#ffffff;font-size: 14px; ">-->
<!--                <i class="icon-xinwen" style="width: 18px;height: 18px"></i>-->
<!--                &lt;!&ndash;              <img src="../../assets/basic_msg.png" style="width: 16px;height: 16px"/>&ndash;&gt;-->
<!--                &nbsp;&nbsp;双选题管理</p>-->
<!--            </template>-->
<!--            <el-menu-item index="双选题列表" route="bankMultipleChoiceQue">双选题列表</el-menu-item>-->
<!--            <el-menu-item index="上传双选题信息" route="bankMultipleChoiceQueUpload">上传双选题信息</el-menu-item>-->
<!--          </el-submenu>-->
        </el-submenu>
        <el-submenu index="试卷管理" style="background-color: #42485b" >
          <template slot="title">
            <p style="color:#ffffff;font-size: 14px; ">
              <i class="icon-wenjuan" style="width: 18px;height: 18px"></i>
              <!--              <img src="../../assets/basic_msg.png" style="width: 16px;height: 16px"/>-->
              &nbsp;&nbsp;试卷管理</p>
          </template>
          <el-menu-item index="试卷列表" route="paper">试卷列表</el-menu-item>
          <el-menu-item index="添加试卷" route="paperAdd">添加试卷</el-menu-item>
<!--          <el-menu-item index="上传学生信息" route="studentinfoUpload">上传学生信息</el-menu-item>-->
        </el-submenu>

      </el-menu>

    </el-col>
  </el-row>
</template>

<script>
  import store from '@/vuex/store'
  import {mapMutations} from 'vuex'
  export default {
    name:'mymenu',
    data () {
      return {
        admin:[]
        // user:[]
      }
    },
    methods: {
      ...mapMutations(['SET_MENU']),
      handleSelect(key, keyPath) {
        this.SET_MENU(keyPath);
      },
      //加载用户
      loadUser(){
        var list = JSON.parse(localStorage.getItem("admin") || '[]');
        this.admin = list;
        console.log(this.admin);
      },
    },
    created(){
      this.loadUser();
    },
    store
  }
</script>
<style>
  .firstmenu .el-submenu__title:hover {
    padding-left:23px !important ;
  }

  .el-submenu__title{
    color:  #ffffff!important;
  }
  .el-submenu__title:hover {
    background-color:  #263238 !important;
  }

</style>

<style scoped>
  /*导航颜色样式*/
  .el-menu-item {
    color: #ffffff;
    background-color: #263238 !important;
  }
  .el-menu-item:hover {
    background-color:#333740!important;
    color: #009688;
    border-left: 3px solid #009688;
  }
  .el-menu{
    border-right: 0;
    background-color: #333744;
  }
  .el-menu--inline .el-menu-item:hover{
    padding-left:43px !important;
  }
</style>
