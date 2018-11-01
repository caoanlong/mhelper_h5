<template>
    <div class="wrapper">
        <div class="item one">
            <div class="up">
                <div class="market">{{marketCoin.name}}</div>
                <div class="coin">{{marketCoin.priceUnit}}</div>
            </div>
            <div class="down">
                <div class="num-title">量</div>
                <div class="num-value">{{marketCoin.volume}}</div>
            </div>
        </div>
        <div class="item two">
            <div class="up">{{marketCoin.price}}</div>
            <div class="down">￥1379.52</div>
        </div>
        <div class="item three">
            <div class="change-tag" :class="marketCoin.change > 0 ? 'rise' : 'fall'">{{marketCoin.change}}%</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        marketCoin: Object
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="stylus" scoped>
.wrapper
    display flex
    height 60px
    padding 5px
    border-bottom 1px solid #ddd
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
            .coin
                float left
                font-size 12px
                color #999999
                text-align center
                margin-left 5px
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
        flex 0 0 90px
        text-align right
        padding 0 10px
        .up
            height 30px
            line-height 30px
            font-size 16px
            font-weight 600
            color #333333
        .down
            font-size 12px
            color #999999
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
                background-color #d9534f
            &.fall
                background-color #5cb85c
</style>
