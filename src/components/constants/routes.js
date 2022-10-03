import { tagRoute } from '../utils/routeUtils'

export const MAIN_CATEGORIES = ['hot', 'new']
export const MAIN_TAGS = ['nft', 'dao', 'blog', 'defi', 'nimi', 'ens']

export const MAIN_PAGE_ROUTES = ['/']
  .concat(MAIN_CATEGORIES.map((x) => `/${x}`))
  .concat(MAIN_TAGS.map((x) => tagRoute(x)))
