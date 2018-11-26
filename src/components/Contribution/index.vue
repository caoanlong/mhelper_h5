<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
        <div class="contribution-total">贡献值：{{userInfo.last_num}}</div>
        <mt-navbar class="navbar" v-model="addorreduce">
            <mt-tab-item :id="0">全部</mt-tab-item>
            <mt-tab-item :id="1">增加</mt-tab-item>
            <mt-tab-item :id="2">减少</mt-tab-item>
        </mt-navbar>
        <div class="contribution-list">
            <div class="contribution" v-for="(item, i) in list" :key="i">
                <div class="left">
                    <div class="type">{{CONTRIBUTIONTYPE[item.contribute_type]}}</div>
                    <div class="time">{{item.recordtime}}</div>
                </div>
                <div class="right" style="color:green" v-if="item.add_or_reduce == 1">
                    +{{item.contribute_num}}
                </div>
                <div class="right" style="color:red" v-else>
                    -{{item.contribute_num}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Customer from '../../api/Customer'
import { CONTRIBUTIONTYPE } from '../../utils/consts'
export default {
    data() {
        return {
            addorreduce: 0,
            list: []
        }
    },
    computed: {
        ...mapGetters(['userInfo']),
        CONTRIBUTIONTYPE: () => CONTRIBUTIONTYPE
	},
    watch: {
        addorreduce: {
            handler() {
                this.getCustcontributions()
            },
            immediate: true
        }
    },
    methods: {
        getCustcontributions() {
            Customer.custcontributions({
                addorreduce: this.addorreduce
            }).then(res => {
                this.list = res
            })
        },
        back() {
			this.$router.push({name: 'mine'})
		}
    }
}
</script>

<style lang="stylus" scoped>
.container
    padding-top 180px
    .contribution-total
        position fixed
        left 0
        top 40px
        z-index 999
        width 100%
        height 90px
        line-height 90px
        background-color #26a2ff
        color #ffffff
        font-size 28px
        text-align center
    .navbar
        position fixed
        left 0
        top 130px
        z-index 999
        width 100%
    .contribution
        width 100%
        height 60px
        background-color #ffffff
        display flex
        .left
            flex 1
            .type
                padding-left 10px
                color #333
                font-size 14px
                height 34px
                line-height 34px
            .time
                padding-left 10px
                color #999
                font-size 13px
        .right
            flex 0 0 80px
            text-align right
            padding-right 10px
            line-height 60px
</style>
