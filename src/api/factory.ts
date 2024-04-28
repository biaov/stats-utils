import type { AxiosRequestConfig } from 'axios'
import { service } from '@/utils/request'

/**
 * 创建服务
 */
export const factory = (baseURL: string, headers: AxiosRequestConfig['headers'] = {}) => {
  const factory = service(baseURL, headers)

  return (path: string) => ({
    get: <T>(query = {}) => factory.get(path, { params: query }) as Promise<T>,
    post: <T>(data = {}, config: AxiosRequestConfig = {}) => factory.post(path, data, config) as Promise<T>
  })
}
