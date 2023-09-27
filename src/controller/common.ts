import { Request, Response } from 'express'
import dayjs from 'dayjs'
import { graphqlApi } from '@/api/github'
import type { GraphqlResponse, UserData, WeekItem } from './types'

/**
 * Github 统计
 */
export const generateTextImage = async (req: Request, res: Response) => {
  const { text, size, color } = req.query

  /**
   * 文本
   */
  if (!text) {
    res.status(422).json({ message: '文本内容必传' })
    return
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg id="_图层_2" data-name="图层 2" xmlns="http://www.w3.org/2000/svg" width="170" height="34.63" viewBox="0 0 170 34.63">
    <defs>
      <style>
        .cls-1 {
          fill: ${color || '#f56c6c'};
          font-family: jiangxizhuokai-Regular, jiangxizhuokai;
          font-size: ${size || '34px'};
        }
      </style>
    </defs>
    <g id="_图层_1-2" data-name="图层 1">
      <text class="cls-1" transform="translate(0 27.18)"><tspan x="0" y="0">${text}</tspan></text>
    </g>
  </svg>`

  res.send(svg)
}
