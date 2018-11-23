<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
    </div>
</template>

<script>
export default {
    data() {
        return {

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

</style>
