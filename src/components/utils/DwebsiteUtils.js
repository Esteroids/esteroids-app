import { dwebData } from '../../data/ens_dict.js'

export const siteNameToIndexes = (siteNames) => {
  let sites_dict = {}
  for (let i in siteNames) {
    sites_dict[siteNames[i]] = true
  }
  return dwebData['sites'].map((site, index) => (site.n && sites_dict[site.n] && index) || -1).filter((v) => v !== -1)
}
