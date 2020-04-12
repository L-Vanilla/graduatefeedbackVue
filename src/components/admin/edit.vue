<!--2020-4-10系统管理员修改---Vanilla-->
<template>
  <div style="margin-top: 15px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name" >
            <el-input v-model="ruleForm.name"   placeholder="请输入姓名" style="width:300%"></el-input>
        </el-form-item>
<!--        <el-form-item label="密码" prop="password" >-->
<!--            <el-input  type="password" :autosize="{ minRows: 5, maxRows: 10}" style="width:300%"  placeholder="请输入密码" v-model="ruleForm.password" ></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="手机号" prop="phone" >
            <el-input v-model="ruleForm.phone"   placeholder="请输入手机号" style="width:300%"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idCard" >
            <el-input v-model="ruleForm.idCard"   placeholder="请输入身份证号" style="width:300%"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" >
          <el-radio-group v-model="ruleForm.sex">
            <el-radio  :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱" prop="mail" >
          <el-input v-model="ruleForm.mail"   placeholder="请输入邮箱" style="width:300%"></el-input>
        </el-form-item>
        <el-form-item label="所属学院" prop="college" >
          <el-input v-model="ruleForm.college"   placeholder="请输入所属学院" style="width:300%"></el-input>
        </el-form-item>
        <el-form-item label="职称" prop="rank" >
          <el-input v-model="ruleForm.rank"   placeholder="请输入职称" style="width:300%"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks" >
          <el-input v-model="ruleForm.remarks"   placeholder="请输入备注" style="width:300%"></el-input>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="submitForm('ruleForm')" >{{buttonText}}</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
  </div>
</template>

<script>
  export default {
      inject:['reload'],
      props:["id"],
    data () {
        name:"adminedit"
      /*验证手机号*/
      let checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if (!value) {
          return callback(new Error("电话号码不能为空"))
        }
        setTimeout(() => {
          // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
          // 所以在前面加了一个+实现隐式转换
          if (!Number.isInteger(+value)) {
            callback(new Error("请输入数字值"))
          } else {
            if (phoneReg.test(value)) {
              callback()
            } else {
              callback(new Error("电话号码格式不正确"))
            }
          }
        }, 100)
      };
      /*验证身份证号start*/
      let checkcredentialsNum = (rule, value, callback) => {
        const credentialsNumReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!value) {
          return callback(new Error("身份证编号不能为空"))
        }
        setTimeout(() => {
          if (credentialsNumReg.test(value)) {
            callback()
          } else {
            callback(new Error("身份证编号格式不正确"))
          }
        }, 100)
      };
      /*----------验证身份证end*/
      return {
          ruleForm:{
            id:"",
            name:"",
            password:"",
            phone:"",
            idCard:"",
            sex:"",
            mail:"",
            college:"",
            rank:"",
            remarks:"",
          },

          rules: {
            name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ] ,
            sex: [
                { required: true, message: '请选择姓名', trigger: 'blur' },
            ] ,
            password: [
                { required: true, message: '请选择密码', trigger: 'blur' },
            ] ,
            phone: [
              { required: true, trigger: 'blur',validator: checkPhone }//设置全局变量
            ] ,
            idCard: [
              { required: true, trigger: 'blur',validator: checkcredentialsNum }//设置全局变量
            ]
        },
        buttonText:"创建"

      }
    },
    created(){
        if(this.id){
             this.get("admin/getOne",(data)=>{
                this.ruleForm=data;
                console.log(this.ruleForm);
            },{id:this.id});
            this.buttonText="修改"
        }

    },

    components: {

    },
    methods:{
        resetForm(formName){
             this.$refs[formName].resetFields();
        },
        submitForm(formName){
            let url="";
            if(this.id){
              url="admin/update";
            }
            else{
              /*设置身份证后四位为密码---0*/
              let idCard=this.ruleForm.idCard;
              console.log("idCard"+idCard);
              this.ruleForm.password=idCard.substring(idCard.length-6,idCard.length);
              /*=-----------设置身份证后四位为密码---1---------*/
              url="admin/add";
            }
            this.post(formName,url,this.ruleForm);
        }

    }
  }

</script>

<style>

</style>
