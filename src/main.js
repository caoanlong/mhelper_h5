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

import LyTab from 'ly-tab'
import App from './App'
import router from './router'

// icons
import './assets/icons'
import './utils/numberFixed'

Vue.config.productionTip = false


Vue.use(MintUI)
Vue.use(LyTab)

// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

// 自定义列组件
Vue.component('table-market', {
	template: `<div style="width:90px;height:60px;padding-left:5px">
			<img style="display:inline-block;width:20px;position:relative;top:4px" :src="rowData.image"/>
			<div style="display:inline-block;height:30px;font-size:16px;font-weight:600;color:#333333">{{rowData.name}}</div>
		</div>`,
	props: {
		rowData: {
			type: Object
		},
		field: {
			type: String
		},
		index: {
			type: Number
		}
	}
})
Vue.component('table-price', {
	template: `<div style="display:flex;width:154px;height:60px;">
			<div style="flex:1;padding-right:15px">
				<div style="height:30px;line-height:2.5;font-size:16px;font-weight:600;color:#333333">{{rowData[field].price}}</div>
				<div style="height:30px;line-height:1.8;font-size:12px;color:#999999">￥{{rowData[field].price}}</div>
			</div>
			<div style="flex:1;padding-right:5px;position:relative;">
				<div style="width:100%;height:30px;position:absolute;top:10px;right:0">
					<div 
						style="width: 70px;
						height: 20px;
						line-height: 20px;
						text-align: center;
						font:-size: 12px;
						color: #ffffff;
						border-radius: 3px;"
						:style="{'background':rowData[field].change > 0 ? '#5cb85c' : '#d9534f'}">
						{{rowData[field].change}}%
					</div>
				</div>
				<div style="position:absolute;top:30px;right:0;height:30px;line-height:1.8;font-size:12px;color:#999999;padding-right:5px;">量 {{rowData.volume}}</div>
			</div>
		</div>`,
	props: {
		rowData: {
			type: Object
		},
		field: {
			type: String
		},
		index: {
			type: Number
		}
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})
