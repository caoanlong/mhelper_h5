import Base from './Base'
import request from '../utils/request'

class Market extends Base {
    historyList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/historyList',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
}

export default new Market('/market', request)