export interface ArticleYaml {
  id: string // filename
  slug: string // could be filename or slugified title/date
  title: string
  author: string
  date: Date // 2017-04-31
  hero: string // ./images/hero-4.jpg
  excerpt: string
  secret?: boolean
  subscription?: boolean
  canonical_url?: string
  timeToRead?: number
  content: string
}

export interface LibArticleApi {
  getAllIds: () => Array<string>
  getArticle: (id: string) => ArticleYaml
  getAllArticles: () => Array<ArticleYaml>
  getArticlesByAuthor: (name: string) => Array<ArticleYaml>
}
