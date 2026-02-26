import axios from 'axios'
import router from "@/router/index.js";
import { ElMessage} from "element-plus";

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
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            ElMessage.error('未登录或登录已过期')
            router.push('/login')
        }else if (error.response?.status === 403) {
            localStorage.removeItem('token')
            ElMessage.error('无访问权限')
            router.push('/login')
        } else {
            ElMessage.error(error.response?.data?.message)
        }
        return Promise.reject(error.response?.data)
    }
)

export default service
