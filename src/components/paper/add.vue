<!--添加问卷-->
<template>
  <div>

    <!--整个问卷div-----------------0-->
    <div style="margin-left: 100px">
      <!--右侧问卷-----------------0-->
      <div class="right">
        <div style="margin-top: 30px">
          <el-form ref="modelForm"  :rule="rules" :model="modelForm" label-position="right"  >
            <div >
              <!--标题-->
              <el-form-item  prop="title" >
                <input class="InputTitle" type="text"  v-model="modelForm.title"   placeholder="请输入标题" ></input>
              </el-form-item>
              <el-form-item  prop="content">
<!--                <quill-editor v-model="modelForm.content" ref="myQuillEditor" style="height: 400px;" :options="editorOption">-->
<!--                </quill-editor>-->
                <textarea
                  class="el-textarea__content"
                  placeholder="请输入内容"
                  :max="5"
                  v-model="modelForm.content" >
                </textarea>
              </el-form-item>
              <el-form-item prop="remarks" class="el-form-item__remarks " >
                <el-row style="height: 10px">
                  <el-col :span="3">
                    <span style="color: #7c9996;margin-left: 50px">说明：</span>
                  </el-col>
                  <el-col :span="20">
                    <input class="InputRemarks" v-model="modelForm.remarks"   placeholder="请输入说明" ></input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="paperType" style="margin-left: 50px" label="试卷类型" >
                <el-radio-group v-model="modelForm.paperType">
                  <el-radio label="毕业要求">毕业要求</el-radio>
                  <el-radio label="课程体系">课程体系</el-radio>
                  <el-radio label="培养目标">培养目标</el-radio>
                  <el-radio label="实习实训">实习实训</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-divider></el-divider>
              <vuedraggable v-model="modelForm.topic" class="wrapper" @end="end" >
                <div v-for="(item, index) in modelForm.topic" :key="index" class="wrapper">
                  <!--单选----0-->
                  <div v-if="item.queType===0">
<!--                    <el-form-item-->
<!--                      :prop="`topic.${index}.queType`"-->
<!--                      :rules="{ required: true, message: '请选择问题类型', trigger: 'change' }" >-->
<!--                      <el-input  v-model="item.queType"></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item
                      :prop="`topic.${index}.singleContent`"
                      :label="`${index+1}题目:`"
                      :rules="{ required: true, message: '请填写问题', trigger: 'change' }"
                    style="=">
                          <el-input v-model.trim="item.singleContent" style="width:258px" clearable placeholder="请填写问题">
                            <template slot="append">单选</template>
                          </el-input>
                    </el-form-item>
                    <!-- 答案 -->
                    <el-form-item
                      v-for="(opt, idx) in item.choices"
                      :key="idx"
                      :label="`选项${idx + 1}`"
                      :prop="`topic.${index}.choices.${idx}.value`"
                      :rules="[                  { required: true, message: '请输入答案', trigger: 'blur' },]" >
                      <el-input v-model.trim="opt.value" style="width:258px" clearable placeholder="请输入答案" />
                      <el-button style="margin-left: 20px" @click.prevent="removeDomain(index,idx)">删除</el-button>
                    </el-form-item>
                    <el-form-item>
                      <el-button  @click="addDomain(index)">新增选项</el-button>
                      <el-button @click="removeQuestion(index)">删除题目</el-button>
                    </el-form-item>
                    <el-divider></el-divider>
                  </div>
                  <!--多选----1-->
                  <div v-else-if="item.queType===1">
                    <el-form-item
                      :prop="`topic.${index}.singleContent`"
                      :rules="{ required: true, message: '请填写问题', trigger: 'change' }"
                    style="=">
                      <el-row>
                        <el-col :span="2">
                             <span >
                                {{ index+1 }}.题目:
                             </span>
                        </el-col>
                        <el-col :span="18">
                          <el-input v-model.trim="item.singleContent" style="width:258px" clearable placeholder="请填写问题">
                            <template slot="append">多选</template>
                          </el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <!-- 答案 -->
                    <el-form-item
                      v-for="(opt, idx) in item.choices"
                      :key="idx"
                      :label="`选项${idx + 1}`"
                      :prop="`topic.${index}.choices.${idx}.value`"
                      :rules="[                  { required: true, message: '请输入答案', trigger: 'blur' },]" >
                      <el-input v-model.trim="opt.value" style="width:258px" clearable placeholder="请输入答案" />
                      <el-button style="margin-left: 20px" @click.prevent="removeDomain(index,idx)">删除</el-button>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="addDomain(index)">新增选项</el-button>
                      <el-button @click="removeQuestion(index)">删除题目</el-button>
                    </el-form-item>
                    <el-divider></el-divider>
                  </div>
                  <!--填空----2-->
                  <div v-else-if="item.queType===2">
                    <el-form-item
                      :prop="`topic.${index}.singleContent`"
                      :rules="{ required: true, message: '请填写问题', trigger: 'change' }"
                    style="=">
                      <el-row>
                        <el-col :span="2">
                             <span >
                                {{ index+1 }}.题目:
                             </span>
                        </el-col>
                        <el-col :span="18">
                          <el-input v-model.trim="item.singleContent" style="width:258px" clearable placeholder="请填写问题">
                            <template slot="append">填空</template>
                          </el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <!-- 答案 -->
                    <el-form-item>
                      <el-button @click="removeQuestion(index)">删除题目</el-button>
                    </el-form-item>
                    <el-divider></el-divider>
                  </div>
                  <!--星级----3-->
                  <div v-else-if="item.queType===3">
                    <el-form-item
                      :prop="`topic.${index}.singleContent`"
                      :rules="{ required: true, message: '请填写问题', trigger: 'change' }"
                    style="=">
                      <el-row>
                        <el-col :span="2">
                             <span >
                                {{ index+1 }}.题目:
                             </span>
                        </el-col>
                        <el-col :span="18">
                          <el-input v-model.trim="item.singleContent" style="width:258px" clearable placeholder="请填写问题">
                            <template slot="append">评分</template>
                          </el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <!--评分-->
                    <el-form-item
                      v-for="(opt, idx) in item.choices"
                      :key="idx"
                      :label="`选项${idx + 1}`"
                      :prop="`topic.${index}.choices.${idx}.value`"
                      :rules="[                  { required: true, message: '请输入答案', trigger: 'blur' },]" >
                      <el-rate disabled></el-rate>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="removeQuestion(index)">删除题目</el-button>
                    </el-form-item>
                    <el-divider></el-divider>
                  </div>
                  <!--姓名----4-->
                  <div v-else-if="item.queType===4">
                    <el-form-item
                      :prop="`topic.${index}.singleContent`"
                      :rules="{ required: true, message: '姓名', trigger: 'change' }"
                      style="=">
                      <el-row>
                        <el-col :span="2">
                             <span >
                                {{ index+1 }}.题目:
                             </span>
                        </el-col>
                        <el-col :span="18">
                          <el-input v-model.trim="item.singleContent" style="width:258px" clearable placeholder="请填写问题">
                            <template slot="append">姓名</template>
                          </el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <!-- 答案 -->
                    <el-form-item>
                      <el-button @click="removeQuestion(index)">删除题目</el-button>
                    </el-form-item>
                    <el-divider></el-divider>
                  </div>
                  <!--学号----5-->
                  <div v-else-if="item.queType===5">
                    <el-form-item
                      :prop="`topic.${index}.singleContent`"
                      :rules="{ required: true, message: '请输入学号', trigger: 'change' }"
                      style="=">
                      <el-row>
                        <el-col :span="2">
                             <span >
                                {{ index+1 }}.题目:
                             </span>
                        </el-col>
                        <el-col :span="18">
                          <el-input v-model.trim="item.singleContent" style="width:258px" clearable placeholder="请填写问题">
                            <template slot="append">学号</template>
                          </el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <!-- 答案 -->
                    <el-form-item>
                      <el-button @click="removeQuestion(index)">删除题目</el-button>
                    </el-form-item>
                    <el-divider></el-divider>
                  </div>
                  <!--专业----6-->
                  <div v-else-if="item.queType===6">
                    <el-form-item
                      :prop="`topic.${index}.singleContent`"
                      :rules="{ required: true, message: '请输入专业', trigger: 'change' }"
                      style="=">
                      <el-row>
                        <el-col :span="2">
                             <span >
                                {{ index+1 }}.题目:
                             </span>
                        </el-col>
                        <el-col :span="18">
                          <el-input v-model.trim="item.singleContent" style="width:258px" clearable placeholder="请填写问题">
                            <template slot="append">专业</template>
                          </el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <!-- 答案 -->
                    <el-form-item>
                      <el-button @click="removeQuestion(index)">删除题目</el-button>
                    </el-form-item>
                    <el-divider></el-divider>
                  </div>
                  <!--毕业年份----7-->
                  <div v-else-if="item.queType===7">
                    <el-form-item
                      :prop="`topic.${index}.singleContent`"
                      :rules="{ required: true, message: '请填写问题', trigger: 'change' }"
                      style="=">
                      <el-row>
                        <el-col :span="2">
                             <span >
                                {{ index+1 }}.题目:
                             </span>
                        </el-col>
                        <el-col :span="18">
                          <el-input v-model.trim="item.singleContent" style="width:258px" clearable placeholder="请填写问题">
                            <template slot="append">毕业年份</template>
                          </el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <!-- 答案 -->
                    <el-form-item
                      v-for="(opt, idx) in item.choices"
                      :key="idx"
                      :label="`选项${idx + 1}`"
                      :prop="`topic.${index}.choices.${idx}.value`"
                      :rules="[                  { required: true, message: '请输入答案', trigger: 'blur' },]" >
                      <el-input v-model.trim="opt.value" style="width:258px" clearable placeholder="请输入选项" />
                      <el-button style="margin-left: 20px" @click.prevent="removeDomain(index,idx)">删除</el-button>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="addDomain(index)">新增选项</el-button>
                      <el-button @click="removeQuestion(index)">删除题目</el-button>
                    </el-form-item>
                    <el-divider></el-divider>
                  </div>
                </div>
              </vuedraggable>
              <el-form-item style="text-align: center">
                <el-button style="margin-top: 10px" @click="addSubmit(modelForm)">提交</el-button>
                <el-button @click="resetForm('modelForm')">重置</el-button>
              </el-form-item>
            </div>

          </el-form>
        </div>
      </div>
      <!--右侧问卷-----------------1-->
      <!--左侧选项-----------------0-->
      <div class="left">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <el-row>
            <div class="div_BaseInfo">
              <span>通用选项</span>
            </div>
          </el-row>
          <el-row>
              <el-col :span="12">
                <el-button icon="icon-iconfontoptionbutton" class="Button_Left" @click="addSingleQue">
                  <br><br>
                  单选</el-button>
              </el-col>
              <el-col :span="12">
                <el-button icon="icon-wenjuantiaocha" class="Button_Right"  @click="addMultipleQue"><br><br>多选</el-button>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                <el-button icon="icon-plus-blanksfill" class="Button_Left" @click="addBlankQue">
                  <br><br>
                  填空</el-button>
              </el-col>
              <el-col :span="12">
                <el-button icon="icon--xingji" class="Button_Right"  @click="addRateQue"><br><br>评分</el-button>
              </el-col>
          </el-row>
          <el-row>
            <div class="div_BaseInfo">
              <span>基本信息</span>
            </div>
          </el-row>
          <el-row>
              <el-col :span="12">
                <el-button icon="icon-zhenshixingming" class="Button_Left" @click="addNameQue">
                  <br><br>
                  姓名</el-button>
              </el-col>
              <el-col :span="12">
                <el-button icon="icon-icon1" class="Button_Right"  @click="addStuNumberQue">
                  <br><br>
                  学号</el-button>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                <el-button icon="icon-icon1" class="Button_Left" @click="addClassQue">
                  <br><br>
                  专业
                 </el-button>
              </el-col>
              <el-col :span="12">
                <el-button icon="icon-icon1" class="Button_Right" style="text-align: center;padding: 12px 10px"  @click="addGraYearQue">
                  <br><br>
                  毕业年份</el-button>
              </el-col>
          </el-row>
        </el-card>
      </div>
      <!--左侧选项-----------------1-->
    </div>
    <!---整个问卷div------1-->
  </div>
</template>

<script>
  import vuedraggable from 'vuedraggable'
  import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  export default {

    name: 'add',

    components: {

      vuedraggable

    },

    data() {

      return {

        rules: {},
        modelForm: {
          title:"",
          content:"",
          remarks:"",
          paperType:"",
          topic: [{
            singleContent:"",
            queType: 0,
            choices: [{
              value:"",
            }]
          }]

        },
        editorOption:{
          modules:{
            toolbar:[
              ['bold', 'italic'], //加粗，斜体，下划线，删除线
              ['blockquote'],  //引用，代码块
              [{ 'header': 1 }, { 'header': 2 }],  // 标题，键值对的形式；1、2表示字体大小
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],  //列表
              [{ 'indent': '-1'}, { 'indent': '+1' }],  // 缩进
              [{ 'align': []}],  // 缩进
            ]
          }
        }

      }

    },
    watch:{
      // modelForm:{
      //   handler:function(){
      //     this.getData();
      //   },
      //   deep:true
      // }
    },

    methods: {

      end(evt) {

        this.$refs.modelForm.clearValidate()

      },

      removeDomain(index, idx) { // 删除选项

        this.modelForm.topic[index].choices.splice(idx, 1)

      },

      removeQuestion(index) {//删除题目

        this.modelForm.topic.splice(index, 1)

      },

      addDomain(index) { // 新增选项

        this.modelForm.topic[index].choices.push({
          value: '',

        })

      },

      addQuestion() { // 新增题目

        this.modelForm.topic.push({singleContent: '',
          queType: 0,
          choices: [{
            value: '',
          }]})

      },
      addSingleQue() { // 新增单选目

        this.modelForm.topic.push({singleContent: "",
          queType: 0,
          choices: [{
            value: "",
          }]})

      },
      addMultipleQue() { // 新增多选题目
        this.modelForm.topic.push({singleContent: '',
          queType: 1,
          choices: [{
            value: '',
          }]})

      },
      addBlankQue() { // 新增填空题目
        this.modelForm.topic.push({singleContent: '',
          queType: 2,
          choices: [{
            value: '',
          }]})
      },
      addRateQue() { // 新增评分题目
        this.modelForm.topic.push({singleContent: '',
          queType: 3,
          choices: [{
            value: '',
          }]})

      },
      addNameQue() { // 新增姓名题目
        this.modelForm.topic.push({singleContent: '姓名',
          queType: 4,
          choices: [{
            value: '',
          }]})
      },
      addStuNumberQue() { // 新增学号题目
        this.modelForm.topic.push({singleContent: '学号',
          queType: 5,
          choices: [{
            value: '',
          }]})
      },
      addClassQue() { // 新增专业题目
        this.modelForm.topic.push({singleContent: '专业',
          queType: 6,
          choices: [{
            value: '',
          }]})
      },
      addGraYearQue() { // 新增毕业年份题目以下拉列表的形式
        this.modelForm.topic.push({singleContent: '毕业年份',
          queType: 7,
          choices: [{
            value: '',
          }]})
      },
      resetForm(formName) { // 重置
        this.$refs[formName].resetFields()

      },

      addSubmit(modelForm) {
        const paper={}
        const bankSingleChoiceQueList = []
        modelForm.topic.forEach((item, index) => {
          const bankSingleChoiceQue = {};
                    bankSingleChoiceQue.singleContent = item.singleContent;

                    bankSingleChoiceQue.queType = item.queType;
                    /*题目所属类型
                    * 毕业要求
                    * 课程体系
                    * 实习实训
                    * */
                    if(item.choices.length===1){
                      bankSingleChoiceQue.choiceA=item.choices[0].value;
                    }
                   else if(item.choices.length===2){
                      bankSingleChoiceQue.choiceA=item.choices[0].value;
                      bankSingleChoiceQue.choiceB = item.choices[1].value;
                    }else if(item.choices.length===3){
                      bankSingleChoiceQue.choiceA=item.choices[0].value;
                      bankSingleChoiceQue.choiceB = item.choices[1].value;
                      bankSingleChoiceQue.choiceC = item.choices[2].value;
                    }else if(item.choices.length===4){
                      bankSingleChoiceQue.choiceA=item.choices[0].value;
                      bankSingleChoiceQue.choiceB = item.choices[1].value;
                      bankSingleChoiceQue.choiceC = item.choices[2].value;
                      bankSingleChoiceQue.choiceD=item.choices[3].value;
                    }else if(item.choices.length===5){
                      bankSingleChoiceQue.choiceA=item.choices[0].value;
                      bankSingleChoiceQue.choiceB = item.choices[1].value;
                      bankSingleChoiceQue.choiceC = item.choices[2].value;
                      bankSingleChoiceQue.choiceD=item.choices[3].value;
                      bankSingleChoiceQue.choiceE=item.choices[4].value;
                    }else if(item.choices.length===5){
                      bankSingleChoiceQue.choiceA=item.choices[0].value;
                      bankSingleChoiceQue.choiceB = item.choices[1].value;
                      bankSingleChoiceQue.choiceC = item.choices[2].value;
                      bankSingleChoiceQue.choiceD=item.choices[3].value;
                      bankSingleChoiceQue.choiceE=item.choices[4].value;
                    }else if(item.choices.length===6){
                      bankSingleChoiceQue.choiceA=item.choices[0].value;
                      bankSingleChoiceQue.choiceB = item.choices[1].value;
                      bankSingleChoiceQue.choiceC = item.choices[2].value;
                      bankSingleChoiceQue.choiceD=item.choices[3].value;
                      bankSingleChoiceQue.choiceE=item.choices[4].value;
                      bankSingleChoiceQue.choiceF=item.choices[5].value;
                    }else if(item.choices.length===7){
                      bankSingleChoiceQue.choiceA=item.choices[0].value;
                      bankSingleChoiceQue.choiceB = item.choices[1].value;
                      bankSingleChoiceQue.choiceC = item.choices[2].value;
                      bankSingleChoiceQue.choiceD=item.choices[3].value;
                      bankSingleChoiceQue.choiceE=item.choices[4].value;
                      bankSingleChoiceQue.choiceF=item.choices[5].value;
                      bankSingleChoiceQue.choiceG=item.choices[6].value;
                    }
                    // bankSingleChoiceQue.choiceC = item[key]
                    // bankSingleChoiceQue.choiceD = item[key]
                    // bankSingleChoiceQue.choiceE = item[key]
                    // bankSingleChoiceQue.choiceF = item[key]
                    // bankSingleChoiceQue.choiceG = item[key]
                    // bankSingleChoiceQue.singeType = item[key]
                bankSingleChoiceQueList.push(bankSingleChoiceQue)
              });
        paper.title=modelForm.title;
        paper.content=modelForm.content;
        paper.remarks=modelForm.remarks;
        paper.paperType=modelForm.paperType;
        paper.bankSingleChoiceQueList=bankSingleChoiceQueList;
        console.log("paper"+paper);
              this.insertBankSingleChoiceQueInfoList(paper)
            },
      /*插入数据库*/
      insertBankSingleChoiceQueInfoList(paper) {
        this.axios({
          method: 'post',
          url: 'bankSingleChoiceQue/insertBankSingleChoiceQueList',
          data: paper,
        })
          .then(result => {
            console.log("map"+result.data.data.responseList);
            if (result.data.statu === 0) {
              // this.tableHeader = ['题目内容',
              //   '选项A',
              //   '选项B',
              //   '选项C',
              //   '选项D',
              //   '选项E',
              //   '选项G',
              //   '所属类型',
              //   '上传状态'];
              this.tableData = result.data.data.responseList;
              // this.allItemCount = result.data.data.allItemCount;
              // this.successItemCount = result.data.data.successItemCount;
              // this.failItemCount = result.data.data.failItemCount;
              this.$message({
                message: result.data.msg,
                type: 'success'
              })
            } else {
              this.$message({
                message: result.data.msg,
                type: 'error'
              })
            }
          }).catch(err => {
          console.log(err);
        });
        // const result = await reqInsertBankSingleChoiceQueInfoList(bankSingleChoiceQueList)

      }




    }

  }

</script>



<style scoped>
  /*问卷左右布局*/
  .right{
    float: left;
    background-color: #FFFFFF;
    display: inline-block;
    width: 70%;
  }
  .left{
    position: relative;
    display: inline-block;
    float: left;
    background-color:#FFFFFF;
    margin-left: 20px;
    width: 150px;
  }
  /*选项按钮样式*/
  .Button_Left{
    border-radius: 0px;
    border-left: none;
    width: 75px;
    text-align: center;
  }
  .Button_Right{
    border-radius: 0px;
    border-right: none;
    width: 75px;
  }
  .div_BaseInfo{
    border-radius: 0px;
    border: none;
    height: 40px;
    padding: 5px 20px;
    line-height: 30px;
    text-align: center;
    box-sizing: border-box;
    width: 150px;
  }
  /*输入框样式*/
  .InputTitle{
    margin-left: 50px;
    margin-right: 40px;
    width: 90%;
    height: 35px;
    /*padding: 10px 20px;*/
    /* 这里是去除掉input的默认样式然后修改为自己的 */
    background:none;
    outline:none;
    border:0px;
    font-size: 28px;
    text-align: center;
    /* 这里是修改为自己的样式 */
    /*border-bottom: 0px solid #dcdcdc;*/
    /*border-bottom-left-radius: 1px;*/
    /*border-bottom-right-radius: 1px;*/
    /* 使用怪异盒模型，也可以不使用 */
    /*box-sizing: border-box;*/
  }
  .InputTitle:focus{
    border-bottom: 2px solid #0F996B;
  }
  /*卷子样式*/
  .wrapper {
    margin-left: 50px;
    margin-right: 40px;
  }
  /*从内容长文本样式*/
  .el-textarea__content {
    margin-left: 50px;
    margin-right: 40px;

    /* display: block; */
    /* resize: vertical; */
    /*padding: 5px 15px;*/
    /* line-height: 1.5; */
    /*-webkit-box-sizing: border-box;*/
    -webkit-scrollbar:none;
    /*box-sizing: border-box;*/
    /* width: 100%; */
    width: 90%;
    height: 35px;
    /*padding: 10px 20px;*/
    /* 这里是去除掉input的默认样式然后修改为自己的 */
    background:none;
    outline:none;
    border: none;
    border-bottom: 1px solid #7c9996;
    font-size: 16px;
    text-align: center;
    resize: none;
  }
  .el-textarea__content:focus{
    border: none;/**/
    border-bottom: 1.5px solid #7c9996;
  }
  /*.el-form-item-remarks{*/
  /*  margin-top: 0px;*/
  /*  height:10px;*/
  /*  line-height:0px;*/
  /*  position: relative;*/
  /*}*/
  .el-form-item el-form-item__remarks {

    line-height: 0px;
    height: 20px;
    position: relative;
    font-size: 14px;
  }
  /*说明输入框样式*/
  .InputRemarks{
    margin-right: 40px;
    width: 90%;
    line-height: 0px;
    height: 20px;
    /*padding: 20px 20px;*/
    /* 这里是去除掉input的默认样式然后修改为自己的 */
    background:none;
    outline:none;
    margin-top: 0px;
    border:0px;
    color: #7c9996;
    font-size: 14px;
    text-align: left;
  }







</style>
