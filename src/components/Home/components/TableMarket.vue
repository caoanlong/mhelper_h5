<template>
    <div class="wrapper">
        <img class="logo" :src="rowData.image"/>
        <div class="name">{{rowData.name}}</div>
    </div>
</template>

<script>
export default {
    name: 'table-market',
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
    .logo
        display block
        width 40px
        margin 15px auto 0 auto
    .name
        line-height 1.5
        font-size 13px
        font-weight 600
        text-align center
        color #333333
</style>
