
<template>
  <div>
    <el-form ref="modelForm" :rule="rules" :model="modelForm" label-position="right" label-width="100px">
      <vuedraggable v-model="modelForm.topic" class="wrapper" @end="end">
        <div v-for="(item, index) in modelForm.topic" :key="index">
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                第{{ index+1 }}题,题目:{{ item.singleContent }}
              </template>
              <!-- 问题 -->
              <el-form-item
                :prop="`topic.${index}.queType`"
                :label="`问题${index + 1}类型`"
                :rules="{ required: true, message: '请选择问题类型', trigger: 'change' }"
              >
                <el-radio-group v-model="item.queType">
                  <el-radio :label="0">单选题</el-radio>
                  <el-radio :label="1">多选题</el-radio>
                  <el-radio :label="2">填空题</el-radio>
                </el-radio-group>
              </el-form-item>
              <!--              //问题-->
              <el-form-item
                :prop="`topic.${index}.singleContent`"
                label="问题题目"
                :rules="{ required: true, message: '请填写问题', trigger: 'change' }">
                <el-input v-model.trim="item.singleContent" style="width:258px" clearable placeholder="请填写问题" />
              </el-form-item>
              <!-- 答案 -->
              <el-form-item
                v-for="(opt, idx) in item.choices"
                v-show="item.type!==2"
                :key="idx"
                :label="`选项${idx + 1}`"
                :prop="`topic.${index}.choices.${idx}.value`"
                :rules="[
                  { required: true, message: '请输入答案', trigger: 'blur' },
                ]">
                <el-input v-model.trim="opt.value" style="width:258px" clearable placeholder="请输入答案" />
                <el-button style="margin-left: 20px" @click.prevent="removeDomain(index,idx)">删除</el-button>
              </el-form-item>
              <el-form-item>
                <el-button v-show="item.type!==2" @click="addDomain(index)">新增选项</el-button>
                <el-button @click="removeQuestion(index)">删除题目</el-button>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </div>
      </vuedraggable>
      <el-form-item>
        <el-button @click="addQuestion">新增题目</el-button>
        <el-button style="margin-top: 10px" @click="addSubmit(modelForm)">提交</el-button>
        <el-button @click="resetForm('modelForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>



</template>

<script>
  import vuedraggable from 'vuedraggable'

  export default {

    name: 'HelloWorld',

    components: {

      vuedraggable

    },

    data() {

      return {

        rules: {},
        modelForm: {
          topic: [{
            singleContent: '',
            queType: '',
            choices: [{
              value: '',
            }]
          }, {
            singleContent: '',
            queType: '',
            choices: [{
              value: '',
            }]

          }]

        }

      }

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
          queType: '',
          choices: [{
            value: '',

          }]})

      },

      resetForm(formName) { // 重置

        this.$refs[formName].resetFields()

      },

      addSubmit(modelForm) {
        const bankSingleChoiceQueList = []
        modelForm.topic.forEach((item, index) => {
          const bankSingleChoiceQue = {};
                    bankSingleChoiceQue.singleContent = item.singleContent;
                    bankSingleChoiceQue.queType = item.queType;
                    // bankSingleChoiceQue.choiceB = item[key]
                    // bankSingleChoiceQue.choiceC = item[key]
                    // bankSingleChoiceQue.choiceD = item[key]
                    // bankSingleChoiceQue.choiceE = item[key]
                    // bankSingleChoiceQue.choiceF = item[key]
                    // bankSingleChoiceQue.choiceG = item[key]
                    // bankSingleChoiceQue.singeType = item[key]
                bankSingleChoiceQueList.push(bankSingleChoiceQue)
              });
        console.log("bankSingleChoiceQueList"+bankSingleChoiceQueList);
              this.insertBankSingleChoiceQueInfoList(bankSingleChoiceQueList)
            },
      /*插入数据库*/
      insertBankSingleChoiceQueInfoList(bankSingleChoiceQueList) {
        this.axios({
          method: 'post',
          url: 'bankSingleChoiceQue/insertBankSingleChoiceQueInfoList',
          data: {bankSingleChoiceQueList},
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
        // const result = await reqInsertBankSingleChoiceQueInfoList(bankSingleChoiceQueList)

      }




    }

  }

</script>



<style scoped>



</style>
