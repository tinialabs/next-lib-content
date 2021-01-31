import type { IArticleYaml, IAuthorYaml } from '../types'

export {
  normalizeAuthor,
  normalizeArticle,
  normalizeSiteProps
} from './normalize'

export { putCache, getCache } from './cache'

export const byDate = (a: IArticleYaml, b: IArticleYaml) => +b.date - +a.date

export const getUniqueListBy = (
  array: Array<IAuthorYaml>,
  key: keyof IAuthorYaml
) => {
  return [...new Map(array.map((item) => [item[key], item])).values()]
}
