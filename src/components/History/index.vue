<template>
	<div class="history-container">
		<div class="refresh" @click="refresh" v-if="canRefresh">
			<svg-icon icon-class="refresh"></svg-icon>
		</div>
		<div id="contain">
			<mt-header fixed :title="$route.meta.title">
				<router-link to="" slot="left" @click.native="back">
					<mt-button icon="back">返回</mt-button>
				</router-link>
				<div slot="right" @click="share">
					<svg-icon icon-class="share"></svg-icon>
				</div>
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
			<v-table 
				:title-row-height="30"
				:row-height="90"
				is-horizontal-resize
				:vertical-resize-offset='5'
				style="width:100%" 
				:columns="columns"
				:table-data="tableData">
			</v-table>
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
import moment from 'moment'
import Tabs from '../Common/Tabs'
import Coin from '../../api/Coin'
import Market from '../../api/Market'
import { SORTS } from '../../utils/consts'
export default {
	name: "Home",
	components: { Tabs },
	data() {
		return {
			qrcodeImg: '',
			imgUri: '',
			wait: 10,
			canRefresh: true,
			selectedId: 1,
			tabs: [],
			oTabs: [],
			platform: 'mbaex',
			tableData: [],
			columns: [],
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
			this.getMarketHistoryList(true)
		},
		changePlatform(platform) {
			this.platform = platform
			if (this.platform == 'mbaex') {
				const tabs = ['USDT', 'BTC', 'MDP', 'USDTK']
				this.tabs = this.oTabs.filter(item => tabs.includes(item.name))
			} else if (this.platform == 'eunex') {
				const tabs = ['BTC', 'ETH', 'USDTK']
				const tabList = this.oTabs.filter(item => tabs.includes(item.name))
				tabList.unshift(tabList[tabList.length-1])
				tabList.pop()
				this.tabs = tabList
			}
			this.selectedId = this.tabs[0].coinId
			this.getMarketHistoryList()
		},
		changeTab(id) {
			if (this.selectedId != id) {
				this.selectedId = id
				this.getMarketHistoryList()
			}
		},
		refresh() {
			if (!this.canRefresh) return
			this.timeGo()
			this.getMarketHistoryList()
		},
		getCoinList() {
			Coin.find().then(res => {
				this.oTabs = res
				if (this.platform == 'mbaex') {
					const tabs = ['USDT', 'BTC', 'MDP', 'USDTK']
					this.tabs = this.oTabs.filter(item => tabs.includes(item.name))
				} else if (this.platform == 'eunex') {
					const tabs = ['BTC', 'ETH', 'USDTK']
					const tabList = this.oTabs.filter(item => tabs.includes(item.name))
					tabList.unshift(tabList[tabList.length-1])
					tabList.pop()
					this.tabs = tabList
				}
				this.selectedId = this.tabs[0].coinId
				this.getMarketHistoryList()
			})
		},
		getMarketHistoryList(bool) {
			!bool && Indicator.open()
			!bool && (this.tableData = [])
			Market.historyList({
				coinId: this.selectedId,
				platform: this.platform
			}).then(res => {
				const columns = []
				for (let x = 0; x < res.length; x++) {
					const curDate = moment(res[x].date)
					columns.push({
						field: curDate.format('MM-DD'), 
						title: curDate.isSame(moment(), 'day') 
							? '今天' 
							: (curDate.isSame(moment().subtract(1, 'days'), 'day') 
								? '昨天' 
								: curDate.format('MM-DD')), 
						width: 86, 
						titleAlign: 'center', 
						columnAlign: 'right',
						isResize: true, 
						componentName: 'table-price'
					})
				}
				this.columns = [
					{
						field: 'name', 
						title: '币种', 
						width: 90, 
						titleAlign: 'center', 
						columnAlign: 'left',
						isResize:true, 
						isFrozen: true, 
						componentName: 'table-market'
					}, ...columns]
				const today = res[0]
				const data = []
				for (let i = 0; i < today.markets.length; i++) {
					const name = today.markets[i].name
					const image = today.markets[i].image
					const item = { name, image }
					for (let j = 0; j < res.length; j++) {
						for (let y = 0; y < res[j].markets.length; y++) {
							const market = res[j].markets[y]
							if (name == market.name) {
								const price = market.price
								const priceRMB = price.mul(7)
								const change = market.change
								const volume = market.volume
								item[moment(res[j].date).format('MM-DD')] = {
									price: price > 0.001 
										? price.toFixed(2) 
										: price.toFixed(6),	
									priceRMB: priceRMB > 0.001 
										? priceRMB.toFixed(2) 
										: priceRMB.toFixed(6),
									change: change.toFixed(2),
									volume: volume > 10000 
										? (volume/10000).toFixed(2) + '万' 
										: volume.toFixed(2),
									platform: market.platform
								}
							}
						}
					}
					data.push(item)
				}
				const sortData = []
				for (let n = 0; n < SORTS.length; n++) {
					for (let z = 0; z < data.length; z++) {
						if (data[z].name.split('/')[0].includes(SORTS[n])){
							sortData.push(data[z])
						}
					}
				}
				this.tableData = sortData
				!bool && Indicator.close()
			}).catch(err => {
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
				this.$nextTick(() => {
					const contain = document.getElementById('contain')
					html2canvas(contain, {
						useCORS: true
					}).then((canvas) => {
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
.platform-tab
	position fixed
	left 0
	top 40px
	z-index 9
	width 100%
	height 40px
	background-color #ffffff
	border 1px solid #dddddd
	display flex
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
</style>

<style lang="stylus" scoped>
.history-container
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
	.navbar
		position fixed
		left 0
		top 80px
		width 100%
		z-index 9
</style>
