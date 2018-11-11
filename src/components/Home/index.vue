<template>
	<div 
		class="container" 
		:style="{'padding-top': isMiniprogram ? '39px' : '79px', 'padding-bottom': isMiniprogram ? '0' : '55px'}">
		<mt-header fixed title="MHelper" v-if="!isMiniprogram">
			<div slot="left" class="logo">
				<img src="../../assets/logo.png"/>
			</div>
			<div slot="right">
				<svg-icon icon-class="notice" class="set-icon"></svg-icon>
				<span>行情提醒</span>
			</div>
		</mt-header>
		<ly-tab 
			:style="{'top': isMiniprogram ? '0' : '40px'}"
			class="navbar"
			:items="tabs"
			:options="options" 
			@change="changeTab">
		</ly-tab>
		<v-table
			:title-row-height="30"
			:row-height="90"
			:height="tableHeight"
			is-horizontal-resize
			:vertical-resize-offset='5'
			style="width:100%" 
			:columns="columns"
			:table-data="tableData">
		</v-table>
	</div>
</template>

<script>
import { Indicator } from 'mint-ui'
import moment from 'moment'
import Coin from '../../api/Coin'
import Market from '../../api/Market'
export default {
	name: "Home",
	data() {
		return {
			isMiniprogram: true,
			selectedId: '',
			tabs: [],
			options: {
				activeColor: '#26a2ff',
				labelKey: 'name'
			},
			titleList: [
				{ name: '币种', flex: 2 },
				{ name: '成交额', flex: 2 },
				{ name: '价格', flex: 5 },
				{ name: '涨幅', flex: 3 }
			],
			tableHeight: 0,
			tableData: [],
			columns: [],
			sorts: ['WCG','MDP','DRT','MAT','MTR','ALLN','BTC','XRP','ETH','LTC','BCH', 'DASH']
		}
	},
	created() {
		// 145
		// this.tableHeight = window.screen.availHeight-145
		this.tableHeight = window.screen.availHeight
        // if (/MicroMessenger/i.test(navigator.userAgent)) {
        // 	//ios的ua中无miniProgram，很坑爹,但都有MicroMessenger（表示是微信浏览器）
        //     wx.miniProgram.getEnv((res)=>{
        //         if (res.miniprogram) {
        //             this.isMiniprogram = true
        //         } else {
        //             this.isMiniprogram = false
        //         }
        //     })
        // }
		this.getCoinList()
	},
	methods: {
		changeTab(item, index) {
			if (this.selectedId != item.id) {
				this.selectedId = item.id
				this.getMarketList()
			}
		},
		getCoinList() {
			Coin.find().then(res => {
				this.tabs = res
				this.selectedId = res[0].id
				this.getMarketList()
			})
		},
		getMarketList() {
			Indicator.open()
			Market.find({
				coinId: this.selectedId
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
									volume: volume > 1000 
										? (volume/1000).toFixed(2) + '万' 
										: volume.toFixed(2),
								}
							}
						}
					}
					for (let z = 0; z < sorts.length; z++) {
						if (item.name.split('/')[0] == sorts[z]) data.push(item)
					}
				}
				this.tableData = data
				Indicator.close()
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
</style>

<style lang="stylus" scoped>
.top-load-wrapper,.bottom-load-wrapper
	line-height 50px
	text-align center
	color #aaa
.icon-arrow
	transition .2s
	transform rotate(180deg)
.icon-loading
	transform rotate(0deg)
	animation-name loading
	animation-duration 3s
	animation-iteration-count: infinite
	animation-direction alternate
@keyframes loading
	from {transform: rotate(0deg)}
	to {transform: rotate(360deg)}
.container
	position absolute
	top 0
	left 0
	right 0
	bottom 0
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
		width 100%
		z-index 9999
</style>
