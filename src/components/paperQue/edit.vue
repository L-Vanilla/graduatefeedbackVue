<!--2020-4-10系统管理员修改---Vanilla-->
<template>
  <div style="margin-top: 15px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="题目类型" prop="queType" >
          <el-radio-group v-model="ruleForm.queType">
            <el-radio  :label="0">单选</el-radio>
            <el-radio :label="1">多选</el-radio>
            <el-radio :label="2">判断</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="条目编号" prop="queId" >
            <el-input v-model="ruleForm.queId"   placeholder="条目编号" style="width:300%"></el-input>
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
        name:"paperQueedit"
      return {
          ruleForm:{
            queType:"",
            queId:"",
          },

          rules: {

        },
        buttonText:"创建"

      }
    },
    created(){
        if(this.id){
             this.get("paperQue/getOne",(res)=>{
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
              url="paperQue/update";
            }
            else{
              url="paperQue/add";
            }
            this.post(formName,url,this.ruleForm);
        }

    }
  }

</script>

<style>

</style>
