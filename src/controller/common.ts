import { Request, Response } from 'express'
import dayjs from 'dayjs'
import { graphqlApi } from '@/api/github'
import type { GraphqlResponse, UserData, WeekItem } from './types'

/**
 * 获取字符串长度
 */
const getCharacterLength = (str: string) => {
  let length = 0
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    if ((code >= 0 && code <= 127) || (code >= 0xff61 && code <= 0xff9f)) {
      /**
       * 区分单字节字符和半角片假名
       */
      length += 1.5
    } else {
      /**
       * 其他多字节字符，如汉字
       */
      length += 2
    }
  }

  return length
}

/**
 * Github 统计
 */
export const generateTextImage = async (req: Request, res: Response) => {
  const { text, size = 34, color = 'f56c6c' } = req.query

  /**
   * 文本
   */
  if (!text) {
    res.status(422).json({ message: '文本内容必传' })
    return
  }

  const height = +size * 1.31
  const width = (+size * getCharacterLength(text as string)) / 2
  const svg = `<svg data-name="图层 2" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <style>
        .cls-1 {
          fill: #${color};
          font-family: jiangxizhuokai-Regular, jiangxizhuokai;
          font-size: ${size}px;
        }
      </style>
    </defs>
    <g id="_图层_1-2" data-name="图层 1">
      <text class="cls-1" transform="translate(0 ${height * 0.7})"><tspan x="0" y="0">${text}</tspan></text>
    </g>
  </svg>`
  res.setHeader('Content-Type', 'image/svg+xml')
  res.send(svg)
}
