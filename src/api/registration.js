import request from '@/utils/request.js'

export function getDepartments() {
    return request({
        url: '/registration/departments',
        method: "GET",
    })
}