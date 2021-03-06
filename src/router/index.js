import Vue from 'vue'
import Router from 'vue-router'

import AdminLogin from '@/components/adminLogin'

/*后台系统管理员---------------------------------------------*/
import AdminIndex from '@/components/adminIndex'
import Admin from '@/components/admin/list'//管理员列表
import Student from '@/components/student/list'//学生列表x
import StudentinfoUpload from '@/components/student/infoUpload'//学生信息导入
import BankSingleChoiceQue from '@/components/bankSingleChoiceQue/list'//单选题列表
import BankSingleChoiceQueUpload from '@/components/bankSingleChoiceQue/infoUpload'//单选题信息导入
import BankMultipleChoiceQue from '@/components/bankMultipleChoiceQue/list'//双选题列表
// import BankMultipleChoiceQueUpload from '@/components/bankMultipleChoiceQue/infoUpload'//双选题信息导入
/*------------------------------------------------------------------------*/
import Paper from '@/components/paper/list'//试卷列表
import PaperAdd from '@/components/paper/add'//试卷列表
import PaperQue from '@/components/paperQue/list'//试卷列表
import PaperDetails from '@/components/paper/details'//试卷预览列表
import PaperAnswer from '@/components/paper/paperAnswer'//学生做试卷列表
import SumViewList from '@/components/sumView/list'//统计试卷反馈列表
import SumViewAnswer from '@/components/sumView/answerView'//反馈的单个试卷页面


/*统计*/
Vue.use(Router);

const router = new Router({
  mode:'history',
  routes: [
    {
      path:'/adminLogin',/*管理员*/
      name:'adminLogin',
      component:AdminLogin
    },
    {
      path:'/adminIndex',/*系统后台*/
      name:'adminIndex',
      component:AdminIndex,
      children:[
       {
          path:'/adminIndex',/*管理员*/
          name:'admin',
          component:Admin
        },{
          path:'/admin',/*管理员*/
          name:'admin',
          component:Admin
        },{
          path:'/student',/*学生列表*/
          name:'student',
          component:Student
        },
        {
          path:'/studentinfoUpload',/*学生信息导入*/
          name:'studentinfoUpload',
          component:StudentinfoUpload
        },{
          path:'/bankSingleChoiceQue',/*单选题列表*/
          name:'bankSingleChoiceQue',
          component:BankSingleChoiceQue
        },
        {
          path:'/bankSingleChoiceQueUpload',/*单选题导入*/
          name:'bankSingleChoiceQueUpload',
          component:BankSingleChoiceQueUpload
        },{
          path:'/bankMultipleChoiceQue',/*双选题列表*/
          name:'bankMultipleChoiceQue',
          component:BankMultipleChoiceQue
        },
        // {
        //   path:'/bankMultipleChoiceQueUpload',/*双选题导入*/
        //   name:'bankMultipleChoiceQueUpload',
        //   component:BankMultipleChoiceQueUpload
        // },
        {
          path:'/paper',/*试卷列表*/
          name:'paper',
          component:Paper,
        },{
          path:'/paperAdd',/*添加试卷*/
          name:'paperAdd',
          component:PaperAdd
        },{
          path:'/paperQue',/*试卷条目列表*/
          name:'paperQue',
          component:PaperQue
        },
        {
          // path:'/paperDetails/:id/:title/:content/:remarks',/*试卷预览*/
          path:'/:paperId',/*反馈试卷列表*/
          name:'SumViewList',
          component:SumViewList
        },
        // {
        //   // path:'/paperDetails/:id/:title/:content/:remarks',/*试卷预览*/
        //   path:'/:paperId/:longId',/*反馈单个试卷页面*/
        //   name:'sumViewAnswer',
        //   component:SumViewAnswer
        // },
      ]
    },
    {
      // path:'/paperDetails/:id/:title/:content/:remarks',/*试卷预览*/
      path:'/paperDetails/:id',/*试卷预览*/
      name:'paperDetails',
      component:PaperDetails
    }, {
      // path:'/paperDetails/:id/:title/:content/:remarks',/*试卷预览*/
      path:'/paperAnswer/:id/:longId',/*学生做试卷页面*/
      name:'paperAnswer',
      component:PaperAnswer
    },

  ]
})
export default router;

