import { factory } from './factory'

const header = {
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
}

const command = factory(import.meta.env.VITE_BLOG_URL, header)
const commandProxy = factory(import.meta.env.VITE_DESKTOP_URL, header)

/**
 * csdn
 */
export const csdnApi = (username: string) => command(username)

/**
 * csdn proxy
 */
export const csdnProxyApi = commandProxy('proxy')
