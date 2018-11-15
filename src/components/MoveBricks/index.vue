<template>
	<div class="home-container">
		<div class="refresh" @click="refresh">
			<svg-icon icon-class="refresh"></svg-icon>
		</div>
		<mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
		<ly-tab 
			style="top:40px"
			class="navbar"
			:items="tabs"
			:options="options" 
			@change="changeTab">
		</ly-tab>
		<div>
			<coin-item-mutiple v-for="(item, i) in list" :key="i" :marketCoin="item"></coin-item-mutiple>
		</div>
	</div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui'
import moment from 'moment'
import Coin from '../../api/Coin'
import Market from '../../api/Market'
import CoinItemMutiple from './components/CoinItemMutiple'
import { SORTS } from '../../utils/consts'
export default {
	name: "Home",
	components: { CoinItemMutiple },
	data() {
		return {
			selectedId: '',
			tabs: [],
			options: {
				activeColor: '#26a2ff',
				labelKey: 'name'
			},
			list: []
		}
	},
	created() {
		this.getCoinList()
	},
	methods: {
		changeTab(item, index) {
			if (this.selectedId != item.id) {
				this.selectedId = item.id
				this.refresh()
			}
		},
		async refresh() {
			Indicator.open()
			this.list = []
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
				if (item.mbaex || item.eunex) sortData.push(item)
			}
			this.list = sortData
			Indicator.close()
		},
		getCoinList() {
			Coin.find().then(res => {
				this.tabs = res
				this.selectedId = res[0].id
				this.refresh()
			})
		},
		getMarketList(platform) {
			return Market.find({
				coinId: this.selectedId,
				platform
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
</style>

<style lang="stylus" scoped>
.home-container
	position absolute
	top 0
	left 0
	right 0
	bottom 0
	padding-top 79px
	padding-bottom 55px
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
