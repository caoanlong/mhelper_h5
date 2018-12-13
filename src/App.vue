<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
import { Toast } from 'mint-ui'
import { mapGetters } from 'vuex'
import { getQueryString, isWeixin } from '../src/utils/common'
import { APPID } from '../src/utils/consts'
import Weixin from '../src/api/Weixin'
export default {
	name: "App",
	data() {
		return {
			wxUserInfo: '',
			userInfo: '',
			title: '华克金等币盯盘利器',
			desc: '华克金、榴莲币等行情查看、行情通知、交易指导、资产管理，行情从不错过。',
			imgUrl: 'http://47.106.171.37:3030/image/uploads/Mxglogo.png',
			link: 'https://m.mhelper.co/#/'
		}
	},
	watch: {
		$route() {
			this.setLink()
			if (isWeixin()) this.getWeixinConfig()
		}
	},
	mounted() {
		if (isWeixin()) this.getWeixinConfig()
	},
	created() {
		this.setLink()
		if (isWeixin()) {
			const openid = localStorage.getItem('openid')
			if (!openid) {
				const code = getQueryString('code')
				if (code) {
					this.getWxOpenID()
				} else {
					window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize
						?appid=${APPID}
						&redirect_uri=${encodeURIComponent(this.link)}
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
		},
		setLink() {
			const userInfo = localStorage.getItem('userInfo')
			if (userInfo) {
				this.userInfo = JSON.parse(userInfo)
				this.link = `https://m.mhelper.co/#/?recommender=${this.userInfo.userid}`
				wx && wx.miniProgram.postMessage({ userid: this.userInfo.userid })
			}
		},
		getWeixinConfig() {
			const url = location.href
			Weixin.getWeixinConfig({ url }).then(res => {
				const timestamp = res.timestamp
				const nonceStr = res.nonceStr
				const signature = res.signature
				wx.config({
					// debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: APPID, // 必填，公众号的唯一标识
					timestamp, // 必填，生成签名的时间戳
					nonceStr, // 必填，生成签名的随机串
					signature,// 必填，签名，见附录1
					jsApiList: [
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ'
						// 'updateAppMessageShareData',
						// 'updateTimelineShareData'
					] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				})
				wx.ready(() => {
					// 朋友圈分享
					wx.onMenuShareTimeline({
						title: this.title, // 分享标题
						desc: this.desc, // 分享描述
						link: this.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this.imgUrl, // 分享图标
						success: function () {
						// 用户确认分享后执行的回调函数
						},
						cancel: function () {
						// 用户取消分享后执行的回调函数
						}
					})
					// 转发给朋友
					wx.onMenuShareAppMessage({
						title: this.title, // 分享标题
						desc: this.desc, // 分享描述
						link: this.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this.imgUrl, // 分享图标
						type: '', // 分享类型,music、video或link，不填默认为link
						dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						success: function () {
						// 用户确认分享后执行的回调函数
						},
						cancel: function () {
						// 用户取消分享后执行的回调函数
						}
					})
					// 分享到QQ
					wx.onMenuShareQQ({
						title: this.title, // 分享标题
						desc: this.desc, // 分享描述
						link: this.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this.imgUrl, // 分享图标
						success: function () {
						// 用户确认分享后执行的回调函数
						},
						cancel: function () {
						// 用户取消分享后执行的回调函数
						}
					})
					// // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
					// wx.updateAppMessageShareData({
					// 	title: this.title, // 分享标题
					// 	desc: this.desc, // 分享描述
					// 	link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					// 	imgUrl: this.imgUrl, // 分享图标
					// 	success: () => {
					// 		// 设置成功
					// 	}
					// })
					// // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
					// wx.updateTimelineShareData({
					// 	title: this.title, // 分享标题
					// 	link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					// 	imgUrl: this.imgUrl, // 分享图标
					// 	success: () => {
					// 		// 设置成功
					// 	}
					// })
				})
				wx.error(res => {
					console.log(res)
				})
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
