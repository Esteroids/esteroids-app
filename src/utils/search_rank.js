import EnsSite from './ens_sites.js'

const RANK = {
  NAME: { EXACT: 2, PARTIAL: 1 },
  DESCRIPTION: { EXACT: 4, PARTIAL: 2 },
  TITLE: { EXACT: 8, PARTIAL: 4 },
}

const MATCH_BY = Object.keys(RANK)

const stemAndCleanTerm = (term) => {
  return term.replaceAll(/\s\s*/g, ' ').trim().toLowerCase()
}

const getSearchRank = (site, searchTerm) => {
  let rank = 0

  searchTerm = stemAndCleanTerm(searchTerm)

  let multiWords
  multiWords = false
  let words
  if (searchTerm.indexOf(' ') !== -1) {
    multiWords = true
    words = searchTerm.split(' ')
  }

  for (var i in MATCH_BY) {
    let cleaned_str = site[EnsSite[MATCH_BY[i]]].toLowerCase()
    if (cleaned_str.indexOf(searchTerm) !== -1) {
      rank += RANK[MATCH_BY[i]].EXACT
    } else {
      if (multiWords === true) {
        let matched_all_words = words.every(function (element) {
          return cleaned_str.indexOf(element) !== -1
        })

        if (matched_all_words) {
          rank += RANK[MATCH_BY[i]].PARTIAL
        }
      }
    }
  }

  return rank
}

export default getSearchRank
