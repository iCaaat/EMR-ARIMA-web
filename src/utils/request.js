import axios from 'axios'
import router from "@/router/index.js";

// 创建实例
const service = axios.create({
    baseURL: '/api', // 走 vite 代理
    timeout: 10000,
    withCredentials: true
})

/**
 * 请求拦截器
 * 每次请求都会先执行这里
 */
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

/**
 * 响应拦截器
 * 后端返回后先经过这里
 */
service.interceptors.response.use(
    response => {
        // 假设后端统一格式：
        // { code: 200, message: "成功", data: {...} }

        const res = response.data

        if (res.code !== 200) {
            console.error(res.message)
            return Promise.reject(res.message)
        }

        return res
    },
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            router.push('/login')
        }
        console.error('网络错误:', error)
        return Promise.reject(error)
    }
)

export default service
