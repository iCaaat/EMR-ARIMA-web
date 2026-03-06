import request from '@/utils/request.js'

export function login(data) {
    return request({
        url: '/users/login',
        method: 'post',
        data
    })
}

export function register(data) {
    return request({
        url: '/users/register',
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

export function existUsername(username) {
    return request({
        url: '/users/exists',
        method: 'get',
        params: { username }
    })
}