<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
            <router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="member.cellphone"></mt-field>
        <mt-field label="短信验证码" placeholder="请输入短信验证码" type="number" :attr="{ maxlength: 6 }" v-model="member.iCode">
            <mt-button size="small" :disabled="isGetVCode" @click="getVcode">{{getVcodeText}}</mt-button>
        </mt-field>
        <mt-field label="新密码" placeholder="请输入新密码" :type="isShow ? '' : 'password'" v-model="member.newpassword">
            <div style="width:30px;color:#999;text-align:right" @click="isShow = !isShow">
                <svg-icon :icon-class="isShow ? 'eye-open' : 'eye'"></svg-icon>
            </div>
        </mt-field>
        <div class="login">
			<mt-button type="primary" style="width:100%" @click="forget">确定</mt-button>
		</div>
    </div>
</template>

<script>
import axios from 'axios'
import { Indicator, Toast } from 'mint-ui'
import { getCookie } from '../../utils/cookies'
import { baseURL } from '../../utils/request'
import Login from '../../api/Login'
export default {
    data() {
        return {
            isShow: false,
            member: {
                cellphone: '',
                iCode: '',
                newpassword: ''
            },
            wait: 180,
			isGetVCode: false,
			getVcodeText: '获取验证码',
        }
    },
    computed: {
        baseURL: () => baseURL
    },
    created() {
        this.member.cellphone = this.$route.query.cellphone || ''
    },
    methods: {
        getVcode() {
            if (this.isGetVCode) return
            if (!this.member.cellphone) {
                Toast('请输入手机号')
                return
            }
            Login.getICode({
                cellphone: this.member.cellphone,
                type: 2
            }).then(res => {
                // Toast('验证码：' + res)
                this.timeGo()
            })
            
        },
        forget() {
            if (!this.member.cellphone) {
                Toast('请输入手机号')
                return
            }
            if (!this.member.iCode) {
                Toast('请输入验证码')
                return
            }
            Login.forget(this.member).then(res => {
                Toast('成功')
                this.$router.push({name: 'home'})
            })
        },
        /**
		 * 	倒计时
		 */
		timeGo() {
			if (this.wait == 0) {
				this.getVcodeText = '重新获取'
				this.isGetVCode = false
				this.wait = 180
				return
			} else {
				this.isGetVCode = true
				this.getVcodeText = this.wait+'s'
				this.wait--
				setTimeout(() => {
					this.timeGo()
				}, 1000)
			}
		},
		back() {
			this.$router.push({name: 'login'})
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
