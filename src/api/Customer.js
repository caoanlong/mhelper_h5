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
}

export default new Customer('/customer', request)