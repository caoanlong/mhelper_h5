<template>
    <div class="wrapper">
        <div class="item first">
            <img class="coin-icon" v-lazy="marketCoin.image" alt="">
        </div>
        <div class="item one">
            <div class="up">
                <div class="market">{{marketCoin.name.split('/')[0]}}</div>
            </div>
            <div class="down">
                <div class="num-title">量</div>
                <div class="num-value">
                    {{
                        marketCoin.volume > 1000 
                        ? (marketCoin.volume/1000).toFixed(2) + '万' 
                        : marketCoin.volume.toFixed(2)
                    }}
                </div>
            </div>
        </div>
        <div class="item two" :class="marketCoin.change > 0 ? 'green' : 'red'">
            <div class="up">{{marketCoin.price}}</div>
            <div class="down">￥{{(marketCoin.price).mul(7)}}</div>
        </div>
        <div class="item three">
            <div class="change-tag" :class="marketCoin.change > 0 ? 'rise' : 'fall'">
                {{marketCoin.platform == 'eunex' ? (marketCoin.change * 100).toFixed(2) : marketCoin.change}}%
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        marketCoin: Object
    }
}
</script>

<style lang="stylus" scoped>
.wrapper
    display flex
    position relative
    height 60px
    padding 5px
    background-color #ffffff
    &:after
        position absolute
        bottom 0
        left 0
        content " "
        display block
        height 1px
        width 100%
        border-bottom 1px solid #e2e2e2
        -webkit-transform-origin 0 100%
        transform-origin 0 100%
        -webkit-transform scaleY(0.5)
        transform scaleY(0.5)
    .first
        flex 0 0 50px
        display flex
        align-items center
        justify-content center
        .coin-icon
            display block
            width 30px
            height 30px
    .one
        flex 1
        .up
            height 30px
            line-height 30px
            .market
                float left
                font-size 14px
                font-weight 500
                color #333333
                text-align center
        .down
            font-size 12px
            color #999999
            .num-title
                float left
                text-align left
            .num-value
                float left
                text-align right
                margin-left 5px
    .two
        flex 0 0 100px
        padding 0 30px 0 0
        &.red
            color #d9534f
        &.green
            color #5cb85c
        .up
            height 30px
            line-height 30px
            font-size 16px
            font-weight 600
            // color #333333
        .down
            font-size 12px
            // color #999999
    .three
        flex 0 0 70px
        display flex
        align-items center
        .change-tag
            width 100%
            height 24px
            line-height 24px
            text-align center
            font-size 13px
            color #ffffff
            border-radius 3px
            &.rise
                background-color #5cb85c
            &.fall
                background-color #d9534f
</style>
