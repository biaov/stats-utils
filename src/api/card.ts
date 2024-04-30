import https from 'https'
import { factory } from './factory'

const command = factory('https://blog.csdn.net/', {
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
  'Content-Type': 'text/html;charset=utf-8'
})

/**
 * csdn
 */
// export const csdnApi = (username: string) => command(username)

export const csdnApi = (username: string): Promise<string> =>
  new Promise((resolve, reject) => {
    https
      .get(
        `https://blog.csdn.net/${username}`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
            'Content-Type': 'text/html;charset=utf-8'
          }
        },
        res => {
          let data = ''
          res.on('data', chunk => {
            data += chunk
          })
          res.on('end', () => {
            resolve(data)
          })
        }
      )
      .on('error', reject)
  })
