// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/*引用阿里云图标库*/
import "./assets/icon/iconfont.css";
//引富文本编译器样式
// import './assets/css/font.css'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
/*--------------*/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mypublic from '@/public/mypublicjs'
import axios from 'axios'
import layer from 'vue-layer'
/*引用excel*/
// import Export2Excel from './vendor/Export2Excel.js'
import store from './vuex/store.js'
/*粒子---------*/
// import VueParticles from 'vue-particles'
// Vue.use(VueParticles);
/*-----------*/
axios.defaults.baseURL="http://127.0.0.1/";
Vue.prototype.axios=axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.get=mypublic.get;
Vue.prototype.merge=mypublic.merge;
Vue.prototype.$layer = layer(Vue);

/*时间格式化-------------*/

// function formatDate(date, fmt) {
//   date = new Date(date);
//   if (typeof(fmt) === "undefined") {
//     fmt = "yyyy-MM-dd HH:mm:ss";
//   }
//   if (/(y+)/.test(fmt)) {
//     fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
//   }
//   let o = {
//     'M+': date.getMonth() + 1,
//     'd+': date.getDate(),
//     'H+': date.getHours(),
//     'm+': date.getMinutes(),
//     's+': date.getSeconds()
//   }
//   for (let k in o) {
//     if (new RegExp(`(${k})`).test(fmt)) {
//       let str = o[k] + ''
//       fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length));
//     }
//   }
//   return fmt
// };

//定义一个时间过滤器
// Vue.filter("FormatDate", function(date, fmt) {
//   return formatDate(date, fmt);
// });
/*--------------------------------*/
Vue.prototype.reset=function(formName){
  this.$refs[formName].resetFields();
}
Vue.prototype.post=function(formName,url,params,
                            callback=(statu)=>{
                              /*4-13判断是否成功*/
                              console.log("statu"+statu);
                              if(statu === 0){
                                this.$layer.closeAll();
                                this.reload()
                              }
                              /*--------------------*/
                            }
  ,config={}){
  this.$refs[formName].validate((valid) => {
    if (valid) {
      mypublic.post(url,params,callback,config);
    } else {
      return false;
    }
  });
}
Vue.prototype.delete=function(url,id,status){
  mypublic.del(id,status,(id,status)=>{
    mypublic.get(url,(result)=>{
      /*4-13判断删除是否成功*/
      if(result.statu === 0){
        this.$message({
          showClose: true,
          message: result.msg,
          type: 'success'
        });
      }else{
        this.$message({
          showClose: true,
          message: result.msg,
          type: 'error'
        });
      }
      /*----------*/
      this.reload();
    },{id:id,active:status});
  })
}
//Vanilla
axios.defaults.withCredentials = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
