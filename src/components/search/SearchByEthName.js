import EnsSite from '../../utils/ens_sites'

const ethNameSearchRE = /^(\S+)\.eth(?:\.\S+)?$/i

const getEthName = (searchTerm) => {
  const res = searchTerm.match(ethNameSearchRE)
  if (res && res.length > 1) {
    return res[1].toLowerCase()
  }
}

export const searchByEthName = (sites, searchTerm) => {
  const ethName = getEthName(searchTerm)
  const results = sites.reduce(function (result, site, siteIndex) {
    const siteName = site[EnsSite['NAME']]
    if (siteName === ethName) {
      return result.concat(siteIndex)
    }
    return result
  }, [])

  return results
}

export const isEthNameSearch = (searchTerm) => ethNameSearchRE.test(searchTerm)
