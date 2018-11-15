<template>
    <div>
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
    },
    created() {
        // if (/MicroMessenger/i.test(navigator.userAgent)) {
        // 	//ios的ua中无miniProgram，很坑爹,但都有MicroMessenger（表示是微信浏览器）
        //     wx.miniProgram.getEnv((res)=>{
        //         if (res.miniprogram) {
        //             this.isMiniprogram = true
        //         } else {
        //             this.isMiniprogram = false
        //         }
        //     })
        // }
    },
}
</script>

<style lang="stylus" scoped>

</style>
