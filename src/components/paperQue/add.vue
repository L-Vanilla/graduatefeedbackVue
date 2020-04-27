<!--2020-4-10系统管理员修改---Vanilla-->
<template>
  <div style="margin-top: 15px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title" >
            <el-input v-model="ruleForm.title"   placeholder="请输入标题" style="width:300%"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content" >
            <el-input v-model="ruleForm.content"   placeholder="请输入内容" style="width:300%"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="remarks" >
            <el-input v-model="ruleForm.remarks"   placeholder="请输入说明" style="width:300%"></el-input>
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
        name:"paperedit"
      return {
          ruleForm:{
            id:"",
            title:"",
            content:"",
            remarks:"",

          },

          rules: {
            title: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ] ,
        },
        buttonText:"创建"

      }
    },
    created(){
        if(this.id){
             this.get("paper/getOne",(res)=>{
                this.ruleForm=res.data;
                console.log(res.msg);
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
              url="paper/update";
            }
            else{
              url="paper/add";
            }
            this.post(formName,url,this.ruleForm);
        }

    }
  }

</script>

<style>

</style>
