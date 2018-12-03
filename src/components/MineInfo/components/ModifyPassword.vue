<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
            <div slot="left" @click="back">
				<mt-button icon="back">返回</mt-button>
			</div>
        </mt-header>
        <mt-field label="当前手机号" placeholder="请输入..." :value="member.cellphone" disabled></mt-field>
        <mt-field label="旧密码" placeholder="请输入..." v-model="member.oldpassword"></mt-field>
        <mt-field label="新密码" placeholder="请输入..." v-model="member.newpassword"></mt-field>
        <div class="modify">
			<mt-button type="primary" style="width:100%" @click="update">提交</mt-button>
		</div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Customer from '../../../api/Customer'
export default {
    data() {
        return {
            member: {
                cellphone: '',
                oldpassword: '',
                newpassword: ''
            }
        }
    },
    created() {
        this.member.cellphone = this.$route.query.value
    },
    methods: {
        update() {
            if (!this.member.oldpassword) {
                Toast('请输入旧密码')
                return
            }
            if (!this.member.newpassword) {
                Toast('请输入新密码')
                return
            }
            Customer.modifyPassword(this.member).then(res => {
                Toast('成功！')
                this.$router.push({name: 'mineinfo'})
            })
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
