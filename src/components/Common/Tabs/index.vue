<template>
    <div class="tabs">
        <div 
            class="item" 
            :class="{'selected': selected == item}" 
            v-for="(item, i) in tabs" 
            :key="i" 
            @click="select(item)">
            {{item}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tabs: Array,
        selected: Number | String
    },
    methods: {
        select(item) {
            this.$emit('change', item)
        }
    }
}
</script>

<style lang="stylus" scoped>
.tabs
    width 100%
    height 36px
    line-height 36px
    background-color #ffffff
    font-size 13px
    color #666
    display flex
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
    .item
        flex 1
        text-align center
        position relative
        &.selected
            color #26a2ff
            font-weight 400
            &:after
                position absolute
                bottom 0
                left 0
                content ''
                display block
                width 100%
                height 2px
                background-color #26a2ff
</style>
