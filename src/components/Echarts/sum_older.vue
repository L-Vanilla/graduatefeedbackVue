<style scoped>
  h2{
    padding: 30px;
    font-size: 18px;
  }
  #chart_example1{
    width: 550px;
    height: 350px;
    background-color: #ffffff;
    padding-top: 10px;
  }
  #chart_example2{
    width: 550px;
    height: 350px;
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
  <div>
<!--    <div style="display:inline-block;margin-top: 10px">-->
<!--      <div id="chart_example3" style="display:inline-block;"></div>-->
<!--    </div>-->
    <div style="display:inline-block;margin-top: 10px">
      <el-row>
        <el-col :span="12">
          <!--老人性别比例-->
          <div id="chart_example1" style="display:inline-block;margin-top: 5px;"></div>
        </el-col>
       <el-col :span="12">
         <!--老人健康状态分布-->
         <div id="chart_example2" style="display:inline-block;margin-top: 5px;"></div>
       </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <!--老人年龄段分布-->
          <div id="chart_example3" style="margin-top: 5px;"></div>
        </el-col>
        <el-col :span="20">

        </el-col>
      </el-row>
      <el-row>
        <!--高压分布-->
        <div id="chart_example4" style="display:inline-block;margin-top: 80px" ></div>
      </el-row>

    </div>

<!--    <div id="chart_example3" style="margin-top: 5px;"></div>-->

  </div>
</template>


<script>
  import echarts from 'echarts';
  export default {
    data () {
      return {
        search:{
          // roomTypeid:"",
          status:0
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
        //老人统计图
        this.get("older/SumOlder",(data)=>{

          console.log("统计："+data);
          let i=0;
          /*性别统计*/
          const datam=[];
          for( i ; i<data.sexs.length;i++){
            datam.push(data.sexs[i].count)
          }
          /*老人健康状态统计*/
          const dataState=[];
          console.log("状态数："+data.healthStates.length);
          for( i=0 ; i<data.healthStates.length;i++){
            dataState.push(data.healthStates[i].count);
            console.log("健康状态人数："+data.healthStates[i].count);
          }
          /*老人年龄分布*/
          const dataAge=[];
          console.log("年龄数："+data.ages.length);
          for( i=0 ; i<data.ages.length;i++){
            dataAge.push(data.ages[i].count);
          }

          /*性别统计表*/
          let myChart1 = echarts.init(document.getElementById('chart_example1'));
          /*老人健康统计*/
          let myChart2 = echarts.init(document.getElementById('chart_example2'));
          /*老人年龄段分布*/
          let myChart3 = echarts.init(document.getElementById('chart_example3'));
          // let myChart4 = echarts.init(document.getElementById('chart_example4'));

          /*性别统计*/
          let option1 = {
            series: [{
              type: 'pie',
              name: '',
              radius: [20, 40],
              hoverAnimation: false,
              silent: true,
              clockwise: false,
              data: [{
                value: 0,
                name: '',
                label: {
                  normal: {
                    show: true,
                    position: 'center',
                    formatter: '老人性别',
                    color: '#000000',
                    fontSize: 20,
                    fontWeight: 'bold'
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#ccc',
                    shadowBlur: 50,
                    shadowColor: 'yellow',
                    show: true
                  }
                }
              }]
            },

              {
                type: 'pie',
                radius: [40, 60],
                hoverAnimation: false,
                silent: true,
                data: [{
                  value: 0,
                  name: '大',
                  label: {
                    normal: {
                      show: true,
                      position: 'center',
                      formatter: '\n\n\n\n比例',
                      color: '#000000',
                      fontSize: 20,
                      fontWeight: 'bold'
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#ccc',
                      shadowBlur: 50,
                      shadowColor: 'yellow',
                    }
                  }
                }]
              }, {
                type: 'pie',
                radius: [130, 20],
                hoverAnimation: false,
                data: [{
                  value: datam[0],
                  name: '男',
                  label: {
                    normal: {
                      color: '#3888b3',
                      fontSize: 16,
                      formatter: '{b}：{c}\n\n比例：{d}%'
                    }
                  },
                  labelLine: {
                    normal: {
                      length: 120
                    }
                  }
                }, {
                  value: datam[1],
                  name: '女',
                  label: {
                    normal: {
                      color: '#d176ca',
                      fontSize: 16,
                      formatter: '{b}：{c}\n\n比例：{d}%'
                    }
                  },
                  labelLine: {
                    normal: {
                      length: 120
                    }
                  }
                }]
              }
            ]
          };

          /*老人健康统计*/
          let option2 = {
            series: [{
              type: 'pie',
              name: '',
              radius: [20, 40],
              hoverAnimation: false,
              silent: true,
              clockwise: false,
              data: [{
                value: 0,
                name: '',
                label: {
                  normal: {
                    show: true,
                    position: 'center',
                    formatter: '老人健康',
                    color: '#000000',
                    fontSize: 20,
                    fontWeight: 'bold'
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#ccc',
                    shadowBlur: 50,
                    shadowColor: 'yellow',
                    show: true
                  }
                }
              }]
            },
              {
                type: 'pie',
                radius: [40, 60],
                hoverAnimation: false,
                silent: true,
                data: [{
                  value: 0,
                  name: '大',
                  label: {
                    normal: {
                      show: true,
                      position: 'center',
                      formatter: '\n\n\n\n状态统计',
                      color: '#000000',
                      fontSize: 20,
                      fontWeight: 'bold'
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#ccc',
                      shadowBlur: 50,
                      shadowColor: 'yellow',
                    }
                  }
                }]
              }, {
                type: 'pie',
                radius: [130, 20],
                hoverAnimation: false,
                data: [{
                  value: dataState[0],
                  name: '优',
                  label: {
                    normal: {
                      color: '#47b34f',
                      fontSize: 16,
                      formatter: '{b}：{c}\n\n比例：{d}%'
                    }
                  },
                  labelLine: {
                    normal: {
                      length: 120
                    }
                  }
                },
                  {
                  value: dataState[1],
                  name: '良',
                  label: {
                    normal: {
                      color: '#75d1af',
                      fontSize: 16,
                      formatter: '{b}：{c}\n\n比例：{d}%'
                    }
                  },
                  labelLine: {
                    normal: {
                      length: 120
                    }
                  }
                },
                  {
                  value: dataState[2],
                  name: '一般',
                  label: {
                    normal: {
                      color: '#b3a44a',
                      fontSize: 16,
                      formatter: '{b}：{c}\n\n比例：{d}%'
                    }
                  },
                  labelLine: {
                    normal: {
                      length: 120
                    }
                  }
                },
                  {
                  value: dataState[3],
                  name: '差',
                  label: {
                    normal: {
                      color: '#d14941',
                      fontSize: 16,
                      formatter: '{b}：{c}\n\n比例：{d}%'
                    }
                  },
                  labelLine: {
                    normal: {
                      length: 120
                    }
                  }
                },
                ]
              }
            ]
          };
          /*老人年龄分布*/
          let option3 = {
            series: [{
              type: 'pie',
              name: '',
              radius: [20, 40],
              hoverAnimation: false,
              silent: true,
              clockwise: false,
              data: [{
                value: 0,
                name: '',
                label: {
                  normal: {
                    show: true,
                    position: 'center',
                    formatter: '老人年龄',
                    color: '#000000',
                    fontSize: 20,
                    fontWeight: 'bold'
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#ccc',
                    shadowBlur: 50,
                    shadowColor: 'yellow',
                    show: true
                  }
                }
              }]
            },
              {
                type: 'pie',
                radius: [40, 60],
                hoverAnimation: false,
                silent: true,
                data: [{
                  value: 0,
                  name: '大',
                  label: {
                    normal: {
                      show: true,
                      position: 'center',
                      formatter: '\n\n\n\n分布',
                      color: '#000000',
                      fontSize: 20,
                      fontWeight: 'bold'
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#ccc',
                      shadowBlur: 50,
                      shadowColor: 'yellow',
                    }
                  }
                }]
              }, {
                type: 'pie',
                radius: [130, 20],
                hoverAnimation: false,
                data: [{
                  value: dataAge[0],
                  name: '小于50',
                  label: {
                    normal: {
                      color: '#47b34f',
                      fontSize: 16,
                      formatter: '{b}：{c}\n\n比例：{d}%'
                    }
                  },
                  labelLine: {
                    normal: {
                      length: 120
                    }
                  }
                },
                  {
                  value: dataAge[1],
                  name: '50-60年龄段',
                  label: {
                    normal: {
                      color: '#75d1af',
                      fontSize: 16,
                      formatter: '{b}：{c}\n\n比例：{d}%'
                    }
                  },
                  labelLine: {
                    normal: {
                      length: 120
                    }
                  }
                },
                  {
                  value: dataAge[2],
                  name: '60-70年龄段',
                  label: {
                    normal: {
                      color: '#b3a44a',
                      fontSize: 16,
                      formatter: '{b}：{c}\n\n比例：{d}%'
                    }
                  },
                  labelLine: {
                    normal: {
                      length: 120
                    }
                  }
                },
                  {
                  value: dataAge[3],
                  name: '70-80年龄段',
                  label: {
                    normal: {
                      color: '#d16616',
                      fontSize: 16,
                      formatter: '{b}：{c}\n\n比例：{d}%'
                    }
                  },
                  labelLine: {
                    normal: {
                      length: 120
                    }
                  }
                },{
                  value: dataAge[4],
                  name: '大于80',
                  label: {
                    normal: {
                      color: '#d14941',
                      fontSize: 16,
                      formatter: '{b}：{c}\n\n比例：{d}%'
                    }
                  },
                  labelLine: {
                    normal: {
                      length: 120
                    }
                  }
                },
                ]
              }
            ]
          };

          /*老人性别统计*/
          myChart1.setOption(option1);
          window.addEventListener('resize',function() {myChart1.resize()});
          /*老人健康状态统计*/
          myChart2.setOption(option2);
          window.addEventListener('resize',function() {myChart2.resize()});
          /*老人年龄分布*/
          myChart3.setOption(option3);
          window.addEventListener('resize',function() {myChart3.resize()});
          // myChart4.setOption(option4);
          // window.addEventListener('resize',function() {myChart4.resize()});
        });
        /*体检信息统计图*/
        this.get("exam/SumExam",(data)=>{
          console.log("统计高压："+data.examHighbps.length);
          let i=0;
          /*高压统计*/
          const datahigh=[],datax=[];
          for( i=0 ; i<data.examHighbps.length;i++){
            datax.push(i+1);
            datahigh.push(data.examHighbps[i].count);
            console.log("高压数："+datahigh[i]);
          }
          /*低压统计*/
          const datalow=[];
          for( i=0 ; i<data.examLowbps.length;i++){
            datax.push(i+1);
            datalow.push(data.examLowbps[i].count);
            console.log("低压数："+datalow[i]);
          }


          /*高压统计表*/
          let myChart4 = echarts.init(document.getElementById('chart_example4'));
          /*老人健康统计*/
          // let myChart2 = echarts.init(document.getElementById('chart_example2'));
          /*老人年龄段分布*/
          // let myChart3 = echarts.init(document.getElementById('chart_example3'));
          // let myChart4 = echarts.init(document.getElementById('chart_example4'));

          /*高/低压统计*/
          let option4 = {
            title: {
              text: '高低压次数统计'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['高压', '低压']
            },
            xAxis : [
              {
                type : 'category',
                data : ['<90','90-140','140-180','180+'],
                name:'高压范围(mmHg)',
                position: 'bottom',
                axisTick: {
                  alignWithLabel: true
                }
              },
              {
                type : 'category',
                position: 'middle',
                data : ['<60','60-90','90-110','110+'],
                name:'低压范围(mmHg)',
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis : [
              {
                name:'总次数',
                type : 'value'
              }
            ],
            series : [
              {
                name:'总次数',
                type:'bar',
                barWidth: '10px',
                barGap:'40%',//柱图间距
                data:datahigh,
                label: {
                  normal: {
                    fontSize:20,
                    show: true,
                  }
                },
                itemStyle: {
                  color: '#ce5849',
                }
              },
              {
                name:'总次数',
                type:'bar',
                barWidth: '10px',
                barGap:'30%',//柱图间距
                data:datalow,
                label: {
                  normal: {
                    fontSize:20,
                    show: true,
                  }
                },
                itemStyle: {
                  color: '#7cc0ce',
                }
              },

            ]
          };


          /*高压统计*/
          myChart4.setOption(option4);
          window.addEventListener('resize',function() {myChart4.resize()});
          /*老人健康状态统计*/
          // myChart2.setOption(option2);
          // window.addEventListener('resize',function() {myChart2.resize()});
          /*老人年龄分布*/
          // myChart3.setOption(option3);
          // window.addEventListener('resize',function() {myChart3.resize()});
          // myChart4.setOption(option4);
          // window.addEventListener('resize',function() {myChart4.resize()});
        });
      }
    }
  }
</script>
<style>
  .el-table .cell {
    text-align: center;
  }
</style>

