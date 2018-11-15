<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<div slot="left" @click="back">
                <svg-icon icon-class="arrowleft"></svg-icon>
                <span>返回</span>
            </div>
		</mt-header>
        <div class="member-info">
            <div class="title">头像</div>
			<div class="avatar">
				<img src="../../assets/defaultAvatar.png" alt="">
			</div>
			<i class="mint-cell-allow-right"></i>
		</div>
		<mt-cell title="昵称" value="小明" to="http://www.baidu.com" is-link></mt-cell>
		<mt-cell title="手机号" value="13049497395" to="http://www.baidu.com" is-link></mt-cell>
		<div class="logout">
			<mt-button type="danger" style="width:100%">退出</mt-button>
		</div>
    </div>
</template>

<script>
export default {
    methods: {
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>
.container
	padding-top 40px
	.back
		width 40px
		height 40px
		position relative
		&:before
			content ""
			display block
			width 10px
			height 10px
			border-top 2px solid #ffffff
			border-left 2px solid #ffffff
			transform rotate(-45deg)
			position absolute
			top 15px
			left 5px
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
		.title
			flex 0 0 80px
			line-height 80px
			padding-left 10px
		.avatar
			flex 1
			position relative
			img
				position absolute
				right 34px
				top 10px
				display block
				width 60px
	.logout
		padding 20px 10px
</style>
