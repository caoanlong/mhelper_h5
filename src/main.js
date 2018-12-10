// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '../src/assets/css/style.styl'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import { VTable, VPagination } from 'vue-easytable'

import Croppa from 'vue-croppa'

import VModal from 'vue-js-modal'

import App from './App'
import TableMarket from './components/History/components/TableMarket'
import TablePrice from './components/History/components/TablePrice'
import router from './router'
import store from './store'

// icons
import './assets/icons'
import './utils/numberFixed'

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(Croppa)
Vue.use(VModal)

// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

// 自定义列组件
Vue.component('table-market', TableMarket)
Vue.component('table-price', TablePrice)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
