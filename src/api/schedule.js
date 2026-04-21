import request from "@/utils/request.js";

export function getSchedules(data) {
    return request({
        url: "/schedules/search",
        method: "post",
        data
    })
}

export function addSchedule(data) {
    return request({
        url: "/schedules",
        method: "post",
        data
    })
}

export function deleteSchedule(scheduleId) {
    return request({
        url: `/schedules/${scheduleId}`,
        method: "delete"
    })
}

export function updateSchedule(data) {
    return request({
        url: '/schedules',
        method: 'put',
        data
    })
}