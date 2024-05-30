import type { RequestHandler } from 'express'

export interface RouteItem {
  method?: 'get'
  name?: string
  path: string
  handler: RequestHandler
}
