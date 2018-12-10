<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
        <mt-navbar class="navbar" v-model="fanstype">
            <mt-tab-item :id="1">直推用户{{fanstype == 1 && users.length > 3 ? '（' + users.length + '）' : ''}}</mt-tab-item>
            <mt-tab-item :id="2">粉丝用户{{fanstype == 2 && users.length > 3 ? '（' + users.length + '）' : ''}}</mt-tab-item>
        </mt-navbar>
        <div class="user-list">
            <user v-for="(user, i) in users" :key="i" :user="user"></user>
        </div>
    </div>
</template>

<script>
import User from './components/User'
import Customer from '../../api/Customer'
export default {
    components: { User },
    data() {
        return {
            fanstype: 1,
            users: []
        }
    },
    watch: {
        fanstype: {
            handler() {
                this.getSpread()
            },
            immediate: true
        }
    },
    methods: {
        getSpread() {
            Customer.spread({
                fanstype: this.fanstype
            }).then(res => {
                this.users = res
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
    padding-top 89px
    .navbar
        position fixed
        left 0
        top 40px
        z-index 999
        width 100%
</style>
