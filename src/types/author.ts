import { INovelaImage } from './image'

interface AuthorBase {
  slug: string
  name: string
  bio: string
  social: Array<{ url: string; name: string }>
  featured: boolean
  authorsPage?: boolean
}

export interface AuthorYaml extends AuthorBase {
  avatar: string // ./avatars/dennis-brotzky.jpg
}

export interface IAuthor extends AuthorBase {
  avatar: INovelaImage
}

export interface LibAuthorApi {
  getAuthorByName: (authors: AuthorYaml[], name: string) => AuthorYaml
  getAuthorBySlug: (authors: AuthorYaml[], slug: string) => AuthorYaml
  getAllAuthors: () => Array<AuthorYaml>
}
