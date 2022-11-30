import { dwebData } from '../data/ens_dict.js'
import SiteCard from './SiteCard/SiteCard'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { searchResultsUtils } from './search/Search.js'
import { Helmet } from 'react-helmet'
import titleHandler from '../utils/page_title'
import { useAnalyticsContext } from './contexts/Analytics.js'

import SearchWNFTPlacement from './wnft/SearchWNFTPlacement.js'
import SearchResultsDescription from './SearchResults/SearchResultsDescription.js'

import { DEFAULT_SEARCH_RESULTS_NUMBER, LOAD_MORE_SEARCH_RESULTS_NUMBER } from './constants/search.js'

function Cards(props) {
  var cards = []
  for (let i = 0; i < props.currentResultsShown; i++) {
    cards.push(
      <SiteCard
        key={i}
        location='search_results'
        site={dwebData['sites'][props.searchResults[i]]}
        defaultGatway={props.defaultGatway}
      />,
    )
  }

  return (
    <div>
      <div className='row cards row w-100 d-flex p-0'>
        <div className='col-md-9'>
          <div className='row'>{cards}</div>
          <LoadMore
            totalResults={props.searchResults.length}
            currentResultsShown={props.currentResultsShown}
            setCurrentResultsShown={props.setCurrentResultsShown}
          />
        </div>
        <SearchWNFTPlacement />
      </div>
    </div>
  )
}

const LoadMore = ({ totalResults, currentResultsShown, setCurrentResultsShown }) => {
  if (totalResults > currentResultsShown) {
    return (
      <div className='text-center load-more-div'>
        <button
          type='button'
          className='btn btn-outline-secondary load-more-btn'
          onClick={() => {
            setCurrentResultsShown(Math.min(currentResultsShown + LOAD_MORE_SEARCH_RESULTS_NUMBER, totalResults))
          }}
        >
          Load More
        </button>
      </div>
    )
  } else {
    return null
  }
}

function SearchResults({ defaultGatway }) {
  const [currentResultsShown, setCurrentResultsShown] = useState(DEFAULT_SEARCH_RESULTS_NUMBER)
  let location = useLocation()
  let searchTerm = new URLSearchParams(location.search).get('term')
  const add = useAnalyticsContext()

  useEffect(() => {
    if (searchTerm) {
      const eType = 'search'
      const meta = { searchTerm, host: window.location && window.location.host }
      add({ eType, meta })
    }
  }, [searchTerm, add])

  const search_results = searchResultsUtils(searchTerm, dwebData['sites'])

  let resultsShown = Math.min(Math.max(DEFAULT_SEARCH_RESULTS_NUMBER, currentResultsShown), search_results.length)
  if (resultsShown !== currentResultsShown) {
    setCurrentResultsShown(resultsShown)
  }

  let newTitle = titleHandler.getSearchTitle(searchTerm)
  const pageHeaderTitle = (
    <Helmet>
      <title>{newTitle}</title>
      <meta name='twitter:title' content={newTitle} />
      <meta property='og:title' content={newTitle} />
    </Helmet>
  )

  return (
    <div className='container'>
      {pageHeaderTitle}
      <SearchResultsDescription totalResults={search_results.length} searchTerm={searchTerm} />
      <Cards
        searchTerm={searchTerm}
        searchResults={search_results}
        currentResultsShown={currentResultsShown}
        defaultGatway={defaultGatway}
        setCurrentResultsShown={setCurrentResultsShown}
      />
    </div>
  )
}

export default SearchResults
