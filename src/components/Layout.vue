<template>
    <div style="width:100%;height:100%">
        <router-view></router-view>
        <mt-tabbar fixed v-model="selected" v-if="$route.meta.hasTab">
			<mt-tab-item id="home">
                <svg-icon slot="icon" style="font-size:22px" icon-class="home"></svg-icon>首页
			</mt-tab-item>
			<mt-tab-item id="news">
				<svg-icon slot="icon" style="font-size:22px" icon-class="raiders"></svg-icon>资讯
			</mt-tab-item>
			<mt-tab-item id="mine">
				<svg-icon slot="icon" style="font-size:22px" icon-class="mine"></svg-icon>我的
			</mt-tab-item>
		</mt-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMiniprogram: false,
            selected: this.$route.name
        }
    },
    watch: {
        selected(name) {
            this.$router.push({ name })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
