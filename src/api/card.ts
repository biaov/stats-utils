import { factory } from './factory'

const command = factory('', {
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
  // 'Content-Type': 'text/html;charset=utf-8',
  // 'Content-Language': 'zh-CN'
})

/**
 * csdn
 */
export const csdnApi = (username: string) => command(`https://biaov.cn/`) // command(`https://blog.csdn.net/${username}`)
