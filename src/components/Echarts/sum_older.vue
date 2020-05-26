<style scoped>
  h2{
    padding: 30px;
    font-size: 18px;
  }
  /*#chart_example1{*/
  /*  width: 550px;*/
  /*  height: 350px;*/
  /*  background-color: #ffffff;*/
  /*  padding-top: 10px;*/
  /*}*/
  #chart_example2{
    width: 550px;
    height: 300px;
    background-color: #ffffff;
    padding-top: 10px;
  }
  #chart_example3{
    width: 550px;
    height: 350px;
    background-color: #ffffff;
    padding-top: 10px;
  }
  #chart_example4{
    width: 1100px;
    height: 550px;
    background-color: #ffffff;
    padding-top: 10px;
  }
</style>

<template>
  <div style="padding: 20px">
<!--    <div style="display:inline-block;margin-top: 10px">-->
<!--      <div id="chart_example3" style="display:inline-block;"></div>-->
<!--    </div>-->
<!--    <div style="display:inline-block;margin-top: 10px">-->
<!--      <el-row>-->
<!--        <el-col :span="12">-->
<!--          &lt;!&ndash;老人性别比例&ndash;&gt;-->
<!--          <div id="chart_example1" style="display:inline-block;margin-top: 5px;"></div>-->
<!--        </el-col>-->
<!--       <el-col :span="12">-->
<!--         &lt;!&ndash;老人健康状态分布&ndash;&gt;-->
    <el-row>
      <el-col :span="16">
        <h>题目：{{ruleForm.singleContent}}</h>
      </el-col>
      <el-col :span="8">
        <h>题目类型：{{ruleForm.singeType}}</h>
      </el-col>
    </el-row>
    <br>
    <el-table
      :data="tablelist"
      stripe
      style="width: 100%">
      <el-table-column
        prop="contents"
        label="选项"
        width="180">
      </el-table-column>
      <el-table-column
        prop="dataSingAnswerCount"
        label="个数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sum_percent"
        label="百分比"
        width="180">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="name"-->
<!--        label="总计"-->
<!--        width="180">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="address"-->
<!--        label="百分比">-->
<!--      </el-table-column>-->
    </el-table>
         <div id="chart_example2" style="display:inline-block;margin-top: 5px;"></div>
<!--       </el-col>-->
<!--      </el-row>-->
<!--      <el-row>-->
<!--        <el-col :span="10">-->
<!--          &lt;!&ndash;老人年龄段分布&ndash;&gt;-->
<!--          <div id="chart_example3" style="margin-top: 5px;"></div>-->
<!--        </el-col>-->
<!--        <el-col :span="20">-->

<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-row>-->
<!--        &lt;!&ndash;高压分布&ndash;&gt;-->
<!--        <div id="chart_example4" style="display:inline-block;margin-top: 80px" ></div>-->
<!--      </el-row>-->

<!--    </div>-->

<!--    <div id="chart_example3" style="margin-top: 5px;"></div>-->

  </div>
</template>


<script>
  import echarts from 'echarts';
  export default {
    inject:['reload'],
    props:["id"],
    data () {
      return {
        search:{
          // roomTypeid:"",
          status:0
        },
      ruleForm:{

      },
        tablelist:{

        },

        // tableData:{},
        // guestTypes:{}
      }
    },
    mounted() {},
    watch: {

    },
    created(){
     this.getData();

    },
    methods:{
      getData(){
        /*获取单选题信息*/
        this.get("bankSingleChoiceQue/getOne",(res)=>{
          this.ruleForm=res.data;
          console.log(this.ruleForm);
          //获取单选题信息
          this.get("sumView/SumSingleAnswerByQueId",(res)=>{
            console.log("统计："+res.SingleAnswers);
            let i=0;
            let j=0;
            /*性别统计*/
            // const datam=[];
            // for( i ; i<data.sexs.length;i++){
            //   datam.push(data.sexs[i].count)
            // }
            /*单选题统计情况*/
            const dataSingAnswerCount=[];//答题计数
            const contents=[];//选项内容
            const choices=[];//abcd选项

            if(this.ruleForm.choiceA!==null){
              contents[0]=this.ruleForm.choiceA;
              choices[0]="A";
            }
            if(this.ruleForm.choiceB!==null){
              contents[1]=this.ruleForm.choiceB;
              choices[1]="B";
            }if(this.ruleForm.choiceC!==null){
              contents[2]=this.ruleForm.choiceC;
              choices[2]="C";
            }
            console.log("回答数："+res.SingleAnswers.length);
            console.log("choices",choices);
            let sum=0;
            for(j=0;j<res.SingleAnswers.length;j++){
              for( i=j ; i<choices.length;i++){
                console.log("res.SingleAnswers[i].answer",res.SingleAnswers[j].answer);
                console.log("choices",choices[i]);
                if(res.SingleAnswers[j].answer === choices[i]){
                  dataSingAnswerCount.push(res.SingleAnswers[j].count);
                  console.log("单选题回答人数："+res.SingleAnswers[j].count);
                  sum=sum+res.SingleAnswers[j].count;
                  break;
                }else {
                  dataSingAnswerCount.push(0);
                }

              }

            }
            console.log("dataSingAnswerCount",dataSingAnswerCount);
            /*表格数据渲染*/
            const tablelist = [];//表格列表

            for( i=0 ; i<choices.length;i++){
              const table_row = {};
              table_row.contents=contents[i];
              if(dataSingAnswerCount[i]){
                table_row.dataSingAnswerCount=dataSingAnswerCount[i];
              }
              else{
                table_row.dataSingAnswerCount=0;
                dataSingAnswerCount[i]=0;
              }
              if(sum===0){
                table_row.sum_percent="00.00%";
              }else {
                table_row.sum_percent=Number((dataSingAnswerCount[i])/sum*100).toFixed(2)+"%";
              }

              tablelist.push(table_row);
            }
            this.tablelist=tablelist;

            /*性别统计表*/
            // let myChart1 = echarts.init(document.getElementById('chart_example1'));
            /*老人健康统计*/
            let myChart2 = echarts.init(document.getElementById('chart_example2'));
            /*老人年龄段分布*/
            // let myChart3 = echarts.init(document.getElementById('chart_example3'));
            // let myChart4 = echarts.init(document.getElementById('chart_example4'));

            /*性别统计*/
            let option2 = {
              //下载统计图
              toolbox:{
                feature:{
                  saveAsImage:{}
                }
              },
              // tooltip:{
              //   trigger:'item',
              //
              // },
              title: {
                text:this.ruleForm.singleContent,      //主标题
                textStyle:{
                  color:'#009688',        //颜色
                  fontStyle:'normal',     //风格
                  fontWeight:'normal',    //粗细
                  fontFamily:'Microsoft yahei',   //字体
                  fontSize:20,     //大小
                },
                left:'center'
              },
              color: ['#f44'],
              tooltip : {
                trigger: 'axis',
                axisPointer : {
                  type : 'shadow'
                },
                // formatter:'{c}%'
              },
              xAxis : [
                {
                  type : 'category',
                  data: contents,
                  name:'选项',
                  axisTick: {
                    alignWithLabel: true
                  }
                }
              ],
              yAxis : [
                {
                  name:'所占百分比%',
                  type : 'value'
                }
              ],
              series : [
                {
                  name:'选择人数',
                  type:'bar',
                  barWidth: '4%',
                  data: dataSingAnswerCount,
                  label: {
                    normal: {
                      fontSize:20,
                      show: true,
                      // formatter:'{c}%'
                    }
                  },
                }
              ]
            };
            /*老人性别统计*/
            // myChart1.setOption(option1);
            // window.addEventListener('resize',function() {myChart1.resize()});
            /*老人健康状态统计*/
            myChart2.setOption(option2);
            window.addEventListener('resize',function() {myChart2.resize()});
          },{queId:this.id});
          },{id:this.id});

      }
    }
  }
</script>
<style>
  /*.el-table .cell {*/
  /*  text-align: center;*/
  /*}*/
  .el-table__header th, .el-table__header tr {
    background-color: #FAFAFA;
    color: black;
  }
</style>

