<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title"></mt-header>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="member.loginaccount"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" :type="isShow ? '' : 'password'" v-model="member.password">
            <div style="width:30px;color:#999;text-align:right" @click="isShow = !isShow">
                <svg-icon :icon-class="isShow ? 'eye-open' : 'eye'"></svg-icon>
            </div>
        </mt-field>
        <div class="btns">
            <router-link tag="div" class="register" to="/register">注册新帐号</router-link>
            <router-link tag="div" class="forget" :to="{name: 'forget', query: {cellphone: member.loginaccount}}">忘记密码</router-link>
        </div>
        <div class="login">
			<mt-button type="primary" style="width:100%" @click="login">登录</mt-button>
		</div>
    </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui'
import Login from '../../api/Login'
export default {
    data() {
        return {
            isShow: false,
            member: {
                loginaccount: '',
                password: '',
                accounttype: 1
            }
        }
    },
    methods: {
        login() {
            if (!this.member.loginaccount) {
                Toast('请输入手机号')
                return
            }
            if (!this.member.password) {
                Toast('请输入密码')
                return
            }
            Login.login(this.member).then(res => {
                Toast(res.data.msg)
                localStorage.setItem('token', res.headers['authorization'])
                this.$store.dispatch('getUserInfo').then(() => {
                    this.$router.push({name: 'home'})
                })
            })
        },
		back() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus" scoped>
.container
    padding-top 40px
    .btns
        display flex
        padding 10px
        .register
            flex 1
            color #ef4f4f
        .forget
            color #26a2ff
            flex 1
            text-align right
    .login
        padding 10px
</style>
