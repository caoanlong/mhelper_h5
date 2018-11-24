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
			path: '/register',
			name: 'register',
			meta: { title: '注册' },
			component: () => import('../components/Register')
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
				},{
					path: '/history',
					name: 'history',
					meta: { title: '历史行情' },
					component: () => import('../components/History')
				},{
					path: '/movebricks',
					name: 'movebricks',
					meta: { title: '搬砖分析' },
					component: () => import('../components/MoveBricks')
				},{
					path: '/news',
					name: 'news',
					meta: { title: '资讯', hasTab: true },
					component: () => import('../components/News')
				},{
					path: '/newsdetail',
					name: 'newsdetail',
					meta: { title: '资讯详情' },
					component: () => import('../components/News/components/NewsDetail')
				},{
					path: '/mine',
					name: 'mine',
					meta: { title: '我的', hasTab: true },
					component: () => import('../components/Mine')
				},{
					path: '/mineinfo',
					name: 'mineinfo',
					meta: { title: '个人信息' },
					component: () => import('../components/MineInfo')
				},{
					path: '/modify',
					name: 'modify',
					meta: { title: '修改个人信息' },
					component: () => import('../components/MineInfo/components/Modify')
				},{
					path: '/modifymobile',
					name: 'modifymobile',
					meta: { title: '修改手机号' },
					component: () => import('../components/MineInfo/components/ModifyMobile')
				},{
					path: '/level',
					name: 'level',
					meta: { title: '会员等级' },
					component: () => import('../components/Level')
				},{
					path: '/performance',
					name: 'performance',
					meta: { title: '业绩' },
					component: () => import('../components/Performance')
				},{
					path: '/contribution',
					name: 'contribution',
					meta: { title: '贡献' },
					component: () => import('../components/Contribution')
				},{
					path: '/purchasehistory',
					name: 'purchasehistory',
					meta: { title: '购买记录' },
					component: () => import('../components/PurchaseHistory')
				},{
					path: '/settlement',
					name: 'settlement',
					meta: { title: '结算' },
					component: () => import('../components/Settlement')
				},{
					path: '/bankcard',
					name: 'bankcard',
					meta: { title: '银行卡' },
					component: () => import('../components/BankCard')
				}
			]
		}
	]
})

router.beforeEach((to, from ,next) => {
	if (localStorage.getItem('token') && localStorage.getItem('token') != 'undefined') {
        if (to.path === '/login' || to.path === '/register') {
            next({ path: '/' })
        } else {
            next()
        }
    } else {
        /* has no token*/
		if (to.path === '/login' || to.path === '/register'
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
