import { factory } from './factory'

const command = factory('', {
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
  'Content-Type': 'text/html;charset=utf-8',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
})

/**
 * csdn
 */
export const csdnApi = (username: string) => command(`https://blog.csdn.net/${username}`) // command(`https://biaov.cn/`) 
