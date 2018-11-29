<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
            <div slot="left" @click="back">
				<mt-button icon="back">返回</mt-button>
			</div>
        </mt-header>
        <mt-field label="当前手机号" placeholder="请输入..." :value="curmobile" disabled></mt-field>
        <mt-field label="验证码" placeholder="请输入验证码" type="number" :attr="{ maxlength: 6 }" v-model="icode">
            <mt-button size="small" :disabled="isGetVCode" @click="getVcode">{{getVcodeText}}</mt-button>
        </mt-field>
        <mt-field label="新手机号" placeholder="请输入..." v-model="cellphone"></mt-field>
        <div class="modify">
			<mt-button type="primary" style="width:100%" @click="updateMobile">提交</mt-button>
		</div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Login from '../../../api/Login'
import Customer from '../../../api/Customer'
export default {
    data() {
        return {
            curmobile: '',
            cellphone: '',
            icode: '',
            captcha: '',
            wait: 60,
			isGetVCode: false,
			getVcodeText: '获取验证码'
        }
    },
    created() {
        this.curmobile = this.$route.query.value
    },
    methods: {
        getVcode() {
            if (this.isGetVCode) return
            if (!this.curmobile) {
                Toast('请输入当前手机号')
                return
            }
            this.timeGo()
            Login.getICode({
                cellphone: this.curmobile
            }).then(res => {
                // Toast('验证码：' + res)
            })
            
        },
        updateMobile() {
            if (!this.cellphone) {
                Toast('请输入新手机号')
                return
            }
            if (!this.icode) {
                Toast('请输入验证码')
                return
            }
            Customer.update({
                registryDto: {
                    cellPhone: this.curmobile,
                    icode: this.icode
                },
                customerModel: {
                    cellphone: this.cellphone
                }
            }).then(res => {
                Toast(res.data.msg)
                this.$router.push({name: 'mineinfo'})
            })
        },
        /**
		 * 	倒计时
		 */
		timeGo() {
			if (this.wait == 0) {
				this.getVcodeText = '重新获取'
				this.isGetVCode = false
				this.wait = 30
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
			this.$router.push({name: 'mineinfo'})
		}
    }
}
</script>

<style lang="stylus" scoped>
.container
	padding-top 40px
    .modify
		padding 20px 10px
</style>
