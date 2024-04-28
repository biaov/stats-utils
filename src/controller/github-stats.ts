import { Request, Response } from 'express'
import dayjs from 'dayjs'
import { graphqlApi } from '@/api/github'
import type { GraphqlResponse, UserData } from './types'

/**
 * 获取 Graphql 参数
 */
const getGraphqlParams = (to: string, from: string, name: string) => ({
  query: `
    query userInfo($name: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $name) {
        name
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `,
  variables: { name, from, to }
})

/**
 * Github 统计
 */
export const getGithubStats = async (req: Request, res: Response) => {
  const { username } = req.query
  /**
   * 近 30 天数据
   */
  const now = dayjs()
  const from = now.subtract(30, 'days').toISOString()
  const to = now.add(1, 'days').toISOString()

  /**
   * github 用户名
   */
  if (!username) {
    res.status(422).json({ message: '请检查你的用户名' })
    return
  }

  try {
    const {
      data: { user }
    } = await graphqlApi.post<GraphqlResponse>(getGraphqlParams(to, from, username as string))
    if (!user) {
      res.status(422).json({ message: '请检查你的用户名' })
    } else {
      const userData: UserData = { contributions: [], name: user.name }

      user.contributionsCollection.contributionCalendar.weeks.map(week =>
        week.contributionDays.map(item => {
          // item.date = dayjs(item.date).date().toString()
          userData.contributions.push(item)
        })
      )

      const { length } = userData.contributions
      userData.contributions[length - 1].contributionCount === 0 && userData.contributions.pop()
      const extra = userData.contributions.length - 31
      userData.contributions.splice(0, extra)

      res.json(userData)
    }
  } catch (error) {
    return error
  }
}
