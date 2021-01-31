import { INovelaImage } from './image'

interface IAuthorBase {
  slug: string
  name: string
  bio: string
  social: Array<{ url: string; name: string }>
  featured: boolean
  authorsPage?: boolean
}

export interface IAuthorYaml extends IAuthorBase {
  avatar: string // ./avatars/dennis-brotzky.jpg
}

export interface IAuthor extends IAuthorBase {
  avatar: INovelaImage
}

export interface LibAuthorApi {
  getAuthorByName: (authors: IAuthorYaml[], name: string) => IAuthorYaml
  getAuthorBySlug: (authors: IAuthorYaml[], slug: string) => IAuthorYaml
  getAllAuthors: () => Array<IAuthorYaml>
}
