import { Router } from 'express'
import { getTextImage } from '@/controller/common'
import { getGithubStats } from '@/controller/github-stats'
import { getCSDN } from '@/controller/card'

export const router = Router()

/**
 * github 统计
 */
router.get('/github-stats', getGithubStats)

/**
 * 生成文字图
 */
router.get('/text-image', getTextImage)

/**
 * 获取 CSDN 面板
 */
router.get('/csdn/:username', getCSDN)
