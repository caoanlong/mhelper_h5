import Base from './Base'
import request from '../utils/request'

class Market extends Base {
    findAll(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/all',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            }).catch(err => reject(err))
        })
    }
    findById(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/id',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            }).catch(err => reject(err))
        })
    }
}

export default new Market('/news', request)