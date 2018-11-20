<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
            <router-link to="/register" slot="right">
				<mt-button>注册</mt-button>
			</router-link>
		</mt-header>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="member.loginaccount"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" v-model="member.password"></mt-field>
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
                this.$router.push({name: 'home'})
            })
        },
        goRegister() {
            this.$router.push({ name: 'register' })
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
    .login
		padding 20px 10px
</style>
