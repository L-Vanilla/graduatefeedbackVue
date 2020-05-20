<!--20-4-12学生列表---Vanilla-->
<template>
  <div>
    <div style="margin-top: 15px;margin-bottom: 10px">
      <el-row>
        <el-col :span="2"><el-button style="background-color: #5fb381;color: #fff" @click="add">添加</el-button></el-col>
        <el-col :span="3.5">
          学院：
          <el-input placeholder="请输入学院" v-model="search.college" class="input-with-select" style="width: 110px">
          </el-input>
        </el-col>
        <el-col :span="3.5">
          专业：
          <el-input placeholder="请输入专业" v-model="search.specialty" class="input-with-select" style="width: 110px">
          </el-input>
        </el-col>
        <el-col :span="3.5">
          班级：
          <el-input placeholder="请输入班级" v-model="search.grade" class="input-with-select" style="width: 110px">
          </el-input>
        </el-col>
        <el-col :span="3.5">
          姓名：
          <el-input placeholder="请输入姓名" v-model="search.name" class="input-with-select" style="width: 120px">
          </el-input>
        </el-col>
        <el-col :span="2">
            <el-button icon="el-icon-search" type="primary" style="background-color: #5fb381" @click="findData"></el-button>
        </el-col>
        <!--导出excel---当前页面-   ----------0-->
        <el-col :span="3.5">
          <el-button v-waves :loading="downloadLoading" style="margin-left: 0;margin-right: 10px;background-color: #5fb381" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
            导出当前页学生信息
          </el-button>
        </el-col>
        <!--导出全部学生-->
        <el-col :span="3">
          <el-button v-waves :loading="downloadLoading" style="margin-left: 0;background-color: #5fb381" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownloadAll">
            导出全部学生信息
          </el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>

        <!-----------------------1-->
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
        label="学号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        :formatter="sexformat">
      </el-table-column>
      <el-table-column
        prop="college"
        label="学院">
      </el-table-column>
      <el-table-column
        prop="specialty"
        label="专业">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="班级">
      </el-table-column>
      <el-table-column
        label="手机">
        <template slot-scope="scope">
          <span v-if="scope.row.phone!=='null'&&scope.row.phone!==null ">{{ scope.row.phone }}</span>
          <span v-else>暂无绑定手机号</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="mail"
        label="邮箱">
          <template slot-scope="scope">
            <span v-if="scope.row.mail!=='null '&&scope.row.mail">{{ scope.row.mail }}</span>
            <span v-else>暂无绑定邮箱</span>
          </template>
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
  import EditStudent from '@/components/student/edit'
  import waves from '@/directive/waves' // Waves directive
  // import DetailsStudent from '@/components/student/details'
  export default {
    inject:['reload'],
    name:"student",
    directives: { waves },

    data () {
      return {
        /*下载---*/
        downloadLoading: false,
        /*---------*/
        search:{
          name:"",
          college:"",
          specialty:"",
          grade:"",
        },
        queryParams:{
          pageNo:1,
          pageSize:10,
          name:"",
          college:"",
          specialty:"",
          grade:"",
        },
        tableData:{},
        students:{}
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
        this.get("student/list",(res)=>{
          this.tableData=res.data;
          console.log(this.tableData);
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
            content: EditStudent, //传递的组件对象
            parent: this,//当前的vue对象
            data:{}//props
          },
          area:['800px','600px'],
          title: '添加学生信息',
          shadeClose: false,
          shade :true
        });
      },
      edit(row){
        this.$layer.iframe({
          type:2,
          content: {
            content: EditStudent, //传递的组件对象
            parent: this,//当前的vue对象
            data:{id:row.id}//props
          },
          area:['800px','600px'],
          title: '修改学生信息',
          shadeClose: false,
          shade :true
        });
      },
      /*导出当前页面数据*/
      handleDownload(){
        this.downloadLoading = true;
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['学号', '姓名', '性别', '学院', '专业', '班级', '手机号', '邮箱'];
          const filterVal = ['id', 'name', 'sex', 'college', 'specialty', 'grade', 'phone', 'mail'];
          const data = this.formatJson(filterVal, this.tableData.list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '当前页学生信息表'
          });
          this.downloadLoading = false;
        })
      },

      /*导出全部学生*/
      handleDownloadAll(){
        this.downloadLoading = true;
        this.get("student/getAll",(res)=>{
          this.students=res.data;
          console.log("导出全部学生"+this.students);
        });
        // let list = JSON.stringify(this.students);
        // console.log("list"+list);
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['学号', '姓名', '性别', '学院', '专业', '班级', '手机号', '邮箱'];
          const filterVal = ['id', 'name', 'sex', 'college', 'specialty', 'grade', 'phone', 'mail'];
          const data = this.formatJson(filterVal, this.students);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '全部学生信息表'
          })
          this.downloadLoading = false;
        })
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
      // details(row){
      //   this.$layer.iframe({
      //     content: {
      //       content: DetailsStudent, //传递的组件对象
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
        this.delete("student/del",row.id,row.active);
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
