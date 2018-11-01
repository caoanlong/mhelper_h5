<template>
	<div class="container">
		<mt-header fixed title="MHelper"></mt-header>
		<mt-navbar v-model="selected" class="navbar">
			<mt-tab-item :id="item.id" v-for="item in tabs" :key="item.id">{{item.name}}</mt-tab-item>
		</mt-navbar>
		<titile-class :list="titleList" class="titile-class"></titile-class>
		<pull-to 
			:top-load-method="refresh" 
			:bottom-load-method="loadMore" 
			@top-state-change="stateChange">
			<coin-item :marketCoin="item" v-for="item in markets" :key="item.marketId"></coin-item>
			<template slot="top-block" slot-scope="props">
				<div class="top-load-wrapper">
					<svg-icon :class="{
						'icon-arrow': props.state === 'trigger',
						'icon-loading': props.state === 'loading'
					}" :icon-class="icon"/>
					{{ props.stateText }}
				</div>
			</template>
			<template slot="bottom-block" slot-scope="props">
				<div class="bottom-load-wrapper" v-if="isOver">~官人轻点，已经到底了~</div>
				<div class="bottom-load-wrapper" v-else>
					<svg-icon :class="{
						'icon-arrow': props.state === 'trigger',
						'icon-loading': props.state === 'loading'
					}" :icon-class="icon"/>
					{{ props.stateText }}
				</div>
			</template>
		</pull-to>
	</div>
</template>

<script>
import PullTo from 'vue-pull-to'
import { Indicator } from 'mint-ui'
import TitileClass from './components/TitleClass'
import CoinItem from './components/CoinItem'
import Coin from '../../api/Coin'
import Market from '../../api/Market'
export default {
	name: "Home",
	components: { TitileClass, CoinItem, PullTo },
	data() {
		return {
			selected: '',
			tabs: [],
			titleList: [
				{
					name: '市值',
					flex: 2
				},
				{
					name: '成交额',
					flex: 2
				},
				{
					name: '价格',
					flex: 5
				},
				{
					name: '涨幅',
					flex: 3
				}
			],
			markets: [],
			icon: '',
			isOver: false
		}
	},
	watch: {
		selected(coinId) {
			this.getMarketList()
		}
	},
	created() {
		this.getCoinList()
	},
	methods: {
		refresh(loaded) {
			this.imgList = []
			this.isOver = false
			this.getMarketList(loaded)
		},
		loadMore(loaded) {
			if (this.isOver) {
				loaded && loaded('done')
				return false
			}
			this.getMarketList(loaded)
		},
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
				Indicator.close()
				loaded && loaded('done')
			}).catch(err => {
				loaded && loaded('fail')
			})
		},
		stateChange(state) {
			if (state === 'pull' || state === 'trigger') {
			  this.icon = 'arrowdown'
			} else if (state === 'loading') {
			  this.icon = 'sync'
			} else if (state === 'loaded-done') {
			  this.icon = 'check-close-circle-o'
			}
		}
	}
}
</script>

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
	padding-top 116px
	padding-bottom 55px
	.navbar
		position fixed
		top 40px
		left 0
		width 100%
		z-index 999
	.titile-class
		position fixed
		top 86px
		left 0
		z-index 999
		width 100%
</style>
