import Base from './Base'
import request from '../utils/request'

class UserVisit extends Base {
    uservisit(data) {
        return this.request({
            url: this.baseUrl + '/uservisit',
            method: 'post',
            data
        })
    }
}

export default new UserVisit('/uservisitinfo', request)