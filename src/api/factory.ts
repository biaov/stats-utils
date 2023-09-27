import type { AxiosRequestConfig } from 'axios'
import { service } from '@/utils/request'

const factory = service(import.meta.env.VITE_GITHUB_BASE_URL, { Authorization: `bearer ${import.meta.env.VITE_TOKEN}` })

export const command = (path: string) => ({
  get: (query = {}) => factory.get(path, { params: query }) as Promise<Record<string, any>>,
  post: <T>(data = {}, config: AxiosRequestConfig = {}) => factory.post(path, data, config) as Promise<T>
})
