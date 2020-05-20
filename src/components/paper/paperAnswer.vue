<!--问卷详情-->
<template>
  <div>
    <el-container style="background-color: #8fb3b4">
      <!--整个问卷div-----------------0-->
      <el-main style="text-align: center">
        <!--右侧问卷-----------------0-->
        <div class="right">
          <div>
            <el-form ref="modelForm"  :rule="rules" :model="modelForm" label-position="right">
              <div>
                <input type="hidden" v-model="modelForm.paperId"/>
                <!--标题-->
                <el-form-item  prop="title" >
                  <input class="InputTitle" type="text"  v-model="modelForm.title"   placeholder="请输入标题" disabled></input>
                </el-form-item>
                <el-form-item  prop="content" >
                  <textarea
                    class="el-textarea__content"
                    placeholder="请输入内容"
                    v-model="modelForm.content" disabled>
                </textarea>
                </el-form-item>
                <el-form-item prop="remarks" class="el-form-item__remarks " >
                  <el-row style="height: 10px">
                    <el-col :span="3">
                      <span style="color: #7c9996;margin-left: 50px">说明：</span>
                    </el-col>
                    <el-col :span="20">
                      <input class="InputRemarks" v-model="modelForm.remarks"   placeholder="请输入说明" disabled ></input>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-divider></el-divider>
                <vuedraggable v-model="modelForm.topic" class="wrapper" @end="end" >
                  <div v-for="(item, index) in modelForm.topic" :key="index" class="wrapper">
                    <input type="hidden" v-model="item.queId"/>
                    <!--单选----0-->
                    <div v-if="item.queType===0">
                      <!--                    <el-form-item-->
                      <!--                      :prop="`topic.${index}.queType`"-->
                      <!--                      :rules="{ required: true, message: '请选择问题类型', trigger: 'change' }" >-->
                      <!--                      <el-input  v-model="item.queType"></el-input>-->
                      <!--                    </el-form-item>-->
                      <el-form-item
                        :prop="`topic.${index}.singleContent`">
                        <!--问题-->
                        <el-row>
                          <el-col :span="2">
                            <span>{{item.queNum}}.(单选)</span>
                          </el-col>
                          <el-col :span="22">
                            <input v-model.trim="item.singleContent" class="InputProblem" clearable placeholder="请填写问题" disabled>
                            </input>
                          </el-col>
                        </el-row>
                        <!--选项-->
                        <el-radio-group v-model="item.answer" style="margin-left: 30px;text-align: left;display: block;margin-top: 10px">
                          <el-radio v-for="opt in item.options" :key="opt.value" :label="opt.value" v-if="opt.label!=='null'" >
                            {{opt.label}}&nbsp;
                          </el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </div>
                    <!--多选----1-->
                    <div v-else-if="item.queType===1">
                      <el-form-item
                        :prop="`topic.${index}.singleContent`"
                        style="=">
                        <!--问题-->
                        <el-row>
                          <el-col :span="2">
                            <span>{{item.queNum}}.(多选)</span>
                          </el-col>
                          <el-col :span="22">
                            <input v-model.trim="item.singleContent" class="InputProblem" clearable placeholder="请填写问题" disabled>
                            </input>
                          </el-col>
                        </el-row>
                        <!--选项-->
                        <el-checkbox-group v-model="item.options"  @change="handleChange(item)" style="margin-left: 30px;text-align: left;display: block;margin-top: 10px">
                          <el-checkbox v-for="opt in item.options" :label="opt.value" :key="opt.value" v-if="opt.label!=='null'">
                            {{opt.label}}&nbsp;
                          </el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </div>
                    <!--填空----2-->
                    <div v-else-if="item.queType===2">
                      <el-form-item
                        :prop="`topic.${index}.singleContent`"
                        style="=">
                        <!--问题-->
                        <el-row>
                          <el-col :span="2">
                            <span>{{item.queNum}}.(填空)</span>
                          </el-col>
                          <el-col :span="22">
                            <input v-model.trim="item.singleContent" class="InputProblem" clearable placeholder="请填写问题" disabled>
                            </input>
                          </el-col>
                        </el-row>
                        <el-row>
                          <input v-model.trim="item.answer" class="InputAnswer" clearable >
                        </el-row>
                      </el-form-item>
                      <!-- 答案 -->
                    </div>
                    <!--星级----3-->
                    <div v-else-if="item.queType===3">
                      <el-form-item
                        :prop="`topic.${index}.singleContent`"
                        :rules="{ required: true, message: '请填写问题', trigger: 'change' }"
                        style="=">
                        <!--问题-->
                        <el-row>
                          <el-col :span="2">
                            <span>{{item.queNum}}.(评分)</span>
                          </el-col>
                          <el-col :span="22">
                            <input v-model.trim="item.singleContent" class="InputProblem" clearable placeholder="请填写问题" disabled>
                            </input>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-rate v-model="item.answer" style="text-align: left;margin-left: 30px;height: 50px;margin-top: 10px" ></el-rate>
                        </el-row>
                      </el-form-item>
                    </div>
                    <!--姓名----4-->
                    <div v-else-if="item.queType===4">
                      <el-form-item
                        :prop="`topic.${index}.singleContent`">
                        <!--问题-->
                        <el-row>
                          <el-col :span="2">
                            <span>{{item.queNum}}.(姓名)</span>
                          </el-col>
                          <el-col :span="1">
                            <input v-model.trim="item.singleContent" class="InputProblem" clearable placeholder="请填写问题" disabled>
                            </input>
                          </el-col>
                          <el-col :span="21">
                            <input v-model="item.answer" class="InputAnswer" style="margin-left: 0px" clearable  >
                            </input>
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </div>
                    <!--学号----5-->
                    <div v-else-if="item.queType===5">
                      <el-form-item
                        :prop="`topic.${index}.singleContent`"
                        :rules="{ required: true, message: '请输入学号', trigger: 'change' }"
                        style="=">
                        <!--问题-->
                        <el-row>
                          <el-col :span="2">
                            <span>{{item.queNum}}.(学号)</span>
                          </el-col>
                          <el-col :span="1">
                            <input v-model.trim="item.singleContent" class="InputProblem" clearable placeholder="请填写问题" disabled>
                            </input>
                          </el-col>
                          <el-col :span="20">
                            <input v-model="item.answer" class="InputAnswer" clearable  >
                            </input>
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </div>
                    <!--专业----6-->
                    <div v-else-if="item.queType===6">
                      <el-form-item
                        :prop="`topic.${index}.singleContent`"
                        :rules="{ required: true, message: '请输入专业', trigger: 'change' }"
                        style="=">
                        <!--问题-->
                        <el-row>
                          <el-col :span="2">
                            <span>{{item.queNum}}.(专业)</span>
                          </el-col>
                          <el-col :span="1">
                            <input v-model.trim="item.singleContent" class="InputProblem" clearable placeholder="请填写问题" disabled>
                            </input>
                          </el-col>
                          <el-col :span="20">
                            <input v-model="item.answer"  class="InputAnswer" clearable  >
                            </input>
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </div>
                    <!--毕业年份----7-->
                    <div v-else-if="item.queType===7">
                      <el-form-item
                        :prop="`topic.${index}.singleContent`"
                        :rules="{ required: true, message: '请填写问题', trigger: 'change' }"
                        style="=">
                        <!--问题-->
                        <el-row>
                          <el-col :span="3">
                            <span>{{item.queNum}}.(毕业年份)</span>
                          </el-col>
                          <el-col :span="2">
                            <input v-model.trim="item.singleContent" class="InputProblem" clearable placeholder="请填写问题" disabled>
                            </input>
                          </el-col>
                          <el-col :span="18">
                            <input  v-model="item.answer" class="InputAnswer" clearable  >
                            </input>
                          </el-col>
                        </el-row>
                      </el-form-item>
                      <!-- 答案 -->
                    </div>
                  </div>
                </vuedraggable>
                <el-form-item>
                  <el-button style="margin-top: 10px" @click="addSubmit(modelForm)">提交</el-button>
                  <el-button @click="resetForm('modelForm')">重置</el-button>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
        <!--右侧问卷-----------------1-->
      </el-main>>
      <!---整个问卷div------1-->
    </el-container>
  </div>


</template>

<script>
  import vuedraggable from 'vuedraggable'
  export default {
    inject:['reload'],
    name: 'add',
    components: {
      vuedraggable
    },
    data() {
      return {
        type:[],
        rules: {
        },
        answerForm:{
          paperId:"",
          studentId:"",
          longId:"",
          topic:{
            answer:"",
            queId:"",
          }
        },
        modelForm: {
          paperId:"",
          title:"",
          content:"",
          remarks:"",
          longId:"",
          topic: [{
            singleContent:"",
            queType: 0,
            queNum:"",
            options:[],
            /*问卷id*/
            // type:[],
            answer:"",
            queId:"",
          }]
        },
        // editorOption:{
        //   modules:{
        //     toolbar:[
        //       ['bold', 'italic'], //加粗，斜体，下划线，删除线
        //       ['blockquote'],  //引用，代码块
        //       [{ 'header': 1 }, { 'header': 2 }],  // 标题，键值对的形式；1、2表示字体大小
        //       [{ 'list': 'ordered'}, { 'list': 'bullet' }],  //列表
        //       [{ 'indent': '-1'}, { 'indent': '+1' }],  // 缩进
        //       [{ 'align': []}],  // 缩进
        //     ]
        //   }
        // }
      }

    },
    created(){
      /*获取试卷的所有条目信息*/
      this.modelForm.paperId=this.$route.params.id;
      this.modelForm.longId=this.$route.params.longId;
      console.log("longId",this.modelForm.longId);
      // this.modelForm.title=this.$route.params.title;
      // this.modelForm.content=this.$route.params.content;
      // this.modelForm.remarks=this.$route.params.remarks;
      this.get("paper/getPaperAnswerQueList",(res)=>{
        console.log("res.data",res.data);
        this.modelForm.topic=res.data;
        console.log(this.modelForm);
      },{paper_id:this.$route.params.id});
        this.get("paper/getOne",(res)=>{
          this.modelForm.title=res.data.title;
          this.modelForm.content=res.data.content;
          this.modelForm.remarks=res.data.remarks;
          console.log(res.msg);
        },{id:this.modelForm.paperId});
        this.buttonText="修改"
    },
    methods: {
    //选中受理机构
      handleChange (item) {
        // this.$emit('change', this.modelForm.topic.type);
        item.answer="";
        if(item.options[7]){
          item.answer=item.answer+item.options[7];
        }if(item.options[8]){
          item.answer=item.answer+item.options[8];
        }if(item.options[9]){
          item.answer=item.answer+item.options[9];
        }if(item.options[10]){
          item.answer=item.answer+item.options[10];
        }if(item.options[11]){
          item.answer=item.answer+item.options[11];
        }if(item.options[12]){
          item.answer=item.answer+item.options[13];
        }
        console.log("value"+item.answer);
      },
      end(evt) {
        this.$refs.modelForm.clearValidate()

      },
      addSubmit(modelForm) {
        const paper={};
        const PaperAnswerQueList = [];
        modelForm.topic.forEach((item, index) => {
          const PaperAnswerQue = {};
          PaperAnswerQue.answer = item.answer;
          PaperAnswerQue.studentId = "111111";
          PaperAnswerQue.queId = item.queId;
          PaperAnswerQueList.push(PaperAnswerQue);
        });
        paper.paperId=modelForm.paperId;
        paper.longId=modelForm.longId;
        paper.PaperAnswerQueList=PaperAnswerQueList;
        console.log("paper"+paper);
        this.insertPaperAnswerQueInfoList(paper)
      },
      /*插入数据库*/
      insertPaperAnswerQueInfoList(paper) {
        this.axios({
          method: 'post',
          url: 'paperAnswer/insertAnswerList',
          data: paper,
        })
          .then(result => {
            console.log("map"+result.data.data.responseList);
            if (result.data.statu === 0) {
              this.tableData = result.data.data.responseList;
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
    padding: 100px  50px;
    background-color: #FFFFFF;
    display: inline-block;
    width: 70%;
  }
  .left{
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
  /*题目样式*/
  .InputProblem{
    width: 100%;
    height: 35px;
    /*padding: 10px 20px;*/
    /* 这里是去除掉input的默认样式然后修改为自己的 */
    background:none;
    outline:none;
    border:0px;
    font-size: 16px;
    text-align: left;
    color: #494949;
    /* 这里是修改为自己的样式 */
    /*border-bottom: 0px solid #dcdcdc;*/
    /*border-bottom-left-radius: 1px;*/
    /*border-bottom-right-radius: 1px;*/
    /* 使用怪异盒模型，也可以不使用 */
    /*box-sizing: border-box;*/
  }
  .InputAnswer{
    width: 95%;
    height: 35px;
    /*padding: 10px 20px;*/
    /* 这里是去除掉input的默认样式然后修改为自己的 */
    background:none;
    outline:none;
    border:0px;
    font-size: 16px;
    text-align: left;
    color: #494949;
    /* 这里是修改为自己的样式 */
    border-bottom: 1px solid #8e8bab;
    /*border-bottom-left-radius: 1px;*/
    /*border-bottom-right-radius: 1px;*/
    /* 使用怪异盒模型，也可以不使用 */
    /*box-sizing: border-box;*/
  }







</style>
