export interface AuthorYaml {
  slug: string
  name: string
  bio: string
  avatar: string // ./avatars/dennis-brotzky.jpg
  social: Array<{ url: string; name: string }>
  featured: boolean
  authorsPage?: boolean
}

export interface LibAuthorApi {
  getAuthorByName: (authors: AuthorYaml[], name: string) => AuthorYaml
  getAuthorBySlug: (authors: AuthorYaml[], slug: string) => AuthorYaml
  getAllAuthors: () => Array<AuthorYaml>
}
