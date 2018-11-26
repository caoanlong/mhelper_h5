import Base from './Base'
import request from '../utils/request'

class Customer extends Base {
    customerInfo(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/customerinfo',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            }).catch(err => reject(err))
        })
    }
    spread(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/spread',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            }).catch(err => reject(err))
        })
    }
    custcontributions(data) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/custcontributions',
                method: 'post',
                data
            }).then(res => {
                resolve(res.data.data || res.data || res)
            }).catch(err => reject(err))
        })
    }
}

export default new Customer('/customer', request)