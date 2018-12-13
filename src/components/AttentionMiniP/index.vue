<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
        <div class="wrapper">
            <div class="qrcode">
                <img class="qrcode-img" src="../../assets/qrcode-mini.jpg" alt="">
                <p class="qrcode-txt">扫码获取小程序，使用更加方便</p>
            </div>
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
        padding 10px
        .title
            line-height 1.8
            text-align center
            font-weight bold
        .qrcode
            width 100%
            padding 20px 0 50px 0
            .qrcode-img
                display block
                width 200px
                height 200px
                margin 0 auto
            .qrcode-txt
                text-align center
                font-size 14px
</style>
