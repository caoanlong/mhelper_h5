<template>
	<div class="news-container">
		<mt-header fixed :title="$route.meta.title"></mt-header>
		<div class="article_list">
			<a class="list_item" :href="item.href" target="_blank" v-for="(item, i) in news" :key="i">
				<img class="cover" :src="item.img" alt="">
				<div class="cont">
					<h2 class="title">{{item.title}}</h2>
				</div>
			</a>
		</div>
	</div>
</template>

<script>
export default {
	name: "Raiders",
	data() {
		return {
			news: [
				{
					title: '各种货币的介绍都在这里',
					href: 'http://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&amp;mid=100000611&amp;idx=1&amp;sn=110e8b6f56d5b2b4e403c4541458d1cc&amp;scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSp0LAaqiaBUiaicmRc1pbADiaPoddhPWN13fkbdq0VNM3ShBqTtopYJs17iabwHuGOw85H8mfszvynqT7Q/0'
				},
				{
					title: '目前公司官方各交易所網址',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=100000168&idx=1&sn=c36b27cc85b3a1b68f4df69b2c9012a4&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSoyLXkS4r0pdPX9HNYc7nLFqnicCria0CFwppUHHQH2kIKUza2VAMZQP95ZQ9r75YuL8Jk21J6PvUxw/0'
				},{
					title: '华克金白皮书',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=100000091&idx=1&sn=f290e2155869a09b4c84d2f55b12201f&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSqLsHdv86uIdhNEcmUuzEsjccDuXwOMpDeoxvgneVJiaNYpZv0o8wia2rYmLDkpJaEEnAuZh8CIicpFg/0'
				},{
					title: '摩态链MTR项目计划书',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=100000050&idx=1&sn=4a89e9d1620eb9fedb64e396af6b4446&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSqLsHdv86uIdhNEcmUuzEsjcXic24gS07SEtdWQ58z1ZJvicpGmJvzXib1H18JMpCDpsJdNEAa8iasVEQ/0'
				},{
					title: 'EUNEX欧联交易所白皮书',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=100000043&idx=1&sn=25344d833af87432bd43757f6ec9c0a7&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSqLsHdv86uIdhNEcmUuzEsj8aYgMaNsz5g1ibJxcHQgzyniaNKS4oxg8zc8m9bicl1mCmybYBK4XP7hg/0'
				},{
					title: '比特币白皮书',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=100000153&idx=1&sn=b1803ab80acb843bac590e9717939748&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSpRu50DbgGVd6vogEkkAkOTib497GSk1RO6VoIQmMbxqU3UhGF6ZRDzIhGgWXTxWKSjxeQaQNshic4w/0'
				},{
					title: '摩态链白皮书',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=100000329&idx=1&sn=2ff88fd52313a9d607e0fba3208432a4&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSpJAbFgJW54nnPiaLzgmjF3lMy7q1tdoOBJ0ibm4EFwib3xeI8icG0tgXApGEd9zjZFCdUUwU8Wghia0Dg/0'
				},{
					title: 'CTM加密资产交换机',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=100000380&idx=1&sn=c08b41f1db7a95fe0529dd4b5a72c865&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSpJAbFgJW54nnPiaLzgmjF3lUoIGJkdHPWe42kH1Qa2xica3nibViaWFXXtlgib8ic80O4mJMia0WO3wL3cA/0'
				},{
					title: 'WOS大数据',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=100000407&idx=1&sn=c11311b3eea346183a2c2c161f8efcff&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSpJAbFgJW54nnPiaLzgmjF3l2YZEAOibCXiahvdNvMx1fZhabFwOicA2K4AicoeGiawjibvAsDAyyEVb8mqQ/0'
				},{
					title: '教育通证推广书',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=100000428&idx=1&sn=626cb28d9657790b233e6cdd5df2ddc2&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSpJAbFgJW54nnPiaLzgmjF3lBSUe6wAHsmDTQPAgQcRBHID1KekOsKsMnmtqg8aVib7JpibO4suMhdsQ/0'
				},{
					title: 'USDTK（华美资产）',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=100000454&idx=1&sn=3fdc92c39065bc9289cb1d69feab6f4a&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSpJAbFgJW54nnPiaLzgmjF3lGsKMIDSicMfttH21GibSSChWKg4C0sOn0xr1SAk0ibjCEGPV0GicJ3qUXQ/0'
				},{
					title: 'MXW阳光链是什么怎么认购',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=100000197&idx=1&sn=bf6f21ebbc9b6f6040d312c33b6edb56&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSpfDiaE3aDZ9CKa7TA6AniaNcIUcPlqfSKfE73fIibgfqXia0K6z1TrLUVd3WRibpibJQylLPecjAqUgDlg/0'
				},{
					title: '新西兰通证NRT',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=100000491&idx=1&sn=7a6b75664c4a1cc2865dbbf0a2034c97&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSr4FuHcp1zVuzYZkeBQZT1AEUDCf2DcJm1ATRckdc1Qm8mA0kHU6iaITWlpj61V08Y4VVqJgfHlYDw/0'
				},{
					title: '米乐贴',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=100000547&idx=1&sn=d2b06240515f20ae4e782f3d2f050a50&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSr4FuHcp1zVuzYZkeBQZT1AnOoKuKZiaoJyUz2QDJz172goemfpNg6KFqvOFVz3pibvZmj31bITDTdQ/0'
				},{
					title: 'MBAex上线ALLN~ALLN是什么（航空生态链）',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=2247484221&idx=1&sn=4e857dc343a06a680c282f2f16729e89&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSoWciaeoU57Ap1N2DBeEyNCia4rTQib8CXIWOrO4J9smHAS4eSuGYAVHc4tXeIdeLHRZJKCNGS7fAh0Q/0'
				},{
					title: 'GVM',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=100000585&idx=1&sn=e32a1d533de75cca8761de9e32bfe8ad&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSp0LAaqiaBUiaicmRc1pbADiaPoMN4v9s7FXash37verthM7IYicyK2tRwu7AAqExTfBLatf4MOCHV2yAA/0'
				},{
					title: '达世币(DASH)',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=100000590&idx=1&sn=66af1a91fc357af4fc183dddc5e17bc7&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSp0LAaqiaBUiaicmRc1pbADiaPofInxicMoyIKFgGzTzIiblu5bKrLlq6ictvOJAr4ktk9n5icwicg4nJcXAcw/0'
				},{
					title: 'XRP瑞波币',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=100000607&idx=1&sn=e81576480ea2ba81a2b7742823637ff3&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSp0LAaqiaBUiaicmRc1pbADiaPomOd0Y2encP7DibOVrOuG5Y54UibwrW2TUicFpJK1CbaeFBiaxMbiaJ2TPcQ/0'
				},{
					title: '玉郎币白皮书',
					href: 'https://mp.weixin.qq.com/s?__biz=MzU3NjY5MjE0OQ==&mid=2247484298&idx=1&sn=e2f2b2de94030803a133b25cbde105be&scene=19#wechat_redirect',
					img: 'http://mmbiz.qpic.cn/mmbiz_jpg/nAXL5v4mpSoQ3icM7L6pnaYsDtibshJLG0MicOa1rvb81Xz6O2ibxzVUDdk6n5En6xiaQGiaAmA5dHkUYldmWkgbwHmg/0'
				}
			]
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
			position relative
			display block
			padding 12px 125px 11px 20px
			background-color #ffffff
			text-decoration none
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
