import request from "@/utils/request.js";

export default function getSchedules(data) {
    return request({
        url: "/schedules/search",
        method: "post",
        data
    })
}