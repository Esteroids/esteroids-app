import { tagRoute } from '../utils/routeUtils'
import { TAGS } from './tags'

export const MAIN_CATEGORIES = ['hot', 'new']

export const MAIN_TAGS = TAGS.map((x) => x.url)

export const MAIN_PAGE_ROUTES = ['/']
  .concat(MAIN_CATEGORIES.map((x) => `/${x}`))
  .concat(MAIN_TAGS.map((x) => tagRoute(x)))
