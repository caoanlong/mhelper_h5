<template>
    <div class="user">
        <div class="avatar">
            <img class="avatar-img" :src="user.avator ? user.avator : require('../../../assets/defaultAvatar.png')" alt="">
        </div>
        <div class="user-info">
            <div class="user-name">{{user.nickname}}</div>
            <div class="user-mobile">{{user.cellphone}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: Object
    }
}
</script>

<style lang="stylus" scoped>
.user
    position relative
    width 100%
    height 70px
    background-color #ffffff
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
