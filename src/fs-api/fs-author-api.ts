import fs from 'fs'
import { join, resolve } from 'path'
import * as yaml from 'js-yaml'
import slugify from 'slugify'
import type { LibAuthorApi, IAuthorYaml } from '../types'

const authorsDirectory = resolve(process.cwd(), './content/authors')

function _getRawAuthorsByFile(filename: string): IAuthorYaml[] {
  const fullPath = join(authorsDirectory, `${filename}`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const data: IAuthorYaml[] = yaml.safeLoad(fileContents) as IAuthorYaml[]
  return data
}

function _extractFields(data: IAuthorYaml): IAuthorYaml {
  const result = { ...data }
  result.slug = data.slug || slugify(data.name, { lower: true })
  result.avatar = join('authors', data.avatar)

  return result
}

function getAllAuthors(): Array<IAuthorYaml> {
  const authorFiles = fs
    .readdirSync(authorsDirectory)
    .filter((f) => f.endsWith('.yml'))

  const items = [].concat(
    ...authorFiles.map((filename) => _getRawAuthorsByFile(filename))
  )

  return items
    .sort((post1, post2) => (post1.slug > post2.slug ? -1 : 1))
    .map((author) => _extractFields(author))
}

function getAuthorByName(authors: IAuthorYaml[], name: string): IAuthorYaml {
  return authors.find((author) => author.name === name)
}

function getAuthorBySlug(authors: IAuthorYaml[], slug: string): IAuthorYaml {
  return authors.find((author) => author.slug === slug)
}

export const fsAuthorApi: LibAuthorApi = {
  getAuthorByName,
  getAuthorBySlug,
  getAllAuthors
}

export default fsAuthorApi
