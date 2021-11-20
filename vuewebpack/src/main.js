// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap';
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VeeValidate from 'vee-validate' //引入驗證
import zhTw_Validate from 'vee-validate/dist/locale/zh_TW'//引入驗證語言，locale資料夾下有多國語系

import App from './App'
import router from './router';
import './bus';
import CurrencyFilter from './filter/Currency';
Vue.use(VueAxios,axios)
Vue.use(VeeValidate,{ events: 'input|blur'});//{ events: 'input|blur'}才會在滑鼠移入輸入欄位再移出時觸發驗證功能
VeeValidate.Validator.localize('zh_TW',zhTw_Validate) //設定語言
Vue.component('Loading',Loading)
Vue.filter('currency',CurrencyFilter)
Vue.config.productionTip = false
axios.defaults.withCredentials = true;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})

router.beforeEach((to,from,next)=>{
  console.log('to',to,'from',from,'next',next)
  if(to.meta.requiresAuth){
    console.log("需要登入驗證")
    const api= `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response)=>{
      if(response.data.success){
        console.log("登入驗證ok")
        next();
        }else{
          console.log("登入驗證錯誤")
          next({
            path:'/login'
          })
        }
    })
  }else{
    console.log("不需要驗證")
    next();
  }
})
