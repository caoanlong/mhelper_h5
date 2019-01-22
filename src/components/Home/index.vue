<template>
	<div class="home-container" id="container">
		<div class="refresh" @click="refreshCon" v-if="canRefresh">
			<svg-icon icon-class="refresh"></svg-icon>
		</div>
		<mt-actionsheet 
			:actions="actions"
			v-model="sheetVisible">
		</mt-actionsheet>
		<div id="contain">
			<mt-header 
				style="width:100%;top:0;left:0;z-index:20" 
				:style="{'position': isScreenShot ? 'absolute' : 'fixed'}" 
				:title="$route.meta.title">
				<div slot="left" @click="notice">
					<svg-icon icon-class="notice"></svg-icon>
					<span>行情提醒</span>
				</div>
				<div slot="right" @click="sheetVisible = true">
					<svg-icon icon-class="component"></svg-icon>
					<span>更多</span>
				</div>
			</mt-header>
			<ly-tab 
				:isImg="true" 
				class="market-tab" 
				:items="markets" 
				:style="{'position': isScreenShot ? 'absolute' : 'fixed'}" 
				:options="{'labelKey': 'market', 'activeColor': '#1d98bd'}"
				@change="changeMarket">
			</ly-tab>
			<ly-tab 
				class="navbar" 
				v-model="selectedCurrency"
				:items="currencys" 
				:style="{'position': isScreenShot ? 'absolute' : 'fixed'}" 
				:options="{'labelKey': 'currency', 'activeColor': '#1d98bd'}"
				@change="changeCurrency">
			</ly-tab>
			<div id="coins">
				<coin-item v-for="(item, i) in list" :key="i" :marketCoin="item"></coin-item>
			</div>
			<div class="about-info" id="about">
				<p class="info-txt">实时掌握行情变化  把握每次赚钱机会</p>
				<div class="features">
					<router-link tag="div" class="feature" to="attentionpublic">关注公众号</router-link>
					<router-link tag="div" class="feature" to="attentionminip" v-if="!isProMini">获取小程序</router-link>
					<a class="feature advice" href="mailto:MHelper@bv-health.com">意见反馈</a>
					<router-link tag="div" class="feature" to="contactcustomerservice">联系客服</router-link>
				</div>
				<router-link tag="div" class="about" to="about">M圈专业的技术团队，旨为M粉量身高</router-link>
				<p class="info-txt-b">©2018-2028 MHelper, Inc. All rights reserved</p>
			</div>
			<div class="qrcode-info" v-show="!!qrcodeImg">
				<div class="qrcode-img">
					<img id="qrcode-img" :src="qrcodeImg" alt="" />
				</div>
				<div class="qrcode-txt">识别二维码，随时掌握行情变化</div>
			</div>
		</div>
		<div style="height:90px" id="block"></div>
		<modal name="download" width="80%" height="auto" :scrollable="true">
			<div class="modal-info">
				<div class="modal-tips">长按图片，保存、发送好友或分享朋友圈</div>
				<div id="closeBtn" @click="$modal.hide('download')"></div>
			</div>
			<div class="download-div">
                <img class="download-img" :src="imgUri" alt="">
            </div>
		</modal>
	</div>
</template>

<script>
import { Indicator, Toast, MessageBox } from 'mint-ui'
import html2canvas from 'html2canvas'
import QRCode from 'qrcode'
import CoinItem from './components/CoinItem'
import Tabs from '../Common/Tabs'
import Coin from '../../api/Coin'
import Market from '../../api/Market'
import { saveHtml2Img } from '../../utils/common'
export default {
	name: "Home",
	components: { CoinItem, Tabs },
	data() {
		return {
			isScreenShot: false,
			qrcodeImg: '',
			imgUri: '',
			wait: 10,
			canRefresh: true,
			sheetVisible: false,
			selectedCurrency: 0,
			currency: '',
			currencys: [],
			market: '',
			markets: [],
			list: [],
			timer: null,
			isProMini: false,
			actions: [
				{ 
					name: '历史行情',
					method: () => {
						this.$router.push({ name: 'history' })
					} 
				}, 
				{ 
					name: '搬砖分析',
					method: () => {
						this.$router.push({ name: 'movebricks' })
					}
				}, 
				{ 
					name: '发送给朋友',
					method: () => {
						if (localStorage.getItem('showmsgbox')) {
							this.screenshot()
						} else {
							MessageBox({
								message: 'MHelper自动带上您的邀请码，如有人点击，您将获得现金奖励。',
								showCancelButton: true,
								confirmButtonText: '我知道了',
								confirmButtonHighlight: true,
								cancelButtonText: '不再提示'
							}).then(action => {
								if (action == 'cancel') localStorage.setItem('showmsgbox', 1)
								this.screenshot()
							})
						}
					}
				}
			]
		}
	},
	created() {
		this.getMarkets()
		this.timer = setInterval(() => {
			this.getCoinTickByCurrency(true)
		}, 30000)
		const u = navigator.userAgent.toLowerCase()
		if (u.match(/MicroMessenger/i) == 'micromessenger') {
			wx.miniProgram.getEnv(res => {
				if (res.miniprogram) {
					this.isProMini = true
				} else {
					this.isProMini = false
					this.actions.push({
						name: '获取小程序',
						method: () => {
							this.$router.push({ name: 'attentionminip' })
						}
					})
				}
			})
		} else {
			this.actions.push({
				name: '获取小程序',
				method: () => {
					this.$router.push({ name: 'attentionminip' })
				}
			})
		}
	},
	destroyed() {
		clearInterval(this.timer)
		this.timer = null
	},
	methods: {
		notice() {
			Toast('敬请期待！')
		},
		refreshCon() {
			if (!this.canRefresh) return
			this.timeGo()
			this.getCoinTickByCurrency()
		},
		changeMarket({ market }) {
			this.market = market
			this.getCurrencys()
		},
		changeCurrency({ currency }) {
			this.currency = currency
			this.getCoinTickByCurrency()
		},
		getMarkets() {
			Market.getmarkets().then(res => {
				this.market = res[0]
				this.markets = res.map(market => {
					return { market }
				})
				this.getCurrencys()
			})
		},
		getCurrencys() {
			Market.getcurrencys({
				market: this.market
			}).then(res => {
				this.selectedCurrency = 0
				this.currency = res[0]
				this.currencys = res.map(currency => {
					return { currency }
				})
				this.getCoinTickByCurrency()
			})
		},
		getCoinTickByCurrency(bool) {
			!bool && Indicator.open()
			Market.getcointickbycurrency({
				currency: this.currency,
				market: this.market
			}).then(res => {
				this.list = res
				!bool && Indicator.close()
			})
		},
		/**
		 * 	倒计时
		 */
		timeGo() {
			if (this.wait == 0) {
				this.canRefresh = true
				this.wait = 10
				return
			} else {
				this.canRefresh = false
				this.wait--
				setTimeout(() => {
					this.timeGo()
				}, 1000)
			}
		},
		screenshot() {
			const opts = {
				errorCorrectionLevel: 'H',
				type: 'image/jpeg',
				rendererOpts: {
					quality: 0.3
				}
			}
			const userInfo = localStorage.getItem('userInfo')
			let link = 'https://m.mhelper.co'
			if (userInfo) {
				const user = JSON.parse(userInfo)
				link = `https://m.mhelper.co/#/?recommender=${user.userid}`
			}
			QRCode.toDataURL(link, opts, (err, url) => {
				if (err) throw err
				this.qrcodeImg = url
				this.$nextTick(() => {
					this.isScreenShot = true
					const contain = document.getElementById('contain')
					const about = document.getElementById('about')
					contain.removeChild(about)
					contain.style.paddingBottom = '0'
					html2canvas(contain, {
						useCORS: true
					}).then((canvas) => {
						this.isScreenShot = false
						contain.appendChild(about)
						contain.style.paddingBottom = '55px'
						// 生成base64图片数据
						const imgData = canvas.toDataURL('image/png')
						// 获取生成的图片的url
						this.imgUri = imgData.replace('image/png', 'image/octet-stream')
						this.qrcodeImg = ''
						this.$modal.show('download')
					})
				})
			})
		}
	}
}
</script>

<style lang="stylus">
.v-table-class
	border-left none
	border-right none
	border-bottom none
.v-table-title-class
	color #999
	font-size 12px
.ly-tabbar
	box-shadow none !important
</style>

<style lang="stylus" scoped>
.home-container
	position absolute
	top 0
	left 0
	right 0
	bottom 0
	#contain
		position absolute
		top 0
		left 0
		right 0
		padding-top 135px
		padding-bottom 55px
	.modal-info
		display flex
		width 100%
		position absolute
		left 0
		top 0
		z-index 999
		background-color rgba(0,0,0,.7)
		.modal-tips
			flex 1
			color #fff
			line-height 1.6
			padding 10px
			font-size 14px
		#closeBtn
			flex 0 0 40px
			background-image url('../../assets/close-white.png')
			background-position center
			background-repeat no-repeat
			background-size 20px
	.download-div
		width 100%
		.download-img
			width 100%
	.about-info
		padding 20px 10px
		background-color #f2f2f2
		font-size 14px
		.info-txt
			color #666
			font-size 16px
			text-align center
		.info-txt-b
			color #999
			text-align center
			font-size 13px
			line-height 2
		.features
			display flex
			height 30px
			line-height 30px
			.feature
				flex 1
				color #26a2ff
				text-align center
				&.advice
					display block
					text-decoration none
		.about
			color #26a2ff
			line-height 2
			text-align center
	.qrcode-info
		.qrcode-txt
			text-align center
			line-height 1
			position relative
			top -10px
		.qrcode-img
			width 240px
			margin 0 auto
			#qrcode-img
				width 100%
				background-color #ccccccs
	.refresh
		position fixed
		z-index 999
		right 20px
		bottom 70px
		width 46px
		height 46px
		line-height 46px
		color #ffffff
		text-align center
		font-size 18px
		border-radius 100%
		background-color #26a2ff
		opacity 0.7
		box-shadow 0 2px 4px rgba(0,0,0,.4)
	.market-tab
		position fixed
		left 0
		top 40px
		z-index 999
		width 100%
		background-color #ffffff
	.navbar
		position fixed
		left 0
		width 100%
		z-index 999
		top 88px
	.logo
		display flex
		align-items center
		justify-content center
		width 32px
		height 32px
		border-radius 100%
		background-color #ffffff
		img
			display block
			width 22px
</style>
