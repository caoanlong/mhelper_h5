<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
        <div class="wrapper">
            MHelper客户服务联系方式：<br/>
            <div class="contact-method">
                <div class="contact-title">QQ：</div>
                <div class="contact-info">
                    <a href="tencent://message/?Menu=yes&uin=3338939303&Site=80fans&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a545b1714f9d45">
                        QQ号：<span id="qq">3338939303</span>
                    </a>&nbsp;&nbsp;&nbsp;<button id="qqBtn" data-clipboard-target="#qq">复制</button>
                </div>
            </div>
            <div class="contact-method">
                <div class="contact-title">微信：</div>
                <div class="contact-info" style="display:flex">
                    <div style="flex:1">
                        <span @click="popupVisible = true">
                            微信号：<span id="wx">j88840880</span>
                        </span>&nbsp;&nbsp;<button id="wxBtn" data-clipboard-target="#wx">复制</button>
                        <p style="color:#999;font-size:12px">温馨提醒：微信用户太多，为了获得更好的帮助，建议加QQ</p>
                    </div>
                    <div class="qrcode">
                        <img class="qrcode-img" src="../../assets/qrcode-wx.jpg" alt="">
                    </div>
                </div>
            </div>
            <div class="contact-method">
                <div class="contact-title">电话：</div>
                <div class="contact-info">
                    <a href="tel:0755-88840880">+86(755)88840880</a>
                </div>
            </div>
            <div class="contact-method">
                <div class="contact-title">邮箱：</div>
                <div class="contact-info">
                    <a href="mailto:MHelper@bv-health.com">MHelper@bv-health.com</a>
                </div>
            </div>
            <div class="contact-method">
                <div class="contact-title">公众号：</div>
                <div class="contact-info" style="display:flex">
                    <div style="flex:1">
                        <span>关注公众号，随时掌握行情变化</span>
                        <p style="color:#999;font-size:12px">长按图片识别二维码，关注公众号</p>
                    </div>
                    <div class="qrcode">
                        <img class="qrcode-img" src="../../assets/qrcode.jpg" alt="">
                    </div>
                </div>
            </div>
        </div>
        <mt-popup v-model="popupVisible">
            <div class="qrcode">
                <img class="qrcode-img" src="../../assets/qrcode.jpg" alt="">
                <p class="qrcode-txt">扫码加好友</p>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import { Popup, Toast } from 'mint-ui'
import ClipboardJS from 'clipboard'
export default {
    components: { Popup },
    data() {
        return {
            popupVisible: false
        }
    },
    mounted() {
        const qqClipboard = new ClipboardJS('#qqBtn')
        const wxClipboard = new ClipboardJS('#wxBtn')
        qqClipboard.on('success', function(e) {
            console.info('Action:', e.action)
            console.info('Text:', e.text)
            console.info('Trigger:', e.trigger)
            Toast('已复制到剪贴板！')
            e.clearSelection()
        })
        wxClipboard.on('success', function(e) {
            console.info('Action:', e.action)
            console.info('Text:', e.text)
            console.info('Trigger:', e.trigger)
            Toast('已复制到剪贴板！')
            e.clearSelection()
        })
    },
    methods: {
        back() {
			this.$router.go(-1)
		}
    }
}
</script>

<style lang="stylus" scoped>
.container
    padding-top 40px
    .wrapper
        width 100%
        padding 10px
        line-height 1.8
        .contact-method
            margin-top 10px
            padding 10px
            border-radius 2px
            background-color #fff
            box-shadow 0 2px 5px rgba(0,0,0,.3)
            .contact-title
                height 40px
                line-height 40px
                color #26a2ff
                border-bottom 1px solid #ddd
            .contact-info
                padding 10px 0
                a
                    text-decoration none
                    color #333
                button
                    padding 5px 10px
    .qrcode
        flex 0 0 100px
        .qrcode-img
            display block
            width 100px
            height 100px
            margin 0 auto
        .qrcode-txt
            text-align center
</style>
