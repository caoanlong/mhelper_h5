<template>
    <div class="wrapper">
        <div class="item" :style="{'flex': item.flex}" v-for="(item, i) in list" :key="i">{{item.name}}</div>
    </div>
</template>

<script>
export default {
    props: {
        list: Array
    }
}
</script>

<style lang="stylus" scoped>
.wrapper
    display flex
    height 30px
    line-height 30px
    font-size 12px
    color #999
    background-color #ffffff
    border-top 1px solid #ddd
    border-bottom 1px solid #ddd
    .item
        text-align center
</style>
