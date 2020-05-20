<!--20-4-12学生列表---Vanilla-->
<template>
  <div>
    <div  style="margin-top: 15px;">
      <el-row>
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
      </el-row>
      <br>
      <el-row>

        <!-----------------------1-->
      </el-row>
    </div>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="formdata.checkedtableData" >
      <el-checkbox v-for="item in tableData.list" :key="item.id" :label="item" >
        {{item.specialty}}&nbsp;
        {{item.name}}
        {{item.mail}}
      </el-checkbox>
    </el-checkbox-group>
    <el-form :inline="true" :model="formdata" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="addSubmit(formdata)">发送</el-button>
      </el-form-item>
    </el-form>
<!--    <el-pagination-->
<!--      background-->
<!--      layout="prev, pager, next,total"-->
<!--      :total="tableData.total"-->
<!--      :current-page="this.queryParams.pageNo"-->
<!--      :page-size="this.queryParams.pageSize"-->
<!--      @current-change="changePageNo">-->
<!--    </el-pagination>-->
  </div>
</template>

<script>
  import EditStudent from '@/components/student/edit'
  import waves from '@/directive/waves' // Waves directive
  // import DetailsStudent from '@/components/student/details'
  export default {
    inject:['reload'],
    name:"student",
    props:["id"],
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
          pageSize:50,
          name:"",
          college:"",
          specialty:"",
          grade:"",
        },
        isIndeterminate: true,
        checkAll: false,
        tableData:{},
        formdata:{
          id:this.id,
          checkedtableData: [],
        },
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
      handleCheckAllChange(value){
        this.formdata.checkedtableData = value ? this.tableData.list : [];
        this.isIndeterminate = false;
      },
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
      addSubmit(modelForm) {
        const paper={};
        const StudentList = [];
        modelForm.checkedtableData.forEach((item, index) => {
          const Student = {};
          Student.paperId=this.id;
          // Student.studentId = item.id;
          // console.log("学生id"+item.id);
          Student.mail = item.mail;
          StudentList.push(Student);
        });
        paper.StudentList=StudentList;
        console.log("paper"+paper);
        this.insertPaperAnswerQueInfoList(paper)
      },
      insertPaperAnswerQueInfoList(paper) {
        this.axios({
          method: 'post',
          url: 'paper/PublishStudentList',
          data: paper,
        })
          .then(result => {
            console.log("map" + result.data.data.responseList);
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
              // this.tableData = result.data.data.responseList;
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
