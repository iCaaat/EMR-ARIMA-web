import request from "@/utils/request.js";

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

export function updateUserInfo(data) {
    return request({
        url: '/users/me',
        method: 'put',
        data
    })
}

export function updatePassword(data) {
    return request({
        url: '/users/password',
        method: 'put',
        data
    })
}

export function getUserPatients() {
    return request({
        url: '/patients',
        method: 'get'
    })
}

export function getPatientDetail(patientId) {
    return request({
        url: `/patients/${patientId}`,
        method: 'get'
    })
}