<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
            <div slot="left" @click="back">
				<mt-button icon="back">返回</mt-button>
			</div>
        </mt-header>
        <mt-field :label="$route.query.name" placeholder="请输入..." v-model="form"></mt-field>
        <div class="modify">
			<mt-button type="primary" style="width:100%">提交</mt-button>
		</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: ''
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
    .modify
		padding 20px 10px
</style>
