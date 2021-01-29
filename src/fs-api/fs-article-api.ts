import fs from 'fs'
import { join, resolve } from 'path'
import matter from 'gray-matter'
import type { GrayMatterFile } from 'gray-matter'
import slugify from 'slugify'
import type { LibArticleApi, ArticleYaml } from '../types'

const postsDirectory = resolve(process.cwd(), './content/posts')

function _getRawArticleById(
  id: string
): GrayMatterFile<string> & { data: ArticleYaml } {
  const fullPathInFolder = join(postsDirectory, `${id}/index.mdx`)
  const fileContents = fs.readFileSync(fullPathInFolder, 'utf8')

  return matter(fileContents) as GrayMatterFile<string> & {
    data: ArticleYaml
  }
}

function getAllIds(): Array<string> {
  return fs.readdirSync(postsDirectory)
}

function getArticle(id: string): ArticleYaml {
  const foldername = id.replace(/\.mdx$/, '')
  const { data, content } = _getRawArticleById(foldername)

  const result = { ...data }

  result.id = foldername
  result.slug = data.slug || slugify(data.title, { lower: true })
  result.content = content
  result.hero = join('posts', foldername, data.hero)
  return result
}

function getAllArticles(): Array<ArticleYaml> {
  return (
    getAllIds()
      .map((slug) => getArticle(slug))
      // sort posts by date in descending order
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  )
}

function getArticlesByAuthor(name: string): Array<ArticleYaml> {
  return getAllArticles().filter((post) => {
    return post.author.indexOf(name) !== -1
  })
}

export const fsArticleApi: LibArticleApi = {
  getAllIds,
  getAllArticles,
  getArticle,
  getArticlesByAuthor
}

export default fsArticleApi
