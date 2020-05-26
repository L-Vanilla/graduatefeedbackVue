<!--20-4-14单选题列表---Vanilla-->
<template>
  <div>
    <div style="margin-top: 15px;margin-bottom: 10px">
    </div>
    <el-table
      :data="tableData.list"
      border
      style="width: 100%;"
      :header-cell-style="{background:'#5fb381',color:'#606266'}">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="singleContent"
        label="题目">
      </el-table-column>
      <el-table-column
        prop="singeType"
        label="所属类型">
      </el-table-column>
      <el-table-column
        prop="queType"
        label="题目类型"
      :formatter="queTypeFormatter">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="添加时间">
      </el-table-column>
<!--      <el-table-column label="查看内容">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button @click="details(scope.row)" style="color:#17B3A3" type="text" size="small" icon="el-icon-document">查看内容</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="sum(scope.row)" style="color:#17B3A3" type="text" size="small" icon="el-icon-edit">查看结果</el-button>
<!--          <el-button type="text" size="small" style="color:red" @click="del(scope.row)"  icon="el-icon-delete">{{deltext(scope.row.active)}}</el-button>-->
        </template>
      </el-table-column>
    </el-table>
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
  import EditBankSingleChoiceQue from '@/components/bankSingleChoiceQue/edit'
  import Sum from '@/components/Echarts/sum_older'
  export default {
    inject:['reload'],
    name:"bankSingleChoiceQue",

    data () {
      return {
        search:{
          singleContent:""
        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          singleContent:""
        },
        tableData:{},
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
      }
    },
    mounted(){},
    methods:{
      getData(){
        this.get("bankSingleChoiceQue/list",(res)=>{
          this.tableData=res.data;
          console.log(this.tableData);
        },this.queryParams);
      },
      queTypeFormatter(row, column, cellValue, index){
       if(cellValue ===0){
         return "单选"
       }else if (cellValue===1) {
         return "多选"
       }else if (cellValue===2) {
         return "填空"
       }else if (cellValue===3) {
         return "评分"
       }else if (cellValue===4) {
         return "姓名"
       }else if (cellValue===5) {
         return "专业"
       }else if (cellValue===6) {
         return "毕业年份"
       }else {
         return "其他"
       }

      },
      changePageNo(i){
        this.queryParams.pageNo=i;
      },
      findData(){
        this.queryParams.pageNo=1;
        this.merge(this.search,this.queryParams);
      },
      add(){
        this.$layer.iframe({
          content: {
            content: EditBankSingleChoiceQue, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','600px'],
          title: '添加题目信息',
          shadeClose: false,
          shade :true
        });
      },
      edit(row){
        this.$layer.iframe({
          type:2,
          content: {
            content: EditBankSingleChoiceQue, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '修改题目信息',
          shadeClose: false,
          shade :true
        });
      },

      sum(row){
        this.$layer.iframe({
          content: {
            content: Sum, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '统计',
          shadeClose: false,
          shade :true
        });
      },
      del(row){
        this.delete("bankSingleChoiceQue/del",row.id,row.active);
      },
      deltext(active){
        return active==1?"删除":"恢复"
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
