<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
        <div class="wrapper">
            <div class="header-title">
                <div class="header-txt">
                    <p>实时掌握行情变化  把握每次赚钱机会</p>
                    <h2>专为M粉丝提供各种行情和资产管理的辅助工具</h2>
                    <p>版本号：v1.0.0</p>
                </div>
            </div>
            <div class="company-logo"></div>
            <p class="paragraph">专注于全球互联网信息渗透与重组以及大数据分析挖掘，以互联网平台运营、互联网/移动互联网软件开发、大数据分析、云计算等为核心的科技公司，打造一个大数据+人工智能（AI）的区块链服务平台，旨在为M粉提供各种互联网+区块链的信息服务，让M粉轻松管理资产，把握实时行情，结合人工智能（AI）技术，让资产增值就在弹指一瞬间。</p>
            <img class="bg-img" src="../../assets/about-2.png" alt="">
            <div class="paragraph-title">技术团队</div>
            <p class="paragraph">来自华为、中兴等世界500强的IT技术精英，多年的互联网开发和运营经验，曾获得专利十多项，组织过千万级的互联网项目多起，发表的技术文章几百篇，是互联网技术红人。</p>
            <div class="paragraph-title">运营团队</div>
            <p class="paragraph">MFC全球GEC领头人，MFC深耕6年，遍布全球的30多万团队粉丝，M商学院鼎力支持。</p>
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
    background-color #ffffff
    .wrapper
        width 100%
        .header-title
            position relative
            height 200px
            background-image url('../../assets/about-1.png')
            background-repeat no-repeat
            background-size 100%
            background-position center
            &:before
                display block
                content ""
                width 100%
                height 100%
                background-color rgba(0,0,0,.4)
                position absolute
                left 0
                top 0
                z-index 1
            .header-txt
                position absolute
                left 0
                top 0
                z-index 2
                width 100%
                height 100%
                color #ffffff
                text-align center
                padding 20px 10px
                p
                    line-height 3
                    font-size 14px
                h2
                    line-height 1.8
        .company-logo
            height 80px
            background-image url('../../assets/company-logo.png')
            background-repeat no-repeat
            background-size 150px
            background-position 10px
        .paragraph-title
            padding 10px
            font-size 16px
            font-weight bold
        .paragraph
            padding 10px
            line-height 1.8
            font-size 14px
        .bg-img
            width 100%
</style>
