import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'//编辑器导入
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
//配置axios根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//配置请求拦截器,保证拥有获取数据的权限
axios.interceptors.request.use(config=>{
  config.headers.Authorization = window.sessionStorage.getItem("token")
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component('tree-table',TreeTable)
Vue.use(VueQuillEditor)

//定义时间过滤器
Vue.filter('dateFormat',function(originVal){
  const dt = new Date(originVal)
  const y = dt.getFullYear();
  const m = (dt.getMonth()+1+"").padStart(2,'0')
  const d = (dt.getDate()+"").padStart(2,'0')
  const hh = (dt.getHours()+"").padStart(2,'0')
  const mm = (dt.getMinutes()+"").padStart(2,'0')
  const ss = (dt.getSeconds()+"").padStart(2,'0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
