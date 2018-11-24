<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
        <div class="member-info">
            <div class="avatar">
                <img class="avatar-img" :src="userInfo && userInfo.avator ? userInfo.avator : require('../../assets/defaultAvatar.png')" alt="">
            </div>
            <div class="title">普通会员</div>
            <div class="upgrade">
                <mt-button class="upgrade-btn" type="danger" size="small">升级为黄金会员</mt-button>
            </div>
        </div>
        <p class="level-info">会员特权介绍</p>
        <mt-navbar v-model="selected">
            <mt-tab-item :id="1">普通会员</mt-tab-item>
            <mt-tab-item :id="2">黄金会员</mt-tab-item>
            <mt-tab-item :id="3">白金会员</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item :id="1">
                <h2 style="text-align:center;margin-top:50px">普通会员权限介绍</h2>
            </mt-tab-container-item>
            <mt-tab-container-item :id="2">
                <h2 style="text-align:center;margin-top:50px">黄金会员权限介绍</h2>
            </mt-tab-container-item>
            <mt-tab-container-item :id="3">
                <h2 style="text-align:center;margin-top:50px">白金会员权限介绍</h2>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            selected: 1
        }
    },
    computed: {
		...mapGetters(['userInfo'])
	},
    created() {
        console.log(this.userInfo)
    },
    methods: {
        upgrade() {
            Toast('敬请期待!')
        },
        back() {
			this.$router.push({name: 'mine'})
		}
    }
}
</script>

<style lang="stylus" scoped>
.container
    padding-top 40px
    .member-info
        position relative
        width 100%
        height 80px
        background-color #ffffff
        margin-bottom 10px
        background-image linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%)
        background-size 100% 1px
        background-repeat no-repeat
        background-position bottom
        display flex
		.avatar
            flex 0 0 80px
            .avatar-img
                display block
                width 60px
                border-radius 30px
                margin-top 10px
                margin-left 10px
        .title
            flex 1
            line-height 80px
            padding-left 10px
        .upgrade
            flex 0 0 140px
            .upgrade-btn
                margin-top 20px
    .level-info
        color #999
        font-size 14px
        line-height 1.8
        padding-left 10px
</style>
