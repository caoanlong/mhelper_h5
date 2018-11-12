<template>
	<div class="container">
		<mt-header fixed :title="$route.meta.title"></mt-header>
		<router-link tag="div" class="member-info" to="mineinfo">
			<div class="avatar">
				<img src="../../assets/defaultAvatar.png" alt="">
			</div>
			<div class="info">
				<div class="name">小明</div>
				<div class="mobile">13049497395</div>
			</div>
			<i class="mint-cell-allow-right"></i>
		</router-link>
		<mt-cell title="等级" value="黄金会员" to="mineinfo" is-link></mt-cell>
		<mt-cell title="业绩" to="http://www.baidu.com" is-link></mt-cell>
		<mt-cell title="贡献值" value="125" to="http://www.baidu.com" is-link></mt-cell>
		<mt-cell title="银行卡" to="http://www.baidu.com" is-link></mt-cell>
	</div>
</template>

<script>
export default {
	name: "Mine",
	data() {
		return {
			
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
