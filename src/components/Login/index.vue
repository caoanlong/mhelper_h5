<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<div slot="left" class="back" @click="back"></div>
		</mt-header>
        <mt-field label="手机号" placeholder="请输入手机号" v-model="member.mobile"></mt-field>
        <mt-field label="验证码" placeholder="请输入验证码" v-model="member.vcode">
            <mt-button size="small">获取验证码</mt-button>
        </mt-field>
        <div class="login">
			<mt-button type="primary" style="width:100%">登录</mt-button>
		</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            member: {
                mobile: '',
                vcode: ''
            }
        }
    },
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
    .login
		padding 20px 10px
</style>
