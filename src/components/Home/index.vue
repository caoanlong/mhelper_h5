<template>
	<div class="container">
		<mt-header fixed title="MHelper">
			<div slot="left" class="logo">
				<img src="../../assets/logo.png"/>
			</div>
			<div slot="right">
				<svg-icon icon-class="notice" class="set-icon"></svg-icon>
				<span>行情提醒</span>
			</div>
		</mt-header>
		<mt-navbar v-model="selected" class="navbar">
			<mt-tab-item 
				:id="item.id" 
				v-for="item in tabs" 
				:key="item.id">
				{{item.name}}
			</mt-tab-item>
		</mt-navbar>
		<v-table
			:title-row-height="30"
			:row-height="60"
			:height="tableHeight"
			is-horizontal-resize
			:vertical-resize-offset='5'
			style="width:100%"
			:columns="columns"
			:table-data="tableData"
			row-hover-color="#eee"
			row-click-color="#edf7ff">
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
			selected: '',
			tabs: [],
			titleList: [
				{ name: '币种', flex: 2 },
				{ name: '成交额', flex: 2 },
				{ name: '价格', flex: 5 },
				{ name: '涨幅', flex: 3 }
			],
			tableHeight: 0,
			tableData: [],
			columns: [
				
			]
		}
	},
	watch: {
		selected(coinId) {
			this.getMarketList()
		}
	},
	created() {
		// 145
		this.tableHeight = window.screen.availHeight-145
		this.getCoinList()
	},
	methods: {
		getCoinList() {
			Coin.find().then(res => {
				this.tabs = res
				this.selected = res[0].id
			})
		},
		getMarketList() {
			Indicator.open()
			Market.find({
				coinId: this.selected
			}).then(res => {
				const columns = []
				for (let x = 0; x < res.length; x++) {
					const element = res[x]
					const curDate = moment(res[x].date).format('MM-DD')
					columns.push({
						field: curDate, 
						title: curDate, 
						width: 160, 
						titleAlign: 'center', 
						columnAlign: 'right',
						isResize: true, 
						componentName: 'table-price'
					})
				}
				this.columns = [
					{
						field: 'name', title: '币种', width: 96, titleAlign: 'center', columnAlign: 'left',isResize:true, isFrozen: true, componentName: 'table-market'
					}, ...columns]
				const today = res[0]
				const data = []
				for (let i = 0; i < today.markets.length; i++) {
					const name = today.markets[i].name.split('/')[0]
					const item = {
						name,
						volume: today.markets[i].volume > 1000 
							? (today.markets[i].volume/1000).toFixed(2) + '万' 
							: today.markets[i].volume.toFixed(2),
						image: today.markets[i].image
					}
					for (let j = 0; j < res.length; j++) {
						const price = res[j].markets[i].price
						const priceRMB = price.mul(7)
						const change = res[j].markets[i].change
						item[moment(res[j].date).format('MM-DD')] = {
							price: price > 0.0001 
								? price.toFixed(2) 
								: price.toFixed(6),
							priceRMB: priceRMB > 0.0001 
								? priceRMB.toFixed(2) 
								: priceRMB.toFixed(6),
							change: change.toFixed(2)
						}
					}
					data.push(item)
				}
				this.tableData = data
				Indicator.close()
			})
		},
		getHistoryList() {
			Market.historyList({
				coinId: this.selected
			}).then(res => {
				res.forEach(item => {
					const curDate = moment(item.historyTime).format('MM-DD')
					this.columns.push({
						field: curDate, 
						title: curDate, 
						width: 160, 
						titleAlign: 'center', 
						columnAlign: 'right',
						isResize:true, 
						componentName: 'table-price'
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
	padding-top 89px
	padding-bottom 55px
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
		top 40px
		left 0
		width 100%
		z-index 999
</style>
