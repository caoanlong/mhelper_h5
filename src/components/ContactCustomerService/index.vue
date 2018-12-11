<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title">
			<router-link to="" slot="left" @click.native="back">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
        <div class="wrapper">
            MHelper客户服务联系方式：<br/>
            <br/>
            【QQ】<br/>
            <a href="tencent://message/?Menu=yes&uin=3338939303&Site=80fans&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a545b1714f9d45">
                QQ号：<span id="qq">3338939303</span>
            </a>&nbsp;&nbsp;<button id="qqBtn" data-clipboard-target="#qq">复制</button><br/>
            <br/>
            【微信】<br/>
            <div class="qrcode">
                <img class="qrcode-img" src="../../assets/qrcode.jpg" alt="">
            </div>
            <div>
                <span @click="popupVisible = true">
                    微信号：<span id="wx">j88840880</span>
                </span>&nbsp;&nbsp;<button id="wxBtn" data-clipboard-target="#wx">复制</button><br/>
                （温馨提醒：微信用户太多，为了获得更好的帮助，建议加QQ）
            </div><br/>
            【电话】<br/>
            <a href="tel:0755-88840880">+86(755)88840880</a><br/>
            <br/>
            【邮箱】<br/>
            <a href="mailto:MHelper@bv-health.com">MHelper@bv-health.com</a><br/>
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
    .qrcode
        width 100%
        padding 20px 0 20px 0
        .qrcode-img
            display block
            width 200px
            height 200px
            margin 0 auto
        .qrcode-txt
            text-align center
</style>
