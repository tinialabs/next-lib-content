export interface SitePropsYaml {
  title: string
  name: string
  siteUrl: string
  description: string
  hero: {
    url: string
    heading: string
    maxWidth: number
  }
  social: Array<{
    name: string
    url: string
  }>
  blog: {
    copyrightYear: string
    contentPosts: string
    contentAuthors: string
    basePath: string
    pathPosts: string
    pathAuthors: string
    authorsPage?: boolean
    mailchimp?: string
    pageLength?: number
    sources: {
      local: boolean
      contentful: boolean
    }
  }
  manifest: {
    name: string
    short_name: string
    start_url: string
    background_color: string
    theme_color: string
    display: string
    icon: string
  }
  googleAnalytics: {
    trackingId: string
  }
}

export interface LibSitePropsApi {
  getSiteProps: () => SitePropsYaml
}
