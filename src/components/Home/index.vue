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
			tableData: [
				{
					name:"MTR",1104:"7.05",1103:"4.67",1102:"9.56",1101:"4.21"
				},{
					name:"MAT",1104:"7.05",1103:"4.67",1102:"9.56",1101:"4.21"
				},{
					name:"DRT",1104:"7.05",1103:"4.67",1102:"9.56",1101:"4.21"
				},{
					name:"XRP",1104:"7.05",1103:"4.67",1102:"9.56",1101:"4.21"
				},{
					name:"WCG",1104:"7.05",1103:"4.67",1102:"9.56",1101:"4.21"
				}		
			],
			columns: [
				{
					field: 'name', title: '币种', width: 96, titleAlign: 'center', columnAlign: 'left',isResize:true, isFrozen: true, componentName: 'table-market'
				},{
					field: '1104', title: '今天', width: 160, titleAlign: 'center', columnAlign: 'right',isResize:true, componentName: 'table-price'
				},{
					field: '1103', title: '昨天', width: 160, titleAlign: 'center', columnAlign: 'right',isResize:true, componentName: 'table-price'
				},{
					field: '1102', title: '前天', width: 160, titleAlign: 'center', columnAlign: 'right',isResize:true, componentName: 'table-price'
				},{
					field: '1101', title: '11月01日', width: 160, titleAlign: 'center', columnAlign: 'right',isResize:true, componentName: 'table-price'
				}
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
				this.getMarketList()
			})
		},
		getMarketList(loaded) {
			Indicator.open()
			Market.find({
				coinId: this.selected
			}).then(res => {
				this.markets = res
				this.tableData = res.map(item => {
					return {
						name: item.name.split('/')[0],
						volume: item.volume > 1000 
							? (item.volume/1000).toFixed(2) + '万' 
							: item.volume.toFixed(2),
						image: item.image,
						1104: { price: item.price.mul(7), change: item.change },
						1103: { price: 4.67, change: 0.1},
						1102: { price: 4.67, change: 0.1},
						1101: { price: 4.67, change: 0.1}
					}
				})
				Indicator.close()
				loaded && loaded('done')
			}).catch(err => {
				loaded && loaded('fail')
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
