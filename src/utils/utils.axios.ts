import axios from "axios"

// 创建一个 axios 实例
const service = axios.create({
    baseURL: process.env.REACT_APP_API || process.env.LOCAL_APP_API,
    timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在请求发送之前做一些处理
        const token = localStorage.getItem("token")
        if (token && token !== "undefined") {
            // config.headers['X-AUTH-TOKEN'] = token
        }

        return config
    },
    error => {
        // 发送失败
        console.log(error) //eslint-disable-line
        Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data
        // 这个状态码是和后端约定的
        const { code } = dataAxios
        // 根据 code 进行判断
        if (code === undefined) {
            return dataAxios
        } else {
            // 有 code 代表这是一个后端接口 可以进行进一步的判断
            switch (+code) {
                case 0:
                    // [ 示例 ] code === 0 代表没有错误
                    return dataAxios
                case -1:
                    // errorCreate(response, dataAxios.message)
                    break
                // token 过期
                case 50000:
                    // router.push({ name: "login" })
                    break
                default:
                    // 不是正确的 code
                    // errorCreate(response, dataAxios.message)
                    break
            }
        }
    },
    error => {
        // prettier-ignore
        if (error && error.response) {
            switch (error.response.status) {
                case 400: error.message = '请求错误'; break
                case 401: error.message = '未授权，请登录'; break
                case 403: error.message = '拒绝访问'; break
                case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
                case 408: error.message = '请求超时'; break
                case 500: error.message = '服务器内部错误'; break
                case 501: error.message = '服务未实现'; break
                case 502: error.message = '网关错误'; break
                case 503: error.message = '服务不可用'; break
                case 504: error.message = '网关超时'; break
                case 505: error.message = 'HTTP版本不受支持'; break
                default: break
            }
        }

        return Promise.reject(error)
    }
)

export default service
