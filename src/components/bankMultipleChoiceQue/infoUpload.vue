<!--4-14单选题文件上传-->
<template>
  <div class="app-container">
    <div style="display: flex;justify-content: center;margin-bottom: 20px">
      <el-button v-waves :loading="downloadLoading" style="background-color: #4ab7bd;border-color: #4ab7bd" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        请先下载多选题信息上传模板
      </el-button>
    </div>
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <div v-if="allItemCount" style="margin-top: 15px" >
      <span style="color: #4ab7bd">上传总记录条数：{{ allItemCount }}</span>
      <span style="color: #67c23a;margin-left: 30px">成功总记录条数：{{ successItemCount }}</span>
      <span style="color: #FF0000;margin-left: 30px">失败总记录条数：{{ failItemCount }}</span>
    </div>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item"  :prop="item" :label="item"  />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index'//上传文件
import waves from '@/directive/waves' // Waves directive
import qs from "qs"
// import { reqInsertBankMultipleChoiceQueInfoList } from '@/api/bankMultipleChoiceQue'
export default {
  name: 'InfoUpload',
  components: { UploadExcelComponent },
  directives: { waves },
  data() {
    return {
      downloadLoading: false,
      tableData: [],
      tableHeader: [],
      allItemCount: 0,
      successItemCount: 0,
      failItemCount: 0
    }
  },
  methods: {
    // sexformat(item){
    //  for (var i=0;i<item.length;i++){
    //    if
    //  }
    //   // if(row.key==='sex'){
    //   //   return cellValue==1?"女":"男";
    //   // }
    //
    // },
    handleDownload() {
      this.downloadLoading = true;
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '(必填)题目内容',
          '(必填)选项A',
          '(必填)选项B',
          '(必填)选项C',
          '(必填)选项D',
          '(必填)选项E',
          '(必填)选项F',
          '(必填)选项G',
          '(必填)所属类型',
        ]
        excel.export_json_to_excel({
          header: tHeader,
          data: [],
          filename: '双选题信息上传模板'
        })
        this.downloadLoading = false
      })
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '请上传小于1M的文件',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      const bankMultipleChoiceQueList = []
      results.forEach((item, index) => {
        const bankMultipleChoiceQue = {};
        Object.keys(item).forEach((key) => {
          if (key === '(必填)题目内容') {
            bankMultipleChoiceQue.multipleContent = (String)(item[key])
          }
          if (key === '(必填)选项A') {
            bankMultipleChoiceQue.choiceA = item[key]
          }  if (key === '(必填)选项B') {
            bankMultipleChoiceQue.choiceB = item[key]
          }  if (key === '(必填)选项C') {
            bankMultipleChoiceQue.choiceC = item[key]
          }  if (key === '(必填)选项D') {
            bankMultipleChoiceQue.choiceD = item[key]
          }  if (key === '(必填)选项E') {
            bankMultipleChoiceQue.choiceE = item[key]
          }  if (key === '(必填)选项F') {
            bankMultipleChoiceQue.choiceF = item[key]
          }  if (key === '(必填)选项G') {
            bankMultipleChoiceQue.choiceG = item[key]
          }
          if (key === '(必填)所属类型') {
            bankMultipleChoiceQue.multipleType = item[key]
          }
        });
        bankMultipleChoiceQueList.push(bankMultipleChoiceQue)
      });
      this.insertBankMultipleChoiceQueInfoList(bankMultipleChoiceQueList)
    },
    // 插入数据库学生信息表
     insertBankMultipleChoiceQueInfoList(bankMultipleChoiceQueList) {
       this.axios({
         method: 'post',
         url: 'bankMultipleChoiceQue/insertBankMultipleChoiceQueInfoList',
         data: {bankMultipleChoiceQueList},
       })
        .then(result => {
          // console.log("map"+result.data);
          if (result.data.statu === 0) {
            this.tableHeader = ['题目内容',
                                '选项A',
                                '选项B',
                                '选项C',
                                '选项D',
                                '选项E',
                                '选项G',
                                '所属类型',
                                '上传状态'];
            this.tableData = result.data.data.responseList;
            this.allItemCount = result.data.data.allItemCount;
            this.successItemCount = result.data.data.successItemCount;
            this.failItemCount = result.data.data.failItemCount;
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
      // const result = await reqInsertBankMultipleChoiceQueInfoList(bankMultipleChoiceQueList)

    }
  }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>

</style>
