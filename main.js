import Vue from 'vue'
import App from './App'

import httpApi from './common/httpApi'		//API接口配置文件
import HttpCache from './common/cache'
import $mConfig from '@/common/config.js';
import $mHelper from '@/utils/helper';		
import utils from "./utils/index.js";		//简化uniapp函数
import zIndex from "./utils/zIndex";		//规范z-index
import heImage from "./components/he-image.vue";	//封装style合并统一图片格式
import http from './common/http/axios.js'
import * as filters from 'common/filters/filters.js'


//引入组件库
// import uView from "uview-ui";
// Vue.use(uView);
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
// 引入store
import store from '@/store';
Vue.prototype.$store = store
// 引入uView提供的对vuex的简写法文件
// let vuexStore = require('@/store/$u.mixin.js');
// Vue.mixin(vuexStore);

// 全局组件
import qyLoading from 'components/global/qy-loading.vue'
Vue.component('qy-loading',qyLoading);


//全局过滤器
console.log("filter",filters)
Object.keys(filters).forEach(key =>{
	Vue.filter(key,filters[key])
})

//全局mixin
import shoproShare from '@/common/mixins/shopro-share'
Vue.mixin(shoproShare);


Vue.config.productionTip = false
Vue.prototype.$http = http;
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()
Vue.prototype.$api = httpApi;
Vue.prototype.$SysCache = HttpCache;
Vue.prototype.$mConfig =$mConfig;
Vue.prototype.$mHelper = $mHelper;

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
