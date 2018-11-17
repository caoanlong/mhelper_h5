import Base from './Base'
import request from '../utils/request'

class Weixin extends Base {
    getOpenID() {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + 'getOpenID',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            }).catch(err => reject(err))
        })
    }
}

export default new Weixin('/weixin', request)