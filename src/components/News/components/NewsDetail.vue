<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
        <h3 class="title">{{news.title}}</h3>
        <div class="wrapper" v-html="news.content"></div>
        <div class="qrcode">
			<img class="qrcode-img" src="../../../assets/qrcode.jpg" alt="">
			<p class="qrcode-txt">扫码关注公众号，行情变化及时通知您</p>
		</div>
    </div>
</template>

<script>
import News from '../../../api/News'
export default {
    data() {
        return {
            news: {}
        }
    },
    created() {
        this.getInfo()
    },
    methods: {
        getInfo() {
            const newId = this.$route.query.newsId
            News.findById({ newId }).then(res => {
                this.news = res
            })
        },
        back() {
			this.$router.push({name: 'news'})
		}
    }
}
</script>

<style lang="stylus" scoped>
img
    width 100%
.container
    padding-top 40px
    background-color #fff
    .title
        text-align center
        line-height 2
    .wrapper
        padding 10px
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
</style>
