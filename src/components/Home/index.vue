<template>
	<div class="home-container">
		<div class="refresh" @click="refresh">
			<svg-icon icon-class="refresh"></svg-icon>
		</div>
		<mt-header fixed :title="$route.meta.title">
			<div slot="left" @click="notice">
                <svg-icon icon-class="notice"></svg-icon>
				<span>行情提醒</span>
            </div>
			<mt-button icon="more" slot="right" @click="sheetVisible = true"></mt-button>
		</mt-header>
		<mt-actionsheet
			:actions="actions"
			v-model="sheetVisible">
		</mt-actionsheet>
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
			style="top:80px"
			class="navbar"
			:items="tabs"
			:options="options" 
			@change="changeTab">
		</ly-tab>
		<div>
			<coin-item v-for="(item, i) in list" :key="i" :marketCoin="item"></coin-item>
		</div>
		<div style="height:90px"></div>
	</div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui'
import Coin from '../../api/Coin'
import Market from '../../api/Market'
import CoinItem from './components/CoinItem'
import { SORTS } from '../../utils/consts'
export default {
	name: "Home",
	components: { CoinItem },
	data() {
		return {
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
					name: '行情提醒',
					method: () => {
						this.notice()
					}
				}],
			selectedId: '',
			tabs: [],
			options: {
				activeColor: '#26a2ff',
				labelKey: 'name'
			},
			platform: 'mbaex',
			list: []
		}
	},
	created() {
		this.getCoinList()
	},
	methods: {
		changePlatform(platform) {
			this.platform = platform
			this.refresh()
		},
		changeTab(item, index) {
			if (this.selectedId != item.id) {
				this.selectedId = item.id
				this.refresh()
			}
		},
		notice() {
			Toast('暂未开放！')
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
				platform: this.platform
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
.home-container
	position absolute
	top 0
	left 0
	right 0
	bottom 0
	padding-top 119px
	padding-bottom 55px
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
