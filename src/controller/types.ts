/**
 * 一天的数据类型
 */
interface contributionDayItem {
  contributionCount: number
  date: string
}

/**
 * week item 类型
 */
export interface WeekItem {
  contributionDays: contributionDayItem[]
}

/**
 * graphql 接口返回的数据类型
 */
export interface GraphqlResponse {
  data: {
    user: {
      name: string
      contributionsCollection: {
        contributionCalendar: {
          weeks: WeekItem[]
        }
      }
    }
  }
}

/**
 * 用户数据类型
 */
export interface UserData {
  name: string
  contributions: contributionDayItem[]
}

/**
 * svg option
 */
export interface SVGOption {
  color: string
  background: string
  title: string
  titleColor: string
}
