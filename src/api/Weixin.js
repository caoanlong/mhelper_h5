import Base from './Base'
import request from '../utils/request'

class Weixin extends Base {
    getOpenID(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getOpenID',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            }).catch(err => reject(err))
        })
    }
    getUserInfo(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getUserInfo',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            }).catch(err => reject(err))
        })
    }
    getWeixinConfig(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/config',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            }).catch(err => reject(err))
        })
    }
}

export default new Weixin('/weixin', request)