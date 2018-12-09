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
			<mt-header fixed :title="$route.meta.title">
				<div slot="left" @click="notice">
					<svg-icon icon-class="notice"></svg-icon>
					<span>行情提醒</span>
				</div>
				<div slot="right" @click="sheetVisible = true">更多...</div>
			</mt-header>
			<div class="platform-tab">
				<div 
					class="platform-item mbaex-logo" 
					:class="{'select-platform': platform == 'mbaex'}" 
					@click="changePlatform('mbaex')">
				</div>
				<div 
					class="platform-item eunex-logo" 
					:class="{'select-platform': platform == 'eunex'}" 
					@click="changePlatform('eunex')">
				</div>
			</div>
			<tabs class="navbar" :selected="selectedId" :tabs="tabs" @change="changeTab"></tabs>
			<div id="coins">
				<coin-item v-for="(item, i) in list" :key="i" :marketCoin="item"></coin-item>
			</div>
			<div class="about-info" id="about">
				<p class="info-txt">实时掌握行情变化  把握每次赚钱机会</p>
				<div class="features">
					<router-link tag="div" class="feature" to="attentionpublic">关注公众号</router-link>
					<div class="feature">获取小程序</div>
					<div class="feature">意见反馈</div>
					<router-link tag="div" class="feature" to="contactcustomerservice">联系客服</router-link>
				</div>
				<router-link tag="div" class="about" to="about">M圈专业的技术团队，旨为M粉量身高</router-link>
				<p class="info-txt-b">©2018-2028 MHelper, Inc. All rights reserved</p>
			</div>
			<div class="qrcode-info" v-show="!!qrcodeImg">
				<div class="qrcode-txt">识别二维码，了解更多行情</div>
				<div class="qrcode-img">
					<img id="qrcode-img" :src="qrcodeImg" alt="" />
				</div>
			</div>
		</div>
		<div style="height:90px" id="block"></div>
		<mt-popup v-model="popupVisible">
            <div class="download-div">
                <img class="download-img" :src="imgUri" alt="">
                <p class="download-txt">长按图片保存</p>
            </div>
        </mt-popup>
	</div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui'
import html2canvas from 'html2canvas'
import QRCode from 'qrcode'
import CoinItem from './components/CoinItem'
import Tabs from '../Common/Tabs'
import { Popup } from 'mint-ui'
import Coin from '../../api/Coin'
import Market from '../../api/Market'
import { SORTS } from '../../utils/consts'
import { saveHtml2Img } from '../../utils/common'
import { setInterval } from 'timers';
export default {
	name: "Home",
	components: { CoinItem, Tabs, Popup },
	data() {
		return {
			popupVisible: false,
			qrcodeImg: '',
			imgUri: '',
			wait: 10,
			canRefresh: true,
			sheetVisible: false,
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
					name: '保存行情为图片',
					method: () => {
						const opts = {
							errorCorrectionLevel: 'H',
							type: 'image/jpeg',
							rendererOpts: {
								quality: 0.3
							}
						}
						const userInfo = localStorage.getItem('userInfo')
						let link = ''
						if (userInfo) {
							const user = JSON.parse(userInfo)
							link = `https://m.mhelper.co/#/?recommender=${user.userid}`
						}
						QRCode.toDataURL(link, opts, (err, url) => {
							if (err) throw err
							console.log(url)
							this.qrcodeImg = url

							this.$nextTick(() => {
								const contain = document.getElementById('contain')
								const about = document.getElementById('about')
								contain.removeChild(about)
								html2canvas(contain, {
									useCORS: true
								}).then((canvas) => {
									// 生成base64图片数据
									const imgData = canvas.toDataURL('image/png')
									// 获取生成的图片的url
									this.imgUri = imgData.replace('image/png', 'image/octet-stream')
									this.popupVisible = true
								})
							})
						})
					}
				}],
			selectedId: 1,
			oTabs: [],
			tabs: [],
			platform: 'mbaex',
			list: [],
			timer: null
		}
	},
	created() {
		this.getCoinList()
		this.timer = setInterval(() => {
			this.autoRefresh()
		}, 30000)
	},
	destroyed() {
		this.timer = null
	},
	mounted() {
		// const contain = document.getElementById('contain')
		// contain.scrollTop = 0
	},
	methods: {
		changePlatform(platform) {
			this.platform = platform
			if (this.platform == 'mbaex') {
				const tabs = ['USDT', 'BTC', 'MDP']
				this.tabs = this.oTabs.filter(item => tabs.includes(item.name))
			} else if (this.platform == 'eunex') {
				const tabs = ['USDT', 'BTC', 'ETH']
				this.tabs = this.oTabs.filter(item => tabs.includes(item.name))
				this.tabs[0] = {
					id: 1,
					coinId: 1,
					name: 'USDTK',
					code: 'USDTK',
					coinName: 'USDTK'
				}
			}
			this.selectedId = 1
			this.refresh()
		},
		changeTab(id) {
			if (this.selectedId != id) {
				this.selectedId = id
				this.refresh()
			}
		},
		notice() {
			Toast('暂未开放！')
		},
		refreshCon() {
			if (!this.canRefresh) return
			this.timeGo()
			this.refresh()
		},
		async refresh() {
			Indicator.open()
			this.list = []
			const list = await this.getMarketList('mbaex')
			const sortData = []
			for (let i = 0; i < SORTS.length; i++) {
				for (let x = 0; x < list.length; x++) {
					if (list[x].name.split('/')[0].includes(SORTS[i])) {
						sortData.push(list[x])
					}
				}
			}
			this.list = sortData
			Indicator.close()
		},
		async autoRefresh() {
			const list = await this.getMarketList('mbaex')
			const sortData = []
			for (let i = 0; i < SORTS.length; i++) {
				for (let x = 0; x < list.length; x++) {
					if (list[x].name.split('/')[0].includes(SORTS[i])) {
						sortData.push(list[x])
					}
				}
			}
			this.list = sortData
		},
		getCoinList() {
			Coin.find().then(res => {
				this.oTabs = res
				if (this.platform == 'mbaex') {
					const tabs = ['USDT', 'BTC', 'MDP']
					this.tabs = this.oTabs.filter(item => tabs.includes(item.name))
				} else if (this.platform == 'eunex') {
					const tabs = ['USDT', 'BTC', 'ETH']
					this.tabs = this.oTabs.filter(item => tabs.includes(item.name))
					this.tabs[0] = {
						id: 1,
						coinId: 1,
						name: 'USDTK',
						code: 'USDTK',
						coinName: 'USDTK'
					}
				}
				this.selectedId = 1
				this.refresh()
			})
		},
		getMarketList(platform) {
			return Market.find({
				coinId: this.selectedId,
				platform: this.platform
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
		padding-top 119px
		padding-bottom 55px
	.download-div
		max-width 300px
		.download-img
			max-width 300px
			height 600px
		.download-txt
			text-align center
			height 50px
			line-height 50px
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
		.about
			color #26a2ff
			line-height 2
			text-align center
	.qrcode-info
		display flex
		height 90px
		line-height 90px
		.qrcode-txt
			flex 1
			padding-left 10px
		.qrcode-img
			flex 0 0 90px
			#qrcode-img
				margin-top 10px
				width 70px
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
	.platform-tab
		position fixed
		left 0
		top 40px
		z-index 999
		width 100%
		height 40px
		background-color #ffffff
		display flex
		&:after
			position absolute
			bottom 0
			left 0
			content " "
			display block
			height 1px
			width 100%
			border-bottom 1px solid #e2e2e2
			-webkit-transform-origin 0 100%
			transform-origin 0 100%
			-webkit-transform scaleY(0.5)
			transform scaleY(0.5)
		.platform-item
			flex 1
			&.mbaex-logo
				height 100%
				background-image url('../../assets/logo-mbaex.png')
				background-repeat no-repeat
				background-size 50%
				background-position center
			&.eunex-logo
				height 100%
				background-image url('../../assets/logo-eunex.png')
				background-repeat no-repeat
				background-size 50%
				background-position center
		.select-platform
			position relative
			&:after
				content ''
				display block
				width 100%
				height 3px
				background-color #26a2ff
				position absolute
				left 0
				bottom 0
	.navbar
		position fixed
		left 0
		width 100%
		z-index 999
		top 80px
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
