<template>
    <div>
        <router-view></router-view>
        <mt-tabbar fixed v-model="selected" v-if="$route.meta.hasTab">
			<mt-tab-item id="home">
				<img slot="icon" src="../assets/logo.png">首页
			</mt-tab-item>
			<mt-tab-item id="raiders">
				<img slot="icon" src="../assets/logo.png">攻略
			</mt-tab-item>
			<mt-tab-item id="mine">
				<img slot="icon" src="../assets/logo.png">我的
			</mt-tab-item>
		</mt-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
