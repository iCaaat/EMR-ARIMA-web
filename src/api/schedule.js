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
        url: "/schedules/add",
        method: "post",
        data
    })
}