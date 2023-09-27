import { Router } from 'express'
import { getGithubStatistics } from '@/controller/github-statistics'
import { generateTextImage } from '@/controller/common'

export const router = Router()

/**
 * github 统计
 */
router.get('/github-statistics', getGithubStatistics)

/**
 * 生成文字图
 */
router.get('/generate-text-image', generateTextImage)
