'use strict'
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
const t = require('express'),
  n = require('dayjs'),
  e = require('axios'),
  s = ((t, n = {}) => {
    const s = e.create({ baseURL: t, timeout: 1e4, headers: { ...n, 'Content-Type': 'application/json' } })
    return (
      s.interceptors.response.use(
        t => t.data,
        ({ response: t }) => Promise.reject(t)
      ),
      s
    )
  })('https://api.github.com/', { Authorization: `bearer ${process.env.GITHUB_TOKEN}` }),
  o = ((i = '/graphql'), { get: (t = {}) => s.get(i, { params: t }), post: (t = {}, n = {}) => s.post(i, t, n) })
var i
const r = t.Router()
r.get('/stats-utils', async (t, e) => {
  const { username: s } = t.query,
    i = n(),
    r = i.subtract(30, 'days').toISOString(),
    a = i.add(1, 'days').toISOString()
  if (s)
    try {
      const {
        data: { user: t }
      } = await o.post(
        ((t, n, e) => ({
          query:
            '\n    query userInfo($name: String!, $from: DateTime!, $to: DateTime!) {\n      user(login: $name) {\n        name\n        contributionsCollection(from: $from, to: $to) {\n          contributionCalendar {\n            weeks {\n              contributionDays {\n                contributionCount\n                date\n              }\n            }\n          }\n        }\n      }\n    }\n  ',
          variables: { name: e, from: n, to: t }
        }))(a, r, s)
      )
      if (t) {
        const n = { contributions: [], name: t.name }
        t.contributionsCollection.contributionCalendar.weeks.map(t =>
          t.contributionDays.map(t => {
            n.contributions.push(t)
          })
        )
        const { length: s } = n.contributions
        0 === n.contributions[s - 1].contributionCount && n.contributions.pop()
        const o = n.contributions.length - 31
        n.contributions.splice(0, o), e.json(n)
      } else e.status(422).json({ message: '请检查你的用户名' })
    } catch (c) {
      return c
    }
  else e.status(422).json({ message: '请检查你的用户名' })
}),
  r.get('/text-image', async (t, n) => {
    const { text: e, size: s = 34, color: o = 'f56c6c' } = t.query
    if (!e) return void n.status(422).json({ message: '文本内容必传' })
    const i = 1.31 * +s,
      r =
        (+s *
          (t => {
            let n = 0
            for (let e = 0; e < t.length; e++) {
              const s = t.charCodeAt(e)
              n += (s >= 0 && s <= 127) || (s >= 65377 && s <= 65439) ? 1.5 : 2
            }
            return n
          })(e)) /
        2,
      a = `<svg data-name="图层 2" xmlns="http://www.w3.org/2000/svg" width="${r}" height="${i}" viewBox="0 0 ${r} ${i}">\n    <defs>\n      <style>\n        .cls-1 {\n          fill: #${o};\n          font-family: jiangxizhuokai-Regular, jiangxizhuokai;\n          font-size: ${s}px;\n        }\n      </style>\n    </defs>\n    <g id="_图层_1-2" data-name="图层 1">\n      <text class="cls-1" transform="translate(0 ${
        0.7 * i
      })"><tspan x="0" y="0">${e}</tspan></text>\n    </g>\n  </svg>`
    n.setHeader('Content-Type', 'image/svg+xml'), n.send(a)
  })
const a = t()
a.use('/api', r), a.listen(4e3), (exports.app = a)
