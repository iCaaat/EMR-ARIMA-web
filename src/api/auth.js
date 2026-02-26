import request from '@/utils/request.js'

export function login(data) {
    return request({
        url: '/users/login',
        method: 'post',
        data
    })
}

export function myInfo() {
    return request({
        url: '/users/me',
        method: 'get'
    })
}