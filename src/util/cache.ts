import fs from 'fs'
import { promisify } from 'util'
import path from 'path'

export const readFile = promisify(fs.readFile)
export const writeFile = promisify(fs.writeFile)
const CACHE_PREFIX = path.resolve('.cache_id')

export async function putCache<T>(data: T, key: string) {
  try {
    await writeFile(`${CACHE_PREFIX}_key`, JSON.stringify(data), 'utf8')
  } catch (_) {
    /* not fatal */
  }
}

export async function getCache<T>(key: string): Promise<T> {
  let data: T

  try {
    data = JSON.parse(await readFile(`${CACHE_PREFIX}_key`, 'utf8'))
  } catch (_) {
    /* not fatal */
  }

  return data
}
