import Base from './Base'
import request from '../utils/request'

class Login extends Base {
    getICode(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getICode',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            }).catch(err => reject(err))
        })
    }

    login(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/login',
            method: 'post',
            data
        })
    }

    registry(data) {
        if (!this.isClick) return Promise.reject('重复提交！')
        this.isClick = false
        setTimeout(() => { this.isClick = true }, this.delay)
        return this.request({
            url: this.baseUrl + '/registry',
            method: 'post',
            data
        })
    }
}

export default new Login('/login', request)