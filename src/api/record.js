import request from '@/utils/request.js'

export function postRecord(data) {
    return request({
        url: '/medical',
        method: 'post',
        data
    })
}