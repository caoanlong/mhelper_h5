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
	data() {
		return {
			wxUserInfo: ''
		}
	},
	created() {
		if (isWeixin()) {
			const openid = localStorage.getItem('openid')
			if (!openid) {
				const code = getQueryString('code')
				if (code) {
					this.getWxOpenID()
				} else {
					window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize
						?appid=${APPID}
						&redirect_uri=${encodeURIComponent(location.href)}
						&response_type=code
						&scope=snsapi_userinfo
						&state=index
						#wechat_redirect`
				}
			}
		}
	},
	methods: {
		getWxOpenID() {
			Weixin.getOpenID({
				code: getQueryString('code')
			}).then(res => {
				if (res && res.openid) {
					this.getWxUserInfo(res)
					localStorage.setItem('openid', res.openid)
					localStorage.setItem('accessToken', res.access_token)
				}
			})
		},
		getWxUserInfo({ openid, access_token }) {
			Weixin.getUserInfo({ openid, access_token }).then(res => {
				this.wxUserInfo = res
				localStorage.setItem('wxUserInfo', JSON.stringify(res))
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
