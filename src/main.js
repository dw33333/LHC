// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import lottery_header from './lottery_header'
import router from './router'
import './assets/common.css'
import store from './store'
import axios from 'axios'
import NP from 'number-precision'
import MessageBox from "@/components/base/index"
import 'babel-polyfill'
import {Button,Form,FormItem,DatePicker,Select,Option,Pagination,Input,Icon} from 'element-ui';
import 'element-ui/lib/theme-chalk/form-item.css';
import 'element-ui/lib/theme-chalk/form.css';
import 'element-ui/lib/theme-chalk/button.css';
import 'element-ui/lib/theme-chalk/date-picker.css';
import 'element-ui/lib/theme-chalk/select.css';
import 'element-ui/lib/theme-chalk/option.css';
import 'element-ui/lib/theme-chalk/pagination.css';
import 'element-ui/lib/theme-chalk/input.css';
import '../src/assets/css/iconfont.css';
Vue.use(NP);
Vue.use(MessageBox);
Vue.use(Button);
Vue.use(Icon)
Vue.use(Form);
Vue.use(FormItem);
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Input);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.component("DatePicker", DatePicker);
// 时间戳转换
Vue.prototype.$http.defaults.headers.EasySecret=store.state.easysecret;
Vue.filter('time', function (value) {
  let date = new Date(value * 1000)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
  let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return m + s
})
Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}
//倒计时
Number.prototype.prefix=function(prefix){
  if((this+'').length==1){
    return prefix+''+this;
  }else{
    return this+'';
  }
}
/* eslint-disable no-new */
window.cwvue=new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
window.str=store;