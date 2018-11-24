<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
        <mt-navbar v-model="selected">
            <mt-tab-item :id="1">全部</mt-tab-item>
            <mt-tab-item :id="2">增加</mt-tab-item>
            <mt-tab-item :id="3">减少</mt-tab-item>
        </mt-navbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selected: 1
        }
    },
    methods: {
        back() {
			this.$router.push({name: 'mine'})
		}
    }
}
</script>

<style lang="stylus" scoped>
.container
    padding-top 40px
</style>
