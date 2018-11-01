import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/Layout'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/login',
			name: 'login',
			meta: { title: '登录' },
			component: () => import('../components/Login')
		},
		{
			path: '',
			component: Layout,
			children: [
				{
					path: '/',
					name: 'home',
					meta: { title: '首页', hasTab: true },
					component: () => import('../components/Home')
				},
				{
					path: '/raiders',
					name: 'raiders',
					meta: { title: '攻略', hasTab: true },
					component: () => import('../components/Raiders')
				},
				{
					path: '/mine',
					name: 'mine',
					meta: { title: '我的', hasTab: true },
					component: () => import('../components/Mine')
				}
			]
		}
	]
})
