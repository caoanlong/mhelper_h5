<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
            <router-link to="/login" slot="right">
				<mt-button>登录</mt-button>
			</router-link>
		</mt-header>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="member.cellPhone"></mt-field>
        <mt-field label="验证码" placeholder="请输入验证码" type="number" :attr="{ maxlength: 6 }" v-model="member.iCode">
            <mt-button size="small" @click="getVcode">获取验证码</mt-button>
        </mt-field>
        <div class="login">
			<mt-button type="primary" style="width:100%" @click="register">注册</mt-button>
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
                cellPhone: '',
                iCode: '',
                nickName: '',
                openid: '',
                avator: ''
            }
        }
    },
    methods: {
        getVcode() {
            if (!this.member.cellPhone) {
                Toast('请输入手机号')
                return
            }
            Login.getICode({
                cellphone: this.member.cellPhone
            }).then(res => {
                console.log(res)
                Toast('验证码：' + res)
            })
            
        },
        register() {
            if (!this.member.cellPhone) {
                Toast('请输入手机号')
                return
            }
            if (!this.member.iCode) {
                Toast('请输入验证码')
                return
            }
            Login.registry(this.member).then(res => {
                console.log(res.data)
                Toast(res.data.msg)
                this.$router.push({name: 'login'})
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
