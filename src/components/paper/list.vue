<!--20-4-25试卷列表---Vanilla-->
<template>
  <div>
    <div style="margin-top: 15px;margin-bottom: 10px">
      <el-row>
        <el-col :span="2"><el-button style="background-color: #5fb381;color: #fff" @click="add">添加</el-button></el-col>
        <el-col :span="22">
          <el-input placeholder="请输入标题" v-model="search.title" class="input-with-select" style="width: 200px">
            <el-button slot="append" icon="el-icon-search" @click="findData"></el-button>
          </el-input>
        </el-col>
      </el-row>
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
        label="试卷编号">
      </el-table-column>
      <el-table-column
        prop="title"
        label="试卷标题">
      </el-table-column>
      <el-table-column
        prop="content"
        label="试卷内容">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="试卷说明">
      </el-table-column>
      <el-table-column
        prop="provideNumber"
        label="发放数量">
      </el-table-column>
      <el-table-column
        prop="joinNumber"
        label="回收数量">
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
          <el-button @click="edit(scope.row)" style="color:#17B3A3" type="text" size="small" icon="el-icon-edit">修改</el-button>
          <el-button type="text" size="small" style="color:red" @click="del(scope.row)"  icon="el-icon-delete">{{deltext(scope.row.active)}}</el-button>
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
  import EditPaper from '@/components/paper/edit'
  // import DetailsPaper from '@/components/paper/details'
  export default {
    inject:['reload'],
    name:"paper",
    data () {
      return {
        search:{
          title:""
        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          title:""
        },
        tableData:{}
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
        this.get("paper/list",(res)=>{
          this.tableData=res.data;
          console.log(res.msg);
        },this.queryParams);
      },
      sexformat(row, column, cellValue, index){
        return cellValue==1?"女":"男";
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
            content: EditPaper, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','600px'],
          title: '添加管理员',
          shadeClose: false,
          shade :true
        });
      },
      edit(row){
        this.$layer.iframe({
          type:2,
          content: {
            content: EditPaper, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '修改管理员',
          shadeClose: false,
          shade :true
        });
      },
      // details(row){
      //   this.$layer.iframe({
      //     content: {
      //       content: DetailsPaper, //传递的组件对象
      //       parent: this,//当前的vue对象
      //       data:{id:row.id}//props
      //     },
      //     area:['800px','600px'],
      //     title: '查看内容',
      //     shadeClose: false,
      //     shade :true
      //   });
      // },
      del(row){
        this.delete("paper/del",row.id,row.active);
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
