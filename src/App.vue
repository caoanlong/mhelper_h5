<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
import { getQueryString, isWeixin } from '../src/utils/common'
import { APPID } from '../src/utils/consts'
import Weixin from '../src/api/Weixin'
export default {
	name: "App",
	created() {
		console.log(isWeixin())
		if (isWeixin()) {
			const openid = localStorage.getItem('openid')
			if (!openid) {
				const code = getQueryString('code')
				if (code) {
					this.getWxUserInfo()
				} else {
					window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize
						?appid=${APPID}
						&redirect_uri=${window.location.href}
						&response_type=code
						&scope=snsapi_base
						&state=index
						#wechat_redirect`
				}
			}
		}
	},
	methods: {
		getWxUserInfo () {
			Weixin.getOpenID({
				code: getQueryString('code')
			}).then(res => {
				if (res) localStorage.setItem('openid', res)
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
	#app
		position relative
		height 100%
		background-color #f2f2f2
</style>
