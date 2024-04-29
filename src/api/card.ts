import { factory } from './factory'

// import.meta.env.VITE_CSDN_URL
const command = factory('https://blog.csdn.net/', {
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
})

/**
 * csdn
 */
export const csdnApi = (username: string) => command(username)
