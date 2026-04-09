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

export function loadSelectSchedule(scheduleId) {
    return request({
        url: `/registration/schedules/${scheduleId}`,
        method: 'GET'
    })
}

export function loadPeriod(scheduleId) {
    return request({
        url: `/registration/period/${scheduleId}`,
        method: 'GET'
    })
}

export function loadSlots(scheduleId, period) {
    return request({
        url: `/registration/slots`,
        method: 'GET',
        params: {scheduleId: scheduleId, period: period}
    })
}

export function appoint(data) {
    return request({
        url: '/registration/appoint',
        method: 'POST',
        data
    })
}

export function getAppointments() {
    return request({
        url: '/registration/appoint',
        method: 'GET'
    })
}