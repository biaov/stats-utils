import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

/**
 * 创建 axios 实例
 */
export const service = (baseURL: string, headers: AxiosRequestConfig['headers'] = {}) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })

  /**
   * respone 响应拦截器
   */
  // instance.interceptors.response.use(
  //   response => response.data,
  //   ({ response }) => Promise.reject(response)
  // )

  return instance
}
