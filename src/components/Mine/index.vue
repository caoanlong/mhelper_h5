<template>
	<div class="container">
		<mt-header fixed :title="$route.meta.title"></mt-header>
		<router-link tag="div" class="member-info" to="mineinfo">
			<div class="avatar">
				<img :src="(user && user.avator) ? user.avator : require('../../assets/defaultAvatar.png')" alt="">
			</div>
			<div class="info">
				<div class="name">{{user && user.nickname}}</div>
				<div class="mobile">{{user && user.cellphone}}&nbsp;&nbsp;UID:{{user && user.userid}}</div>
			</div>
			<i class="mint-cell-allow-right"></i>
		</router-link>
		<mt-cell title="等级" value="普通会员" is-link @click.native="hope"></mt-cell>
		<mt-cell title="业绩" to="performance" is-link></mt-cell>
		<mt-cell title="贡献值" :value="user && user.last_num" to="contribution" is-link></mt-cell>
		<mt-cell title="购买记录" is-link @click.native="hope"></mt-cell>
		<mt-cell title="结算" is-link @click.native="hope"></mt-cell>
		<mt-cell title="银行卡" is-link @click.native="hope"></mt-cell>
		<mt-cell title="关于" is-link to="about"></mt-cell>
		<mt-cell title="关注公众号获得行情通知" is-link to="attentionpublic"></mt-cell>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
export default {
	name: "Mine",
	data() {
		return {
			user: {}
		}
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	created() {
		this.$store.dispatch('getUserInfo').then(() => {
			this.user = this.userInfo
		})
	},
	methods: {
		hope() {
			Toast('敬请期待！')
		}
	}
}
</script>

<style lang="stylus" scoped>
.container
	padding-top 40px
	.member-info
		position relative
		width 100%
		height 80px
		background-color #ffffff
		margin-bottom 10px
		background-image linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%)
		background-size 100% 1px
		background-repeat no-repeat
		background-position bottom
		display flex
		.avatar
			flex 0 0 80px
			img
				display block
				width 60px
				border-radius 30px
				margin 10px 0 0 10px
		.info
			flex 1
			padding 10px 0
			.name
				font-size 18px
				color #333333
				line-height 1.8
			.mobile
				font-size 14px
				color #999999
</style>
