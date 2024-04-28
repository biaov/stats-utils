import { factory } from './factory'

const command = factory('https://api.github.com/', { Authorization: `bearer ${import.meta.env.PROD ? process.env.GITHUB_TOKEN : import.meta.env.VITE_GITHUB_TOKEN}` })

/**
 * 统计
 */
export const graphqlApi = command('graphql')
