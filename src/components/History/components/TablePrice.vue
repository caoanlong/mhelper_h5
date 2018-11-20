<template>
    <div class="wrapper" v-if="rowData[field]">
        <div class="change"
            :style="{'background': rowData[field].change > 0 ? '#5cb85c' : '#d9534f'}">
            {{rowData[field].platform == 'eunex' ? (rowData[field].change * 100).toFixed(2) : rowData[field].change}}%
        </div>
        <div class="price">{{rowData[field].price}}</div>
        <div class="priceRMB">￥{{rowData[field].priceRMB}}</div>
        <div class="volume">{{rowData[field].volume}}</div>
    </div>
</template>

<script>
export default {
    name: 'table-price',
    props: {
		rowData: {
			type: Object
		},
		field: {
			type: String
		},
		index: {
			type: Number
		}
	}
}
</script>

<style lang="stylus" scoped>
.wrapper
    width 80px
    .change
        width 70px
        height 20px
        margin-top 5px
        line-height 20px
        text-align center
        font-size 12px
        color #ffffff
        border-radius 3px
    .price
        text-align left
        line-height 1.5
        font-size 16px
        font-weight 600
        color #333
    .priceRMB
        text-align left
        line-height 1.5
        font-size 12px
        color #666
    .volume
        text-align left
        line-height 1.5
        font-size 12px
        color #999
</style>
