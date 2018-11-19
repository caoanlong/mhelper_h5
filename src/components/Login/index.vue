<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="member.cellphone"></mt-field>
        <mt-field label="验证码" placeholder="请输入验证码" type="number" :attr="{ maxlength: 6 }" v-model="member.vcode">
            <mt-button size="small" @click="getVcode">获取验证码</mt-button>
        </mt-field>
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
                cellphone: '',
                vcode: ''
            }
        }
    },
    methods: {
        getVcode() {
            if (!this.member.cellphone) {
                Toast('请输入手机号')
                return
            }
            Login.getICode({
                cellphone: this.member.cellphone
            }).then(res => {
                console.log(res)
                Toast('验证码：' + res)
            })
            
        },
        login() {
            if (!this.member.cellphone) {
                Toast('请输入手机号')
                return
            }
            if (!this.member.vcode) {
                Toast('请输入验证码')
                return
            }
            Login.login({
                cellphone: this.member.cellphone,

            }).then(res => {
                console.log(res)
                Toast('验证码：' + res)
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
    .login
		padding 20px 10px
</style>
