import { Router } from 'express'
import { getTextImage } from '@/controller/common'
import { getGithubStats } from '@/controller/github-stats'
import { getCSDN } from '@/controller/card'
import { getDownloads } from '@/controller/package'

export const router = Router()

/**
 * Github 统计
 */
router.get('/github-stats', getGithubStats)

/**
 * 生成文字图
 */
router.get('/svg', getTextImage)

/**
 * 获取 CSDN 面板
 */
router.get('/csdn/:username', getCSDN)

/**
 * 获取 NPM 包下载量
 */
router.get('/downloads/:pkgName', getDownloads)
