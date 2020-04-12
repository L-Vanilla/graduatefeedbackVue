import Vue from 'vue'
import Router from 'vue-router'
/*后台系统管理员---------------------------------------------*/
import AdminIndex from '@/components/adminIndex'
import Admin from '@/components/admin/list'//管理员列表
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
        },
      ]
    },

  ]
})
export default router;

