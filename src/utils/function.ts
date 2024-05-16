import { createCanvas } from 'canvas'

/**
 * 随机字母
 * @param { number } 字母长度
 * @returns { string } 数字
 */
export const randomLetter = (length = 5) => {
  let code = ''
  for (let i = 0; i < length; i++) {
    const num = Math.random() * (122 + 1 - 97) + 97
    code += String.fromCharCode(num)
  }

  return code
}

/**
 * 转化颜色
 */
export const transformColor = (color: unknown) => (`${color}`.includes('rgb') ? '' : '#') + `${color}`

/**
 * svg 转 base64
 */
export const svgTobase64 = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg.trim()).toString('base64')}`

/**
 * 获取文本宽度
 */
export const getTextWidth = (text: string, { fontSize, fontFamily }: Utils.TextStyle) => {
  const canvas = createCanvas(1, 1)
  const context = canvas.getContext('2d')
  context.font = `${fontSize}px ${fontFamily}`
  const metrics = context.measureText(text)
  return Math.ceil(metrics.width)
}

/**
 * 首字母大写
 */
export const titleCase = (str: string) => {
  const text = str.toLowerCase()
  return text[0].toUpperCase() + text.slice(1)
}
