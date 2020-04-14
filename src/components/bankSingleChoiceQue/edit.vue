<!--2020-4-14单选题修改---Vanilla-->
<template>
  <div style="margin-top: 15px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="题目" prop="singleContent" >
            <el-input v-model="ruleForm.singleContent"   placeholder="请输入题目内容" style="width:300%"></el-input>
        </el-form-item>
        <el-form-item label="选项A" prop="choiceA" >
          <el-input v-model="ruleForm.choiceA"   placeholder="请输入选项A" style="width:300%"></el-input>
        </el-form-item>
        <el-form-item label="选项B" prop="choiceB" >
          <el-input v-model="ruleForm.choiceB"   placeholder="请输入选项B" style="width:300%"></el-input>
        </el-form-item>
        <el-form-item label="选项C" prop="choiceC" >
          <el-input v-model="ruleForm.choiceC"   placeholder="请输入选项C" style="width:300%"></el-input>
        </el-form-item>
        <el-form-item label="选项D" prop="choiceD" >
          <el-input v-model="ruleForm.choiceD"   placeholder="请输入选项D" style="width:300%"></el-input>
        </el-form-item>
        <el-form-item label="选项E" prop="choiceE" >
          <el-input v-model="ruleForm.choiceE"   placeholder="请输入选项E" style="width:300%"></el-input>
        </el-form-item>
        <el-form-item label="选项F" prop="choiceF" >
          <el-input v-model="ruleForm.choiceF"   placeholder="请输入选项F" style="width:300%"></el-input>
        </el-form-item>
        <el-form-item label="选项G" prop="choiceG" >
          <el-input v-model="ruleForm.choiceG"   placeholder="请输入选项G" style="width:300%"></el-input>
        </el-form-item>
        <el-form-item label="所属类型" prop="singeType" >
          <el-input v-model="ruleForm.singeType"   placeholder="请输入所属类型" style="width:300%"></el-input>
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
        name:"bankSingleChoiceQueedit"

      return {
          ruleForm:{
            singleContent:"",
            choiceA:"",
            choiceB:"",
            choiceC:"",
            choiceD:"",
            choiceE:"",
            choiceF:"",
            choiceG:"",
            singeType:"",
          },
          rules: {


        },
        buttonText:"创建"

      }
    },
    created(){
        if(this.id){
             this.get("bankSingleChoiceQue/getOne",(res)=>{
                this.ruleForm=res.data;
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
              url="bankSingleChoiceQue/update";
            }
            else{

              url="bankSingleChoiceQue/add";
            }
            this.post(formName,url,this.ruleForm);
        }
    }
  }

</script>

<style>

</style>
