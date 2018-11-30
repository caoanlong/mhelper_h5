<template>
    <div class="container">
        <mt-header fixed :title="$route.meta.title" style="width:100%">
            <div slot="left" @click="back">
				<mt-button icon="back">返回</mt-button>
			</div>
        </mt-header>
        <div class="img-container">
            <croppa 
                v-model="myCroppa" 
                placeholder="请选择图片" 
                :canvas-color="'#333333'" 
                :placeholder-font-size="16" 
                :placeholder-color="'#ffffff'"
                :prevent-white-space="true" 
                :zoom-speed="8"
                accept="image/*"
                :width="300"
                :height="300" 
                :quality="1" 
                :initial-image="imgUrl" 
                @loading-end="change">
            </croppa>
        </div>
        <div class="modify">
			<mt-button type="primary" style="width:300px" @click="updateAvatar">提交</mt-button>
		</div>
    </div>
</template>

<script>
import 'vue-croppa/dist/vue-croppa.css'
import axios from 'axios'
import { Toast } from 'mint-ui'
import { mapGetters } from 'vuex'
import { baseURL } from '../../../utils/request'
import { dataURLtoFile, formDataReq } from '../../../utils/common'
import Customer from '../../../api/Customer'
export default {
    data() {
        return {
            myCroppa: {},
            file: null,
            imgUrl: ''
        }
    },
    computed: {
		...mapGetters(['userInfo'])
	},
    created() {
        this.imgUrl = this.userInfo.avator
    },
    methods: {
        change() {
            const base64 = this.myCroppa.generateDataUrl('image/jpeg')
            this.file = dataURLtoFile(base64)

            const url = baseURL + '/upload/setFileUpload'
			const headers = { 'Content-type': 'multipart/form-data;charset=UTF-8' }
			const params = formDataReq({ file: this.file })
			axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
			axios.post(url, params, headers).then(res => {
                if (res.data.code == 200) {
                    this.imgUrl = 'http://file.mhelper.co' + res.data.data.split('data')[1]
                } else {
                    Toast(res.data.msg)
                }
			}).catch(err => {
                Toast('服务器异常:' + err)
			})
        },
        updateAvatar() {
			Customer.update({
                customerModel: { 'avator': this.imgUrl }
            }).then(res => {
                Toast('成功')
                this.$router.push({name: 'mineinfo'})
            })
		},
        back() {
			this.$router.push({name: 'mineinfo'})
		}
    }
}
</script>

<style lang="stylus" scoped>
.container
    width 100%
    height 100%
    padding-top 40px
    background-color #000
    .img-container
        width 100%
        display flex
        justify-content center
        padding-top 20px
    .modify
        padding 20px 0
        display flex
        justify-content center
</style>
