<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="member.cellPhone"></mt-field>
        <!-- <mt-field label="图形验证码" placeholder="请输入图形验证码" v-model="captcha">
            <img id="captcha" :src="baseURL + '/customer/verify'" height="45px" width="100px" @click="refreshCaptcha">
        </mt-field> -->
        <mt-field label="短信验证码" placeholder="请输入短信验证码" type="number" :attr="{ maxlength: 6 }" v-model="member.icode">
            <mt-button size="small" :disabled="isGetVCode" @click="getVcode">{{getVcodeText}}</mt-button>
        </mt-field>
        <mt-field label="邀请码" type="number" v-model="recommender" :disabled="isRecommender"></mt-field>
        <div class="login">
			<mt-button type="danger" style="width:100%" @click="register">注册</mt-button>
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
            member: {
                cellPhone: '',
                icode: '',
                nickName: '',
                openid: '',
                unionid: '',
                avator: ''
            },
            captcha: '',
            wait: 180,
			isGetVCode: false,
			getVcodeText: '获取验证码',
            recommender: '',
            isRecommender: false
        }
    },
    computed: {
        baseURL: () => baseURL
    },
    created() {
        const recommender = localStorage.getItem('recommender')
        if (recommender) {
            this.isRecommender = true
            this.recommender = recommender
        }
        this.member.cellPhone = this.$route.query.cellphone || ''
    },
    methods: {
        refreshCaptcha() {
			const captchaEle = document.getElementById('captcha')
			captchaEle.src = this.baseURL + '/customer/verify?rnd=' + new Date().getTime()
		},
        getVcode() {
            if (this.isGetVCode) return
            if (!this.member.cellPhone) {
                Toast('请输入手机号')
                return
            }
            Login.getICode({
                cellphone: this.member.cellPhone,
                type: 1
            }).then(res => {
                // Toast('验证码：' + res)
                this.timeGo()
            })
            
        },
        register() {
            if (!this.member.cellPhone) {
                Toast('请输入手机号')
                return
            }
            if (!this.member.icode) {
                Toast('请输入验证码')
                return
            }
            const wxUserInfo = localStorage.getItem('wxUserInfo')
            if (wxUserInfo) {
                const wxUser = JSON.parse(wxUserInfo)
                this.member.nickName = wxUser.nickname
                this.member.avator = wxUser.headimgurl
                this.member.openid = wxUser.openid
                this.member.unionid = wxUser.unionid
            }
            if (this.recommender) this.member.recommender = this.recommender
            Login.registry(this.member).then(res => {
                Toast(res.data.msg)
                localStorage.setItem('token', res.headers['authorization'])
                this.$store.dispatch('getUserInfo').then(() => {
                    this.$router.push({name: 'home'})
                })
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
