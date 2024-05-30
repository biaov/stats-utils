import { transformColor } from '@/utils/function'

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
export const svgHandler = async (req: ExpressHTTP.Request, res: ExpressHTTP.Response) => {
  let { text, size = 34, color = 'f56c6c' } = req.query
  color = transformColor(color)

  if (!text) return res.status(422).json({ message: '文本内容必传' })

  const height = Math.round(+size * 1.31)
  const width = Math.round((+size * getCharacterLength(text as string)) / 2)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <style>.cls-1{fill:${color};font-family: jiangxizhuokai-Regular, jiangxizhuokai;font-size: ${size}px;}</style>
    <text class="cls-1" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">${text}</text>
  </svg>`
  res.setHeader('Content-Type', 'image/svg+xml')
  res.send(svg)
}
