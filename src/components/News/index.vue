<template>
	<div class="news-container">
		<mt-header fixed :title="$route.meta.title"></mt-header>
		<div class="article_list">
			<a 
				:href="item.href" 
				class="list_item" 
				v-for="(item, i) in news" 
				:key="i">
				<img class="cover" :src="item.thumbnail" alt="">
				<div class="cont">
					<h2 class="title">{{item.title}}</h2>
				</div>
			</a>
		</div>
	</div>
</template>

<script>
import News from '../../api/News'
export default {
	name: "News",
	data() {
		return {
			news: []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		getList() {
			News.findAll().then(res => {
				this.news = res
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.news-container
	width 100%
	padding-top 40px
	padding-bottom 55px
	.article_list
		width 100%
		.list_item
			display block
			text-decoration none
			position relative
			padding 12px 125px 11px 20px
			background-color #ffffff
			&:after
				position absolute
				bottom 0
				left 0
				content " "
				display block
				height 1px
				width 100%
				border-bottom 1px solid #e2e2e2
				-webkit-transform-origin 0 100%
				transform-origin 0 100%
				-webkit-transform scaleY(0.5)
				transform scaleY(0.5)
			.cover
				position absolute
				top 12px
				right 20px
				width 93px
				height 74px
		.cont
			position relative
			min-height 74px
			.title
				color #000
				line-height 24px
				font-size 17px
				font-weight 400
				overflow hidden
				text-overflow ellipsis
</style>
