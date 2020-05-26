<!--系统管理员登录--Vanilla-->
<template>
  <div>
  <div class="main">
<!--    <input v-model="loginForm.id"></input>-->
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
<!--            <el-button type="text" style="float: left; font-size: 15px;color:#d9eeff "  icon="el-icon-back" size="medium" @click="home()">去首页</el-button>-->
          </el-col>
        </el-row>
        <h2 style="color: #d9eeff">毕业生跟踪及反馈系统</h2>
        <br>
        <div class="styled-input">
          <input type="text" class="styled-input__input" v-model="loginForm.id" placeholder="请输入账号" required></input>
          <!--<div class="styled-input__placeholder"> <span class="styled-input__placeholder-text">Username</span> </div>-->
          <!--<div class="styled-input__circle"></div>-->
        </div>
        <div class="styled-input">
          <input type="password" class="styled-input__input" v-model="loginForm.password" placeholder="请输入密码" required/>
          <!--<div class="styled-input__placeholder"> <span class="styled-input__placeholder-text">Password</span> </div>-->
          <!--<div class="styled-input__circle"></div>-->
        </div>
        <button type="button" class="styled-button" style="background-color: #8fb3b4;color: #d9eeff" @click="adminLogin()"> <span class="styled-button__real-text-holder"> <span class="styled-button__real-text">登录</span> <span class="styled-button__moving-block face"> <span class="styled-button__text-holder"> <span class="styled-button__text">登录</span> </span> </span><span class="styled-button__moving-block back"> <span class="styled-button__text-holder"> <span class="styled-button__text">登录</span> </span> </span> </span> </button>
        <h5 style="color:#d9eeff;font-size: 5px">开发人员：河北工程大学计算机专业刘香草</h5>
<!--        <h5 style="color:#d9eeff;"></h5>-->
      </div>
    </form>
  </div>
  </div>

</template>
<script>
  import API from '../assets/login.js';
  import { mapMutations } from 'vuex';
  export default {
    data() {
      return {
        loginForm: {
          id: '',
          password: ''
        },
        admin: {},
        islogin:"",
        rules: {
          id: [
            { required: true, message: '请职工编号', trigger: 'blur' },
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
        if (this.loginForm.id === '' || this.loginForm.password === '') {
          alert('账号或密码不能为空');
        } else {
          console.log(this.loginForm);
          var params = new URLSearchParams();
          params.append('id', this.loginForm.id);
          params.append('password', this.loginForm.password);
          this.axios({
            method: 'post',
            url: '/admin/login',
            data: params
          }).then(res => {
            this.admin = res.data;
            localStorage.setItem('admin', JSON.stringify(res.data));
            localStorage.setItem('islogin', '1');
            alert('登陆成功');
            this.$router.push('/adminIndex');
            // console.log(res.data);
          }).catch(error => {
            alert('账号或密码错误');
            // console.log(error);
          });
        }
      },
      home(){
        this.$router.push('/adminLogin');
      }
    }
  };

</script>
<style scoped>
  @import "../assets/login.css";
</style>
