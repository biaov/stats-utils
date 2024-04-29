import { Request, Response } from 'express'
import { parseFromString } from 'dom-parser'
import { csdnApi } from '@/api/card'
import type { SVGOption } from './types'

const defaultSVGOption: SVGOption = {
  color: '#38bdae',
  background: '#1a1b27',
  title: 'CSDN 数据',
  titleColor: '#70a5fd'
}

const duration = 300

const colorFields = ['color', 'background', 'titleColor']
const width = 340
const height = 180

/**
 * 渲染 svg
 */
const renderSvg = (data: Option[], option: Partial<SVGOption>) => {
  Object.entries(option).forEach(([key, value]) => {
    defaultSVGOption[key as keyof SVGOption] = (colorFields.includes(key) && value.includes('rgb') ? '' : `#`) + value
  })

  const html = data.reduce((prev, item, i) => {
    const x = i % 2 ? 200 : 30
    const floor = ~~(i / 2)
    const y = 70 + floor * 35

    return `${prev}<text x="${x}" y="${y}" class="stats bold animation" dominant-baseline="middle" style="animation-delay:${floor * duration}ms;">${item.label}：${item.value}</text>`
  }, '')

  return `<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <style>
    @keyframes fade-in{0%{opacity:0;}100%{opacity:1;}}.animation{opacity:0;animation:fade-in ${duration}ms ease-in-out forwards;}.bold{font-weight:600;}.stats,.title{font-family:'Segoe UI',Ubuntu,Sans-Serif,'Helvetica Neue','PingFang SC','Microsoft YaHei';}.stats{font-size:14px;fill:${defaultSVGOption.color};}.title{font-size:18px;fill:${defaultSVGOption.titleColor};}
    </style>
    <rect width="100%" height="100%" rx="4.5" fill="${defaultSVGOption.background}" />
    <text x="50%" y="30" class="title bold animation" dominant-baseline="middle" text-anchor="middle">${defaultSVGOption.title}</text>
    ${html}
  </svg>`
}

/**
 * 转换数据
 */
const transformData = (data: string) => {
  const document = parseFromString(data)

  const [rewardBox] = document.getElementsByClassName('personal-reward-box')!
  const rewardNum = rewardBox.getElementsByClassName('num')
  const options = rewardBox.getElementsByClassName('name').map((item, i) => ({ label: item.textContent, value: rewardNum[i].textContent }))

  const [tagBox] = document.getElementsByClassName('personal-tag-box')!
  tagBox.getElementsByClassName('item').forEach(tag => {
    const label = tag.getElementsByClassName('name')[0].textContent.slice(0, 2)
    const [numNode] = tag.getElementsByClassName('num')
    if (!numNode) return
    const value = numNode.textContent
    options.length < 6 && options.push({ label, value })
  })

  return options
}

/**
 * csdn 统计
 */
export const getCSDN = async (req: Request, res: Response) => {
  const { username } = req.params
  csdnApi(username)
    .get<string>()
    .then(data => {
      console.log(data)
      res.json(data.toString())
      // res.json(data.toString())
      // const options = transformData(data)
      // res.setHeader('Content-Type', 'image/svg+xml')
      // res.send(renderSvg(options, req.query))
    })
    .catch(error => {
      console.log(error)
      res.status(422).json(error.data)
      // res.status(422).json({ message: `请检查 ${username} 是否正确` })
    })
}
