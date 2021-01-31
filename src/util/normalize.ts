import readingTime from 'reading-time'
import formatDate from 'date-fns/format'
import type {
  IArticleYaml,
  AuthorYaml,
  SitePropsYaml,
  IAuthor,
  IArticle,
  SiteProps,
  IArticleDetail,
  INovelaImage
} from '../types'

export function normalizeArticle({
  siteProps,
  rawArticle
}: {
  siteProps: SiteProps
  rawArticle: IArticleYaml
}): IArticle {
  const hero = {
    src: rawArticle.hero,
    alt: rawArticle.title
  }

  const result: IArticle = {
    id: rawArticle.id,
    slug: generateSlug(
      siteProps.blog.basePath,
      siteProps.blog.pathPosts,
      rawArticle.slug
    ),
    author: rawArticle.author,
    excerpt: rawArticle.excerpt,
    hero,
    timeToRead: Math.round(
      readingTime(rawArticle.content, {
        wordsPerMinute: 250
      }).minutes
    ),
    date: formatDate(rawArticle.date, 'yyyy-MM-dd'),
    secret: !!rawArticle.secret,
    title: rawArticle.title,
    canonicalUrl: rawArticle.slug,
    subscription: !!rawArticle.subscription
  }

  return normalizeImage(result)
}

export function normalizeArticleWithContent({
  siteProps,
  rawArticle,
  authors
}: {
  siteProps: SiteProps
  rawArticle: IArticleYaml
  authors: IAuthor[]
}): [IArticleDetail, string] {
  const article = normalizeArticle({ siteProps, rawArticle })

  const articleDetail: IArticleDetail = {
    ...article,
    authors: rawArticle.author
      .split(/\s*[,]\s*/)
      .map((authorname) => authors.find((author) => author.name === authorname))
      .filter(Boolean)
  }

  return [articleDetail, rawArticle.content]
}

export function normalizeAuthor({
  siteProps,
  rawAuthor
}: {
  siteProps: SiteProps
  rawAuthor: AuthorYaml
}): IAuthor {
  const avatar = {
    src: rawAuthor.avatar,
    alt: rawAuthor.name
  }

  const result: IAuthor = {
    authorsPage: siteProps.blog.authorsPage || !!rawAuthor.authorsPage,
    featured: !!rawAuthor.featured,
    name: rawAuthor.name,
    slug: generateSlug(
      siteProps.blog.basePath,
      siteProps.blog.pathAuthors,
      rawAuthor.slug
    ),
    bio: rawAuthor.bio,
    avatar,
    social: rawAuthor.social
  }

  return normalizeImage(result)
}

function generateSlug(...args: string[]) {
  return `/${args.join('/')}`.replace(/\/\/+/g, '/')
}

function normalizeImage<
  T extends { hero?: INovelaImage; avatar?: INovelaImage }
>(item: T): T {
  return item
}

export function normalizeSiteProps(raw: SitePropsYaml): SiteProps {
  const result: SiteProps = {
    ...raw,
    ...{
      blog: {
        ...raw.blog,
        authorsPage: !!raw.blog.authorsPage,
        mailchimp: !!raw.blog.mailchimp,
        pageLength: raw.blog.pageLength || 6,
        rootPath: '/',
        copyrightYear: raw.blog.copyrightYear
      }
    }
  }

  return result
}
