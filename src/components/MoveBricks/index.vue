<template>
	<div class="home-container">
		<div class="refresh" @click="refreshCon" v-if="canRefresh">
			<svg-icon icon-class="refresh"></svg-icon>
		</div>
		<div id="contain">
			<mt-header 
				style="width:100%;top:0;left:0;z-index:20" 
				:style="{'position': isScreenShot ? 'absolute' : 'fixed'}" 
				:title="$route.meta.title">
				<router-link to="" slot="left" @click.native="back">
					<mt-button icon="back">返回</mt-button>
				</router-link>
				<div slot="right" @click="share">
					<svg-icon icon-class="share"></svg-icon>
				</div>
			</mt-header>
			<tabs 
				class="navbar" 
				:style="{'position': isScreenShot ? 'absolute' : 'fixed'}" 
				:selected="selectedId" 
				:tabs="tabs" 
				@change="changeTab">
			</tabs>
			<div>
				<coin-item-mutiple v-for="(item, i) in list" :key="i" :marketCoin="item"></coin-item-mutiple>
			</div>
			<div class="qrcode-info" v-show="!!qrcodeImg">
				<div class="qrcode-img">
					<img id="qrcode-img" :src="qrcodeImg" alt="" />
				</div>
				<div class="qrcode-txt">识别二维码，随时掌握行情变化</div>
			</div>
		</div>
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
import Tabs from '../Common/Tabs'
import moment from 'moment'
import Coin from '../../api/Coin'
import Market from '../../api/Market'
import CoinItemMutiple from './components/CoinItemMutiple'
import { SORTS } from '../../utils/consts'
export default {
	name: "Home",
	components: { CoinItemMutiple, Tabs },
	data() {
		return {
			isScreenShot: false,
			qrcodeImg: '',
			imgUri: '',
			wait: 10,
			canRefresh: true,
			selectedId: 1,
			tabs: [],
			oTabs: [],
			options: {
				activeColor: '#26a2ff',
				labelKey: 'name'
			},
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
		clearInterval(this.timer)
		this.timer = null
	},
	methods: {
		autoRefresh() {
			this.refresh(true)
		},
		changeTab(id) {
			if (this.selectedId != id) {
				this.selectedId = id
				this.refresh()
			}
		},
		refreshCon() {
			if (!this.canRefresh) return
			this.timeGo()
			this.refresh()
		},
		async refresh(bool) {
			!bool && Indicator.open()
			!bool && (this.list = [])
			const mbaexList = await this.getMarketList('mbaex')
			const eunexList = await this.getMarketList('eunex')
			const sortData = []
			for (let i = 0; i < SORTS.length; i++) {
				const item = { mbaex: null, eunex: null}
				for (let x = 0; x < mbaexList.length; x++) {
					if (SORTS[i] == mbaexList[x].name.split('/')[0]) {
						item.mbaex = mbaexList[x]
					}
				}
				for (let y = 0; y < eunexList.length; y++) {
					if (SORTS[i] == eunexList[y].name.split('/')[0]) {
						item.eunex = eunexList[y]
					}
				}
				if (item.mbaex && item.eunex) sortData.push(item)
			}
			const list = sortData.map(item => {
				const min = Math.min(item.mbaex.price, item.eunex.price)
				return {
					mbaex: {
						image: item.mbaex.image,
						name: item.mbaex.name.split('/')[0],
						volume: item.mbaex.volume > 10000 
                            ? (item.mbaex.volume/10000).toFixed(2) + '万' 
                            : item.mbaex.volume.toFixed(2),
						price: +item.mbaex.price,
						RMBprice: item.mbaex.price.mul(7),
						change: item.mbaex.change
					}, 
					eunex: {
						image: item.eunex.image,
						name: item.eunex.name.split('/')[0],
						volume: item.eunex.volume > 10000 
                            ? (item.eunex.volume/10000).toFixed(2) + '万' 
                            : item.eunex.volume.toFixed(2),
						price: +item.eunex.price,
						RMBprice: item.eunex.price.mul(7),
						change: +(item.eunex.change * 100).toFixed(2)
					},
					spread: +(item.eunex.price - item.mbaex.price).toFixed(2),
					spreadPercent: min ? ((item.eunex.price - item.mbaex.price)/min * 100) : ''
				}
			})
			for (let i = 0; i < list.length - 1; i++) {
				for (let j = i + 1; j < list.length; j++) {
					if (list[i].spreadPercent < list[j].spreadPercent) {
						const temp = list[i]
						list[i] = list[j]
						list[j] = temp
					}
				}
			}
			this.list = list
			!bool && Indicator.close()
		},
		getCoinList() {
			Coin.find().then(res => {
				this.oTabs = res
				this.tabs = this.oTabs.filter(item => ['BTC', 'USDTK'].includes(item.name)).reverse()
				this.selectedId = this.tabs[0].coinId
				this.refresh()
			})
		},
		getMarketList(platform) {
			return Market.find({
				coinId: this.selectedId,
				platform
			})
		},
		share() {
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
				this.isScreenShot = true
				this.$nextTick(() => {
					const contain = document.getElementById('contain')
					html2canvas(contain, {
						useCORS: true
					}).then((canvas) => {
						this.isScreenShot = false
						// 生成base64图片数据
						const imgData = canvas.toDataURL('image/png')
						// 获取生成的图片的url
						this.imgUri = imgData.replace('image/png', 'image/octet-stream')
						this.qrcodeImg = ''
						this.$modal.show('download')
					})
				})
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
		back() {
			this.$router.push({name: 'home'})
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
		padding-top 79px
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
				background-color #cccccc
	.refresh
		position fixed
		z-index 9999
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
	.navbar
		position fixed
		left 0
		top 40px
		width 100%
		z-index 999
</style>
