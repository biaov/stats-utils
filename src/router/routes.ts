import type { RouteItem } from './types'
import { svgHandler } from '@/controller/common'
import { githubStatsHandler } from '@/controller/github-stats'
import { csdnHandler } from '@/controller/card'
import { downloadsHandler } from '@/controller/package'

/**
 * 路由配置文件
 */
export const routes: RouteItem[] = [
  {
    name: 'Github 统计',
    path: 'github-stats',
    handler: githubStatsHandler
  },
  {
    name: '生成文字图',
    path: 'svg',
    handler: svgHandler
  },
  {
    name: '获取 CSDN 面板',
    path: 'csdn/:username',
    handler: csdnHandler
  },
  {
    name: '获取 NPM 包下载量',
    path: 'downloads/:pkgName',
    handler: downloadsHandler
  }
]
