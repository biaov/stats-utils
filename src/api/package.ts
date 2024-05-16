import { factory } from './factory'

const command = factory('https://api.npmjs.org/')

/**
 * 统计
 */
export const downloadsApi = (path: string) => command(`downloads/range/${path}`)
