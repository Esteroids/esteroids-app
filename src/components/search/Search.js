import getSearchRank from '../../utils/search_rank'
import { searchByNameLength, isNameLengthSearch, getNameLengthSearched } from './SearchByNameLen'

const SEARCH_TYPE = {
  REGULAR: 1,
  BY_LENGTH: 2,
}

const getSearchType = (searchTerm) => {
  if (isNameLengthSearch(searchTerm)) {
    return SEARCH_TYPE.BY_LENGTH
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

const searchResultsUtils = (searchTerm, sites) => {
  const searchType = getSearchType(searchTerm)
  let results

  switch (searchType) {
    case SEARCH_TYPE.BY_LENGTH:
      results = searchByNameLength(sites, getNameLengthSearched(searchTerm))
      break
    case SEARCH_TYPE.REGULAR:
    default:
      results = filterResults(searchTerm, sites)
    // code block
  }
  return results
}

export { searchResultsUtils }
