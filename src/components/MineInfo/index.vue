<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
        <router-link tag="div" class="member-info" to="avatar">
            <div class="title">头像</div>
			<div class="avatar">
				<img :src="user.avator ? user.avator : require('../../assets/defaultAvatar.png')" alt="">
			</div>
			<i class="mint-cell-allow-right"></i>
		</router-link>
		<mt-cell title="昵称" :value="user.nickname" :to="{
			name: 'modify', query: {name: '昵称', type: 'nickname', value: user.nickname}
			}" is-link></mt-cell>
		<mt-cell title="手机号" :value="user.cellphone" :to="{
			name: 'modifymobile', query: {value: user.cellphone}
			}" is-link></mt-cell>
		<div class="logout">
			<mt-button type="danger" style="width:100%" @click="loginOut">退出</mt-button>
		</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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
		loginOut() {
			this.$store.dispatch('loginOut').then(() => {
				this.$router.push({name: 'login'})
			})
		},
		back() {
			this.$router.push({name: 'mine'})
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
				border-radius 30px
	.logout
		padding 20px 10px
</style>
