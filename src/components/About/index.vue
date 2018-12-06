<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
        <div class="wrapper">
            <img class="bg-img" src="../../assets/about-1.png" alt="">
            <img class="bg-img" src="../../assets/about-2.png" alt="">
            <div class="version">版本号：v1.0.0</div>
        </div>
    </div>
</template>

<script>
export default {
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
    .wrapper
        width 100%
        .bg-img
            width 100%
        .version
            margin-top 20px
            text-align center
            color #999
</style>
