<template>
	<div 
		class="container" 
		style="padding-top:79px;padding-bottom:55px">
		<div class="header">
			<div class="notice">
				<svg-icon icon-class="notice"></svg-icon>
				<span>行情提醒</span>
			</div>
			<div class="tab-segment">
				<div class="left" @click="changeCurrent(true)">
					<div :class="isCur ? 'active' : ''">当前行情</div>
				</div>
				<div class="right" @click="changeCurrent(false)">
					<div :class="isCur ? '' : 'active'">历史行情</div>
				</div>
			</div>
			<div class="refresh">
				<svg-icon icon-class="refresh" @click.native="refresh"></svg-icon>
			</div>
		</div>
		<ly-tab 
			style="top:40px"
			class="navbar"
			:items="tabs"
			:options="options" 
			@change="changeTab">
		</ly-tab>
		<div v-if="isCur">
			<coin-item v-for="(item, i) in list" :key="i" :marketCoin="item"></coin-item>
		</div>
		<v-table 
			v-else
			:title-row-height="30"
			:row-height="90"
			:height="tableHeight"
			is-horizontal-resize
			:vertical-resize-offset='5'
			style="width:100%" 
			:columns="columns"
			:table-data="tableData">
		</v-table>
		<div style="height:90px"></div>
	</div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui'
import moment from 'moment'
import Coin from '../../api/Coin'
import Market from '../../api/Market'
import CoinItem from './components/CoinItem'
export default {
	name: "Home",
	components: { CoinItem },
	data() {
		return {
			isMiniprogram: false,
			selectedId: '',
			isCur: true,
			tabs: [],
			options: {
				activeColor: '#26a2ff',
				labelKey: 'name'
			},
			platform: 'mbaex',
			list: [],
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
		this.tableHeight = window.screen.availHeight-135
		this.getCoinList()
	},
	methods: {
		changeCurrent(isCur) {
			this.isCur = isCur
			this.isCur ? this.getMarketList() : this.getMarketHistoryList()
		},
		changeTab(item, index) {
			if (this.selectedId != item.id) {
				this.selectedId = item.id
				this.isCur ? this.getMarketList() : this.getMarketHistoryList()
			}
		},
		async refresh() {
			if (this.isCur) {
				await this.getMarketList()
			} else {
				await this.getMarketHistoryList()
			}
			Toast({
				message: '刷新成功！',
				duration: 500
			})
		},
		getCoinList() {
			Coin.find({
				platform: this.platform
			}).then(res => {
				this.tabs = res
				this.selectedId = res[0].id
				this.isCur ? this.getMarketList() : this.getMarketHistoryList()
			})
		},
		getMarketList() {
			Indicator.open()
			Market.find({
				coinId: this.selectedId,
				platform: this.platform
			}).then(res => {
				this.list = res
				const sortData = []
				for (let n = 0; n < this.sorts.length; n++) {
					for (let z = 0; z < res.length; z++) {
						if (this.sorts[n] == res[z].name.split('/')[0]){
							sortData.push(res[z])
						}
					}
				}
				this.list = sortData
				Indicator.close()
			}).catch(err => {
				Indicator.close()
			})
		},
		getMarketHistoryList() {
			Indicator.open()
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
									volume: volume > 1000 
										? (volume/1000).toFixed(2) + '万' 
										: volume.toFixed(2),
								}
							}
						}
					}
					data.push(item)
				}
				const sortData = []
				for (let n = 0; n < this.sorts.length; n++) {
					for (let z = 0; z < data.length; z++) {
						if (this.sorts[n] == data[z].name.split('/')[0]){
							sortData.push(data[z])
						}
					}
				}
				this.tableData = sortData
				Indicator.close()
			}).catch(err => {
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
	.header
		position fixed
		left 0
		top 0
		z-index 9999
		width 100%
		height 40px
		line-height 40px
		background-color #26a2ff
		color #ffffff
		font-size 14px
		display flex
		.notice
			flex 0 0 90px
			padding-left 10px
		.tab-segment
			flex 1
			display flex
			.left
				flex 1
				padding-left 10px
				padding-top 7px
				div
					height 26px
					line-height 26px
					text-align center
					border-top-left-radius 4px
					border-bottom-left-radius 4px
					border 1px solid #ffffff
					border-right none
					&.active
						color #26a2ff
						background-color #ffffff
						border none
			.right
				flex 1
				padding-right 10px
				padding-top 7px
				div
					height 26px
					line-height 26px
					text-align center
					border-top-right-radius 4px
					border-bottom-right-radius 4px
					border 1px solid #ffffff
					border-left none
					&.active
						color #26a2ff
						background-color #ffffff
						border none
		.refresh
			flex 0 0 90px
			padding-left 60px
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
