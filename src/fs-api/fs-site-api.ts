import fs from 'fs'
import { join, resolve } from 'path'

import yaml from 'js-yaml'
import type { LibSitePropsApi, SitePropsYaml } from '../types'

const dataDirectory = resolve(process.cwd(), './content/theme')

const getSiteProps: () => SitePropsYaml = () => {
  const fullPath = join(dataDirectory, 'site.yml')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return yaml.safeLoad(fileContents) as SitePropsYaml
}

export const fsSitePropsApi: LibSitePropsApi = {
  getSiteProps
}

export default fsSitePropsApi
