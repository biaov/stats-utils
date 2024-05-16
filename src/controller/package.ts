import dayjs from 'dayjs'
import * as icons from 'simple-icons'
import { downloadsApi } from '@/api/package'
import { svgTobase64, getTextWidth, titleCase, transformColor } from '@/utils/function'
import type { PackageTS } from './types'

/**
 * svg 容器高度
 */
const rectHeight = 20

/**
 * icon 图片大小
 */
const imageInitWidth = 14

/**
 * 左右间距
 */
const gap = 6 * 2

/**
 * 字体大小
 */
const fontSize = 11

/**
 * 字体
 */
const fontFamily = 'Verdana,Geneva,sans-serif,Arial'

/**
 * 文本颜色
 */
const textColor = '#fff'

/**
 * 文本样式
 */
const textStyle = { fontSize, fontFamily }

/**
 * 渲染 svg
 */
const renderSvg = ({ labelColor, color, label, value, image }: PackageTS.SVGOption) => {
  const labelWidth = getTextWidth(label, textStyle) + gap
  const valueWidth = getTextWidth(value, textStyle) + gap
  let imageWidth = 0
  let imageRectWidth = 0
  let imageHTML = ''

  if (image) {
    imageWidth = imageInitWidth
    imageRectWidth = imageWidth + gap / 2
    imageHTML = `<image x="${gap / 2}" y="${(rectHeight - imageWidth) / 2}" width="${imageWidth}" height="${imageWidth}" xlink:href="${image}" />`
  }

  /**
   * 标注和图片宽度
   */
  const prefixWidth = imageRectWidth + labelWidth
  /**
   * 区域宽度
   */
  const rectWidth = prefixWidth + valueWidth

  return ` <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${rectWidth}" height="${rectHeight}">
    <clipPath id="clipPath">
      <rect width="${rectWidth}" height="${rectHeight}" rx="3" />
    </clipPath>
    <g clip-path="url(#clipPath)">
      <rect width="${prefixWidth}" height="${rectHeight}" fill="${labelColor}"/>
      <rect x="${prefixWidth}" width="${valueWidth}" height="${rectHeight}" fill="${color}" />
    </g>
    <g fill="${textColor}" font-size="${fontSize}" dominant-baseline="central" text-anchor="middle" font-family="${fontFamily}">
      ${imageHTML}
      <text x="${prefixWidth - labelWidth / 2}" y="${rectHeight / 2}">${label}</text>
      <text x="${prefixWidth + valueWidth / 2}" y="${rectHeight / 2}">${value}</text>
    </g>
  </svg>`
}

/**
 * npm 下载量
 */
export const getDownloads = async (req: ExpressHTTP.Request, res: ExpressHTTP.Response) => {
  const { pkgName } = req.params
  const { start, end, labelColor: lc, color: c, label: l, svg = 'true', icon } = req.query
  const curDay = dayjs()
  const startDate = start || curDay.subtract(1, 'y').format('YYYY-MM-DD')
  const endDate = end || curDay.format('YYYY-MM-DD')
  const labelColor = lc ? transformColor(lc) : '#555'
  const color = c ? transformColor(c) : '#4c1'
  const label = l || 'downloads'
  let image = ''

  // 传入图标时的操作
  if (icon) {
    const svgContent = icons[`si${titleCase(icon)}` as keyof typeof icons].svg.replace('<path', `<path fill="${textColor}"`)
    image = svgTobase64(svgContent)
  }

  // 请求下载统计接口
  downloadsApi(`${startDate}:${endDate}/${pkgName}`)
    .get<PackageTS.NPMDownloadsResponse>()
    .then(data => {
      /**
       * 下载数据
       */
      const downloads = data.downloads.reduce((prev, item) => prev + item.downloads, 0)
      // 如果不需要 svg 图，则返回统计数据
      if (svg === 'false') return res.json({ data: downloads })

      /**
       * 格式化数量
       */
      let num: string | number = +(downloads / 1000).toFixed(1)
      num > 1 && (num = `${num}k`)
      // 返回 svg 图
      const labelWidth = getTextWidth(label, textStyle) + gap
      // res.json({
      //   label,
      //   textStyle,
      //   labelWidth,
      //   gap
      // })
      res.setHeader('Content-Type', 'image/svg+xml')
      res.send(renderSvg({ labelColor, color, label, value: `${num}`, image }))
    })
    .catch(error => {
      const { status, data } = error.response
      res.status(status).json(data)
    })
}
