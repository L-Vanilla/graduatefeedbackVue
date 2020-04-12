<!--系统管理员登录--Vanilla-->
<template>
  <div class="main">

    <form class="form">

      <div class="form__cover"></div>
      <div class="form__loader">
        <div class="spinner active">
          <svg class="spinner__circular" viewBox="25 25 50 50">
            <circle class="spinner__path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"></circle>
          </svg>
        </div>
      </div>

      <div class="form__content">
        <el-row>
          <el-col :span="12">
            <el-button type="text" style="float: left; font-size: 15px;color:#d9eeff "  icon="el-icon-back" size="medium" @click="home()">去首页</el-button>
          </el-col>
        </el-row>
        <h2 style="color: #d9eeff">老人健康管理与跟踪系统</h2>
        <h2 style="color: #d9eeff">后台登录</h2>
        <div class="styled-input">
          <input type="text" class="styled-input__input" v-model="loginForm.name" placeholder="请输入账号" required></input>
          <!--<div class="styled-input__placeholder"> <span class="styled-input__placeholder-text">Username</span> </div>-->
          <!--<div class="styled-input__circle"></div>-->
        </div>
        <div class="styled-input">
          <input type="password" class="styled-input__input" v-model="loginForm.password" placeholder="请输入密码" required/>
          <!--<div class="styled-input__placeholder"> <span class="styled-input__placeholder-text">Password</span> </div>-->
          <!--<div class="styled-input__circle"></div>-->
        </div>
        <button type="button" class="styled-button" style="background-color: #8fb3b4;color: #d9eeff" @click="adminLogin()"> <span class="styled-button__real-text-holder"> <span class="styled-button__real-text">登录</span> <span class="styled-button__moving-block face"> <span class="styled-button__text-holder"> <span class="styled-button__text">登录</span> </span> </span><span class="styled-button__moving-block back"> <span class="styled-button__text-holder"> <span class="styled-button__text">登录</span> </span> </span> </span> </button>
        <h5 style="color:#d9eeff;">开发人员：刘香草</h5>
      </div>
    </form>
  </div>
</template>
<script>
  import API from '../assets/login.js';
  import { mapMutations } from 'vuex';
  export default {
    data() {
      return {
        loginForm: {
          name: '',
          password: ''
        },
        admin: {},
        islogin:"",
        rules: {
          name: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      };
    },

    created(){

      this.loadUser();

    },
    watch:{
      islogin: {
        handler:function(){
          this.loadUser();
        },
        deep:true
      }
    },
    methods: {
      /*获取用户信息*/
      loadUser(){
        var islogin = localStorage.getItem("islogin");
        this.islogin=islogin;
        console.log("登录状态"+this.islogin);
        if(islogin!=='1'){
          console.log("登录状态"+this.islogin);
          this.$router.push('/adminLogin');
        }
        else {
          var list = JSON.parse(localStorage.getItem("admin") || '[]');
          this.admin = list;
          this.$router.push('/adminIndex');
        }

        console.log(this.admin);
      },
      ...mapMutations(['changeLogin']),
      adminLogin() {
        if (this.loginForm.name === '' || this.loginForm.password === '') {
          alert('账号或密码不能为空');
        } else {
          console.log(this.loginForm);
          var params = new URLSearchParams();
          params.append('name', this.loginForm.name);
          params.append('password', this.loginForm.password);
          this.axios({
            method: 'post',
            url: '/admin/login',
            data: params
          }).then(res => {
            this.admin = res.data;
            // console.log(res.data);
            if (res.data.name === this.loginForm.name) {
              // console.log(res.data);
              this.$router.push('/adminIndex');
              localStorage.setItem('admin', JSON.stringify(res.data));
              localStorage.setItem('islogin', '1');
              alert('登陆成功');

            } else {
              alert('账号不存在');
            }
          }).catch(error => {
            alert('账号或密码错误');
            // console.log(error);
          });
        }
      },
      home(){
        this.$router.push('/');
      }
    }
  };

</script>
<style scoped>
  @import "../assets/login.css";
</style>
