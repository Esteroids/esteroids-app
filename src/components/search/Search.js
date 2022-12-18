import getSearchRank from '../../utils/search_rank'
import { searchByNameLength, isNameLengthSearch } from './SearchByNameLen'
import { searchByEthName, isEthNameSearch } from './SearchByEthName'

const SEARCH_TYPE = {
  REGULAR: 1,
  BY_LENGTH: 2,
  BY_ETH_NAME: 3,
}

const getSearchType = (searchTerm) => {
  if (isNameLengthSearch(searchTerm)) {
    return SEARCH_TYPE.BY_LENGTH
  } else if (isEthNameSearch(searchTerm)) {
    return SEARCH_TYPE.BY_ETH_NAME
  } else {
    return SEARCH_TYPE.REGULAR
  }
}

const filterResults = (searchTerm, sites) => {
  let all_sites_search_rankings = sites.map((x, index) => {
    return { rank: getSearchRank(x, searchTerm), index: index }
  })

  //filter 0 rank (no matches)
  let positive_search_ranks = all_sites_search_rankings.filter(function (site_rank) {
    return site_rank['rank'] > 0
  })

  // sort results by rank
  positive_search_ranks.sort((a, b) => b.rank - a.rank)

  // we only need the names for browse results - maybe need optimization later
  let only_indexes_arr = positive_search_ranks.map((x) => x.index)

  return only_indexes_arr
}

const cleanSearchTerm = (searchTerm) => searchTerm.trim()

const searchResultsUtils = (searchTermRaw, sites) => {
  const searchTerm = cleanSearchTerm(searchTermRaw)
  const searchType = getSearchType(searchTerm)
  let results

  switch (searchType) {
    case SEARCH_TYPE.BY_LENGTH:
      results = searchByNameLength(sites, searchTerm)
      break
    case SEARCH_TYPE.BY_ETH_NAME:
      results = searchByEthName(sites, searchTerm)
      results = results.concat(filterResults(searchTerm, sites))
      results = [...new Set(results)]
      break
    case SEARCH_TYPE.REGULAR:
    default:
      results = filterResults(searchTerm, sites)
  }
  return results
}

export { searchResultsUtils }
