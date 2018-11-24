<template>
    <div class="user">
        <div class="avatar">
            <img class="avatar-img" :src="require('../../../assets/defaultAvatar.png')" alt="">
        </div>
        <div class="user-info">
            <div class="user-name">小王</div>
            <div class="user-mobile">13049497395</div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="stylus" scoped>
.user
    position relative
    width 100%
    height 70px
    background-color #ffffff
    margin-bottom 10px
    background-image linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%)
    background-size 100% 1px
    background-repeat no-repeat
    background-position bottom
    display flex
    .avatar
        flex 0 0 70px
        .avatar-img
            display block
            width 50px
            border-radius 30px
            margin-top 10px
            margin-left 10px
    .user-info
        flex 1
        padding-left 10px
        padding-top 10px
        .user-name
            line-height 2
            font-size 14px
            color #333
            font-weight 400
        .user-mobile
            color #999
            font-size 13px
</style>
