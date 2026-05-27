import axios from 'axios'
import router from "@/router/index.js";
import { ElMessage} from "element-plus";
import {refreshToken} from "@/api/auth.js";

// 创建实例
const service = axios.create({
    baseURL: '/api', // 走 vite 代理
    timeout: 15000,
    withCredentials: true
})

/**
 * 请求拦截器
 * 每次请求都会先执行这里
 */
service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
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
            return Promise.reject(res)
        }

        return res
    },
    async error => {
        const originalRequest = error.config

        if (error.code === 'ECONNABORTED') {
            ElMessage.error('请求超时')
            return Promise.reject(error)
        }

        if (error.response?.status === 401 && !originalRequest._retry) {

            const url = originalRequest.url

            // 防止 refresh 接口自身触发 refresh
            if (url.includes('/auth/refresh')) {
                localStorage.removeItem('token')
                localStorage.removeItem('refresh')

                await router.push('/login')

                return Promise.reject(error)
            }

            originalRequest._retry = true

            const refresh = localStorage.getItem('refresh')

            if (!refresh) {
                ElMessage.error('未登录或登录已过期')
                await router.push('/login')
                return Promise.reject(error)
            }

            try {
                const res = await refreshToken(refresh)
                const newToken = res.data.accessToken
                const newRefreshToken = res.data.refreshToken

                localStorage.setItem('token', newToken)
                localStorage.setItem('refresh', newRefreshToken)

                originalRequest.headers = originalRequest.headers || {}
                originalRequest.headers.Authorization = `Bearer ${newToken}`

                return service(originalRequest)
            } catch (e) {
                localStorage.removeItem('token')
                localStorage.removeItem('refresh')

                ElMessage.error('登录已过期，请重新登录')
                await router.push('/login')

                return Promise.reject(e)
            }
        }
        if (error.response?.status === 403) {
            localStorage.removeItem('token')
            ElMessage.error('无访问权限')
            router.push('/login')
        } else if (error.response?.status === 500) {
            const msg = error.response?.data?.message
            if (msg) {
                ElMessage.error(msg)
            } else {
                ElMessage.error('服务器异常')
            }
        } else {
            ElMessage.error(error.response?.data?.message)
        }
        return Promise.reject(error.response?.data)
    }
)

export default service
