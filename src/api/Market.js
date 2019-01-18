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
            }).catch(err => reject(err))
        })
    }

    getmarkets(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getmarkets',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            }).catch(err => reject(err))
        })
    }

    getcurrencys(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getcurrencys',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            }).catch(err => reject(err))
        })
    }

    getcoins(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getcoins',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            }).catch(err => reject(err))
        })
    }

    getcointickbycurrency(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getcointickbycurrency',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            }).catch(err => reject(err))
        })
    }
}

export default new Market('/market', request)