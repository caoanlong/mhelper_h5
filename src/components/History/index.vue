<template>
	<div class="history-container">
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
			<market-tab 
				:style="{'position': isScreenShot ? 'absolute' : 'fixed'}"
				class="market-tab" 
				:tabs="markets" 
				:selected="market" 
				@change="changeMarket">
			</market-tab>
			<currency-tab 
				:style="{'position': isScreenShot ? 'absolute' : 'fixed'}"
				class="navbar" 
				:tabs="currencys" 
				:selected="currency" 
				@change="changeCurrency">
			</currency-tab>
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
import MarketTab from '../Common/MarketTab'
import CurrencyTab from '../Common/CurrencyTab'
import Market from '../../api/Market'
export default {
	name: "Home",
	components: { MarketTab, CurrencyTab },
	data() {
		return {
			isScreenShot: false,
			qrcodeImg: '',
			imgUri: '',
			wait: 10,
			canRefresh: true,
			currency: '',
			currencys: [],
			market: '',
			markets: [],
			platform: 'mbaex',
			tableData: [],
			columns: [],
			timer: null
		}
	},
	created() {
		this.getMarkets()
		this.timer = setInterval(() => {
			this.getHistory(true)
		}, 30000)
	},
	destroyed() {
		clearInterval(this.timer)
		this.timer = null
	},
	methods: {
		refreshCon() {
			if (!this.canRefresh) return
			this.timeGo()
			this.getHistory()
		},
		changeMarket(market) {
			this.market = market
			this.getCurrencys()
		},
		changeCurrency(currency) {
			this.currency = currency
			this.getHistory()
		},
		getMarkets() {
			Market.getmarkets().then(res => {
				this.market = res[0]
				this.markets = res
				this.getCurrencys()
			})
		},
		getCurrencys() {
			Market.getcurrencys({
				market: this.market
			}).then(res => {
				this.currency = res[0]
				this.currencys = res
				this.getHistory()
			})
		},
		getHistory(bool) {
			!bool && Indicator.open()
			Market.newhistoryList({
				currency: this.currency,
				market: this.market
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
					const coinname = today.markets[i].coinname
					const image = today.markets[i].image 
						? this.IMGURL + today.markets[i].image 
						: require('../../assets/defaultImg.svg')
					const item = { coinname, image }
					for (let j = 0; j < res.length; j++) {
						for (let y = 0; y < res[j].markets.length; y++) {
							const market = res[j].markets[y]
							if (coinname == market.coinname) {
								const price = +market.lastprice
								const priceRMB = price ? price.mul(7) : 0
								const change = +market.change
								const volume = +market.volume
								item[moment(res[j].date).format('MM-DD')] = {
									price: price > 0.001 
										? price.toFixed(2) 
										: price.toFixed(6),	
									priceRMB: priceRMB > 0.001 
										? priceRMB.toFixed(2) 
										: priceRMB.toFixed(6),
									change: change ? change.toFixed(2) : 0,
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
				this.tableData = data
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
		padding-top 106px
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
	.market-tab
		position fixed
		left 0
		top 40px
		z-index 999
		width 100%
	.navbar
		position fixed
		left 0
		width 100%
		z-index 999
		top 76px
</style>
