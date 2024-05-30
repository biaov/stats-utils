import { Router } from 'express'
import { routes } from './routes'

/**
 * 路由实例
 */
export const router = Router()

/**
 * 渲染配置的路由
 */
routes.forEach(route => {
  router[route.method || 'get'](`/${route.path}`, route.handler)
})
