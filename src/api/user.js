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
export function getUserPatientsSimple() {
    return request({
        url: '/patients/simple',
        method: 'get'
    })
}

export function getPatientDetail(patientId) {
    return request({
        url: `/patients/${patientId}`,
        method: 'get'
    })
}

export function updatePatientDetail(data) {
    return request({
        url: `/patients`,
        method: 'put',
        data
    })
}

export function addPatientDetail(data) {
    return request({
        url: `/patients`,
        method: 'post',
        data
    })
}

export function deletePatientDetail(patientId) {
    return request({
        url: `/patients/${patientId}`,
        method: 'delete'
    })
}

export function listUsersByCondition(data) {
    return request({
        url: '/users/search',
        method: 'post',
        data
    })
}

export function registerDoctor(data) {
    return request({
        url: '/users/doctor/register',
        method: 'post',
        data
    })
}