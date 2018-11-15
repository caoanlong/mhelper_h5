import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/Layout'

Vue.use(Router)

const router = new Router({
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
					meta: { title: 'MHelper', hasTab: true },
					component: () => import('../components/Home')
				},
				{
					path: '/history',
					name: 'history',
					meta: { title: '历史行情' },
					component: () => import('../components/History')
				},
				{
					path: '/movebricks',
					name: 'movebricks',
					meta: { title: '搬砖分析' },
					component: () => import('../components/MoveBricks')
				},
				{
					path: '/news',
					name: 'news',
					meta: { title: '资讯', hasTab: true },
					component: () => import('../components/News')
				},
				{
					path: '/mine',
					name: 'mine',
					meta: { title: '我的', hasTab: true },
					component: () => import('../components/Mine')
				},
				{
					path: '/mineinfo',
					name: 'mineinfo',
					meta: { title: '个人信息' },
					component: () => import('../components/MineInfo')
				}
			]
		}
	]
})

router.beforeEach((to, from ,next) => {
	if (localStorage.getItem('token') && localStorage.getItem('token') != 'undefined') {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            next()
        }
    } else {
        /* has no token*/
		if (to.path === '/login' 
			|| to.path === '/' 
			|| to.path === '/history'
			|| to.path === '/movebricks'
			|| to.path === '/news') {
            next()
        } else {
            next('/login')
        }
    }
})

export default router
