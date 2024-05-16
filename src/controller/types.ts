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

export namespace CardTS {
  /**
   * svg option
   */
  export interface SVGOption {
    color: string
    background: string
    title: string
    titleColor: string
  }
}

export namespace PackageTS {
  export interface DownloadResponse {
    downloads: number
    day: string
  }

  export interface NPMDownloadsResponse {
    start: string
    end: string
    package: string
    downloads: DownloadResponse[]
  }
  export interface SVGOption {
    value: string
    label: string
    labelColor: string
    color: string
    image: string
  }
}
