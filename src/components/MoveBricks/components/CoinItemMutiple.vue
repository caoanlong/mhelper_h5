<template>
    <div class="wrapper">
        <div class="item first">
            <div class="coin-icon">
                <img v-lazy="marketCoin.mbaex.image" alt="">
            </div>
            <div class="coin-name">
                {{marketCoin.mbaex.name}}
            </div>
        </div>
        <div class="item one" style="padding-top:0">
            <div class="up" v-if="marketCoin.mbaex">
                <div class="coin-icon-mini"></div>
                <div class="coin-volumn">{{marketCoin.mbaex.volume}}</div>
                <div class="coin-price">{{marketCoin.mbaex.price}}</div>
                <div class="coin-price-rmb">￥{{marketCoin.mbaex.RMBprice}}</div>
                <div class="coin-change">
                    <div class="change-tag" :class="marketCoin.mbaex.change > 0 ? 'rise' : 'fall'">
                        {{marketCoin.mbaex.change}}%
                    </div>
                </div>
            </div>
            <div class="down" v-if="marketCoin.eunex">
                <div class="coin-icon-mini"></div>
                <div class="coin-volumn">{{marketCoin.eunex.volume}}</div>
                <div class="coin-price">{{marketCoin.eunex.price}}</div>
                <div class="coin-price-rmb">￥{{marketCoin.eunex.RMBprice}}</div>
                <div class="coin-change">
                    <div class="change-tag" :class="marketCoin.eunex.change > 0 ? 'rise' : 'fall'">
                        {{marketCoin.eunex.change}}%
                    </div>
                </div>
            </div>
        </div>
        <div class="item three">
            <div class="diff-price-title">差价</div>
            <div class="diff-price-txt">{{marketCoin.spread}}</div>
            <div class="diff-price-per" :class="{'big-range': marketCoin.spreadPercent > 10}">
                {{marketCoin.spreadPercent.toFixed(2)}}%
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
    height 60px
    background-color #ffffff
    border-bottom 1px solid #ddd
    .first
        flex 0 0 50px
        .coin-icon
            width 100%
            height 36px
            padding-top 4px
            img
                margin 0 auto
                display block
                width 30px
                height 30px
        .coin-name
            width 100%
            height 24px
            text-align center
            font-size 14px
            font-weight 500
    .one
        flex 1
        .up, .down
            height 30px
            line-height 30px
            display flex
            .coin-volumn
                flex 1
                font-size 12px
                color #999
            .coin-price
                flex 0 0 55px
                font-size 14px
                font-weight 500
                text-align left
            .coin-price-rmb
                flex 0 0 65px
                font-size 12px
                color #999
            .coin-change
                flex 0 0 60px
                padding-top 4px
                .change-tag
                    width 100%
                    height 20px
                    line-height 20px
                    text-align center
                    font-size 12px
                    color #ffffff
                    border-radius 3px
                    &.rise
                        background-color #5cb85c
                    &.fall
                        background-color #d9534f
        .up
            .coin-icon-mini
                flex 0 0 30px
                height 30px
                background-image url('../../../assets/logo-mbaex-mini.png')
                background-size 60%
                background-repeat no-repeat
                background-position center
        .down
            .coin-icon-mini
                flex 0 0 30px
                height 30px
                background-image url('../../../assets/logo-eunex-mini.png')
                background-size 50%
                background-repeat no-repeat
                background-position center
    .three
        flex 0 0 50px
        padding-right 5px
        text-align right
        font-size 13px
        color #666
        .diff-price-title
            font-size 12px
            color #999
        .diff-price-txt
            font-size 12px
        .diff-price-per
            font-weight 500
        .big-range
            color #d316b2
            font-weight bold
</style>
