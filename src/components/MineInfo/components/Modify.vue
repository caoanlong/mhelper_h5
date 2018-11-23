<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
            <div slot="left" @click="back">
				<mt-button icon="back">返回</mt-button>
			</div>
        </mt-header>
        <mt-field :label="$route.query.name" placeholder="请输入..." v-model="form"></mt-field>
        <div class="modify">
			<mt-button type="primary" style="width:100%" @click="updateCustomer">提交</mt-button>
		</div>
    </div>
</template>

<script>
import Customer from '../../../api/Customer'
export default {
    data() {
        return {
            form: ''
        }
    },
    created() {
        this.form = this.$route.query.value
    },
    methods: {
        updateCustomer() {
            Customer.update({
                customerModel: {
                    [this.$route.query.type]: this.form
                }
            }).then(res => {
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
