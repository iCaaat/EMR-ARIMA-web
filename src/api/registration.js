import request from '@/utils/request.js'

export function getDepartments() {
    return request({
        url: '/registration/departments',
        method: 'GET',
    })
}

export function getSevenDays() {
    return request({
        url: '/registration/dates',
        method: 'GET'
    })
}

export function getDoctors(departmentId, date) {
    return request({
        url: '/registration/doctors',
        method: 'GET',
        params: {departmentId: departmentId,workDate: date}
    })
}

export function loadSelectDepartment(departmentId) {
    return request({
        url: `/registration/departments/${departmentId}`,
        method: 'GET'
    })
}