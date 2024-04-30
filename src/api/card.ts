import { factory } from './factory'

const command = factory('https://desktop.biaov.cn/api/', {
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
})

/**
 * csdn
 */
export const csdnApi = command('proxy')
