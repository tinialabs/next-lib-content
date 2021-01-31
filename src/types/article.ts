import { IAuthor } from './author'
import { INovelaImage } from './image'

interface IArticleBase {
  id: string // filename
  slug: string // could be filename or slugified title/date
  title: string
  author: string
  excerpt: string
  secret?: boolean
  subscription?: boolean
  canonicalUrl?: string
  timeToRead?: number
}

export interface IArticleYaml extends IArticleBase {
  date: Date // 2017-04-31
  hero: string // ./images/hero-4.jpg
  content: string
}

export interface IArticle extends IArticleBase {
  hero: INovelaImage
  date: string
}

export interface IArticleDetail extends IArticle, Record<string, any> {
  authors: IAuthor[]
}

export interface LibArticleApi {
  getAllIds: () => Array<string>
  getArticle: (id: string) => IArticleYaml
  getAllArticles: () => Array<IArticleYaml>
  getArticlesByAuthor: (name: string) => Array<IArticleYaml>
}
