<!--20-5-10试卷列表---Vanilla-->
<template>
  <div>
<!--    <el-row >-->
<!--      <el-col :span="6" v-for="(item,index) in tableData.list" :key="item.longId">-->

<!--        <el-card :body-style="{ padding: '2px' }" style="margin-right: 10px" >-->
<!--          <div style="padding: 14px;">-->
<!--            <span>序号：{{ parseInt(tableData.total) -(parseInt(tableData.pageNum)-1)*parseInt(tableData.size)-parseInt(index) }}</span>-->
<!--            <br><br>-->
<!--            <span>试卷标题：{{ item.title }}</span>-->
<!--            <br><br>-->
<!--            <span>创建时间：{{ item.createDate }}</span>-->
<!--            <br><br>-->
<!--            <button @click="toAnswerView(item)">查看详情</button>-->
<!--          </div>-->
<!--        </el-card>-->

<!--      </el-col>-->
<!--    </el-row>-->
    <el-row>
      <el-col :span="3">
        <el-button v-waves :loading="downloadLoading" style="margin-left: 0;background-color: #5fb381" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownloadAll">
          导出全部数据信息
        </el-button>
      </el-col>
    </el-row>
    <el-container style="">
      <!--整个问卷div-----------------0-->
      <el-main style="">
        <!--右侧问卷-----------------0-->
        <div class="right">
          <span style="text-align: left;font-size: 28px">序号：{{ parseInt(tableData.total) -(parseInt(tableData.pageNum)-1)*parseInt(tableData.size)}}</span>
          <div>
            <el-form :model="modelForm" label-position="right">
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
                <vuedraggable v-model="modelForm.topic" class="wrapper"  >
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
                          <el-col :span="3">
                            <span>{{item.queNum}}.(单选)</span>
                          </el-col>
                          <el-col :span="20">
                            <input v-model.trim="item.singleContent" class="InputProblem" clearable placeholder="请填写问题" disabled>
                            </input>
                          </el-col>
                        </el-row>
                        <!--选项-->
                        <el-radio-group v-model="item.answer" style="margin-left: 30px;text-align: left;display: block;margin-top: 10px" disabled>
                          <el-radio v-for="opt in item.options" :key="opt.value" :label="opt.value" v-if="opt.label!=='null'" >
                            {{opt.label}}&nbsp;
                          </el-radio><br>
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
                          <el-col :span="3">
                            <span>{{item.queNum}}.(多选)</span>
                          </el-col>
                          <el-col :span="20">
                            <input v-model.trim="item.singleContent" class="InputProblem" clearable placeholder="请填写问题" disabled>
                            </input>
                          </el-col>
                        </el-row>
                        <!--选项-->
                        <div v-for="opt in item.answers" style="text-align: left">
                          <el-checkbox  style="margin-left: 0px" :label="opt.value" :key="opt.value" v-if="opt.value==='1'" checked disabled>
                            {{opt.label}}&nbsp;
                          </el-checkbox>
                          <el-checkbox :label="opt.value" :key="opt.value" v-if="opt.value!=='1'&&opt.label!=null" disabled>
                            {{opt.label}}&nbsp;
                          </el-checkbox>
                        </div>
                        <!--                          <el-checkbox v-for="opt in item.options" :label="opt.value" :key="opt.value" v-if="opt.label!=='null'&&opt in answers" true-label>-->
                        <!--                            {{opt.label}}&nbsp;-->
                        <!--                          </el-checkbox>-->
                      </el-form-item>
                    </div>
                    <!--填空----2-->
                    <div v-else-if="item.queType===2">
                      <el-form-item
                        :prop="`topic.${index}.singleContent`"
                        style="=">
                        <!--问题-->
                        <el-row>
                          <el-col :span="3">
                            <span>{{item.queNum}}.(填空)</span>
                          </el-col>
                          <el-col :span="20">
                            <input v-model.trim="item.singleContent" class="InputProblem" clearable placeholder="请填写问题" disabled>
                            </input>
                          </el-col>
                        </el-row>
                        <el-row>
                          <input v-model.trim="item.answer" class="InputAnswer" clearable disabled v-if="item.answer!=='null'"/>
                          <input value="未作答"  class="InputAnswer" clearable disabled v-else/>
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
                          <el-col :span="3">
                            <span>{{item.queNum}}.(评分)</span>
                          </el-col>
                          <el-col :span="20">
                            <input v-model.trim="item.singleContent" class="InputProblem" clearable placeholder="请填写问题" disabled>
                            </input>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-rate  style="text-align: left;margin-left: 30px;height: 50px;margin-top: 10px" v-model="item.answer">{{parseInt(item.answer)}}</el-rate>
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
                            <span>{{item.queNum}}.</span>
                          </el-col>
                          <el-col :span="4">
                            <input v-model.trim="item.singleContent" class="InputProblem" clearable placeholder="请填写问题" disabled>
                            </input>
                          </el-col>
                          <el-col :span="17">
                            <input v-model="item.answer" class="InputAnswer" style="margin-left: 0px" clearable  disabled>
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
                          <el-col :span="1">
                            <span>{{item.queNum}}.</span>
                          </el-col>
                          <el-col :span="4">
                            <input v-model.trim="item.singleContent" class="InputProblem" clearable placeholder="请填写问题" disabled>
                            </input>
                          </el-col>
                          <el-col :span="17">
                            <input v-model="item.answer" class="InputAnswer" clearable  disabled>
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
                          <el-col :span="3">
                            <span>{{item.queNum}}.</span>
                          </el-col>
                          <el-col :span="1">
                            <input v-model.trim="item.singleContent" class="InputProblem" clearable placeholder="请填写问题" disabled>
                            </input>
                          </el-col>
                          <el-col :span="20">
                            <input v-model="item.answer"  class="InputAnswer" clearable  disabled>
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
                            <span>{{item.queNum}}.</span>
                          </el-col>
                          <el-col :span="2">
                            <input v-model.trim="item.singleContent" class="InputProblem" clearable placeholder="请填写问题" disabled>
                            </input>
                          </el-col>
                          <el-col :span="18">
                            <input  v-model="item.answer" class="InputAnswer" clearable disabled >
                            </input>
                          </el-col>
                        </el-row>
                      </el-form-item>
                      <!-- 答案 -->
                    </div>
                  </div>
                </vuedraggable>
              </div>
            </el-form>
          </div>
        </div>
        <!--右侧问卷-----------------1-->
      </el-main>
      <!---整个问卷div------1-->
    </el-container>
<!--      <el-table-column label="查看内容">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button @click="details(scope.row)" style="color:#17B3A3" type="text" size="small" icon="el-icon-document">查看内容</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--        <div v-for="item in tableData.list">-->
<!--         <span v-model="longId">{{item.longId}}</span>-->
<!--        </div>-->
    <br>
    <el-pagination
      background
      layout="prev, pager, next,total"
      :total="tableData.total"
      :current-page="this.queryParams.pageNo"
      :page-size="this.queryParams.pageSize"
      @current-change="changePageNo">
    </el-pagination>
  </div>
</template>

<script>
  import vuedraggable from 'vuedraggable'
  import waves from '@/directive/waves' // Waves directive
  export default {
    // inject:['reload'],
    name:"sumView",
    components: {
      vuedraggable
    },
    directives: { waves },
    data () {
      return {
        downloadLoading: false,
        longId:"",
        queryParams:{
          pageNo:1,
          pageSize:1,
          paperId:""
        },
        tableData:{},
        list1:[],
        modelForm: {
          paperId:"",
          title:"",
          content:"",
          remarks:"",
          longId:"",
          topic: [{
            singleContent:"",
            queType: "",
            queNum:"",
            options:[],
            /*问卷id*/
            // type:[],
            answer:"",
            answers:[],
            queId:"",
          }]
        },
        answerslist:{},
      }
    },
    created(){

      this.getData();
    },
    watch:{
      queryParams:{
        handler:function(){
          this.getData();
        },
        deep:true
      },

    },
    mounted(){},
    methods:{
      getData(){
        this.queryParams.paperId=this.$route.params.paperId;
        // console.log("paperId",this.queryParams.paperId);
        this.get("sumView/list",(res)=>{
          this.tableData=res.data;
          this.modelForm.longId=this.tableData.list[0].longId;
          this.modelForm.title=this.tableData.list[0].title;
          this.modelForm.content=this.tableData.list[0].content;
          this.modelForm.remarks=this.tableData.list[0].remarks;
          console.log("this.tableData.list",this.tableData.list[0].longId);
          this.get("sumView/getAnswerView",(res)=>{
            console.log("res.data",res.data);
            this.modelForm.topic=res.data;
            console.log(this.modelForm.topic);
            console.log("longId", this.modelForm.longId);
          },{longId: this.modelForm.longId});
        },this.queryParams);



        // console.log(this.list1);
        // // var longId=this.list1[0].longId;
        // console.log("longID",this.list1[0].longId)
        // this.get("sumView/getAnswerView",(res)=>{
        //   console.log("res.data",res.data);
        //   this.modelForm.topic=res.data;
        //   console.log(this.modelForm.topic);
        // },{longId:this.tableData.list.longId});
      },
      changePageNo(i){
        this.queryParams.pageNo=i;
      },
      /*导出全部学生*/
      handleDownloadAll(){
        this.downloadLoading = true;
        this.get("sumView/getAllAnswersToExcel",(res)=>{
          this.answerslist=res.data;
          console.log("全部answers"+ res.data);

        // let list = JSON.stringify(this.students);
        // console.log("list"+list);
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = [];
          this.modelForm.topic.forEach((item, index) => {
           tHeader.push(item.queNum +"."+item.singleContent);
          });
          console.log("theader",tHeader);
          const filterVal = [];
          this.modelForm.topic.forEach((item, index) => {
            filterVal.push("answer"+index);
          });
          console.log("file",filterVal);
          console.log("filterVal",filterVal);
          // const answers = {};
          // const list=[];
          //   answers.answer0=this.modelForm.topic[0].answer;
          //   console.log("ans",this.modelForm.topic[0].answer);
          //   answers.answer0=this.modelForm.topic[1].answer;
          //   answers.answer1=this.modelForm.topic[2].answer;
          //   answers.answer2=this.modelForm.topic[3].answer;
          //   answers.answer3=this.modelForm.topic[4].answer;
          //   answers.answer4=this.modelForm.topic[5].answer;
          //  // list.push(answers);
          // list.push(answers);
          // console.log("answers",list);
          // let homeObj = JSON.stringify(this.answerslist);
          // console.log("h",homeObj);
          const data = this.formatJson(filterVal, this.answerslist);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.modelForm.title
          })
          this.downloadLoading = false;
        })
        },{paperId: this.queryParams.paperId});
      },
      /*格式化*/
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'sex') {
            return v[j] === '1' ? '女' : '男'
          } else if (j === 'mail') {
            return v[j] || '暂无绑定邮箱'
          } else if (j === 'phone') {
            return v[j] || '暂无绑定手机号'
          } else {
            return v[j]
          }
        }))
      },
      //查看详情
      toAnswerView(item){
        this.$router.push("/"+item.paperId+"/"+item.longId);
      }
    }
  }
</script>

<style scoped>
  .el-table .cell {
    text-align: center;
  }
  .el-table__header th, .el-table__header tr {
    background-color: #5fb381;
    color: black;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #5fb381;
    color: #FFF;
  }
</style>
<style scoped>
  /*问卷左右布局*/
  .right{
    padding: 20px;
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
    /*border-bottom: 1px solid #8e8bab;*/
    /*border-bottom-left-radius: 1px;*/
    /*border-bottom-right-radius: 1px;*/
    /* 使用怪异盒模型，也可以不使用 */
    /*box-sizing: border-box;*/
  }







</style>
