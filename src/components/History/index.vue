<template>
	<div class="history-container">
		<div class="refresh" @click="refresh">
			<svg-icon icon-class="refresh"></svg-icon>
		</div>
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
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
		<ly-tab 
			class="navbar"
			:items="tabs"
			:options="options" 
			@change="changeTab">
		</ly-tab>
		<v-table 
			:title-row-height="30"
			:row-height="90"
			is-horizontal-resize
			:vertical-resize-offset='5'
			style="width:100%" 
			:columns="columns"
			:table-data="tableData">
		</v-table>
	</div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui'
import moment from 'moment'
import Coin from '../../api/Coin'
import Market from '../../api/Market'
import { SORTS } from '../../utils/consts'
export default {
	name: "Home",
	data() {
		return {
			selectedId: '',
			tabs: [],
			options: {
				activeColor: '#26a2ff',
				labelKey: 'name'
			},
			platform: 'mbaex',
			tableData: [],
			columns: []
		}
	},
	created() {
		this.getCoinList()
	},
	methods: {
		changePlatform(platform) {
			this.platform = platform
			this.getMarketHistoryList()
		},
		changeTab(item, index) {
			if (this.selectedId != item.id) {
				this.selectedId = item.id
				this.getMarketHistoryList()
			}
		},
		refresh() {
			this.getMarketHistoryList()
		},
		getCoinList() {
			Coin.find().then(res => {
				this.tabs = res
				this.selectedId = res[0].id
				this.getMarketHistoryList()
			})
		},
		getMarketHistoryList() {
			Indicator.open()
			this.tableData = []
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
				for (let n = 0; n < SORTS.length; n++) {
					for (let z = 0; z < data.length; z++) {
						if (SORTS[n] == data[z].name.split('/')[0]){
							sortData.push(data[z])
						}
					}
				}
				this.tableData = sortData
				Indicator.close()
			}).catch(err => {
				Indicator.close()
			})
        },
        back() {
			this.$router.go(-1)
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
	z-index 9999
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
	padding-top 119px
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
		box-shadow 0 2px 4px rgba(0,0,0,.4)
	.navbar
		position fixed
		left 0
		top 80px
		width 100%
		z-index 9999
</style>
