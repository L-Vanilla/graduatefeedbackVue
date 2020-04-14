import Vue from 'vue'
import Router from 'vue-router'
/*后台系统管理员---------------------------------------------*/
import AdminIndex from '@/components/adminIndex'
import Admin from '@/components/admin/list'//管理员列表
import Student from '@/components/student/list'//学生列表
import StudentinfoUpload from '@/components/student/infoUpload'//学生列表
/*------------------------------------------------------------------------*/

/*统计*/
Vue.use(Router);

const router = new Router({
  mode:'history',
  routes: [
    {
      path:'/',/*系统后台*/
      name:'adminIndex',
      component:AdminIndex,
      children:[
       {
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
        },
      ]
    },

  ]
})
export default router;

