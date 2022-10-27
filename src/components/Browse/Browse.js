import React, { useState, useEffect } from 'react'
import Cards from '../Cards/Cards.js'
import CategoryTags from '../tags/CategoryTags.js'
import RegularTags from '../tags/RegularTags.js'
import { searchResultsUtils } from '../search/Search.js'

import useSitesData from '../hooks/useSitesData.js'
import { TAG_SEARCH_TERMS } from '../constants/tags.js'
import { DEFAULT_NUMBER_OF_CARDS, LOAD_MORE_CARDS } from '../constants/browse.js'
import ShowMoreBtn from './ShowMoreBtn.js'

import LoadingEsteroidsIcon from '../Svgs/LoadingEsteroidsIcon.js'
function getTagDwebsites(tag, allDwebsite) {
  let websites = searchResultsUtils(tag, allDwebsite)
  const otherSearchTerms = TAG_SEARCH_TERMS[tag]
  if (otherSearchTerms) {
    for (const searchTerm of otherSearchTerms) {
      websites.concat(searchResultsUtils(searchTerm, allDwebsite))
    }
    websites = [...new Set(websites)]
  }

  return websites
}

const isCategoryTag = (category) => category.indexOf('tag/') !== -1

function getDwebsites(category, dwebData) {
  const categoryData = (category === 'hot' && 'popular') || category
  let websites
  if (isCategoryTag(category)) {
    const tag = category.replace('tag/', '')
    websites = getTagDwebsites(tag, dwebData['sites'])
  } else {
    websites = dwebData[categoryData]
  }
  return websites
}

const Browse = (props) => {
  const category = props.category
  const [categoryWebsites, setCategoryWebsites] = useState([])
  const [currCardShown, setCurrCardShown] = useState(0)
  const { dwebData, isLoading } = useSitesData()

  const showLoadMore = categoryWebsites && currCardShown < categoryWebsites.length

  useEffect(() => {
    if (!isLoading && dwebData) {
      const newWebsites = getDwebsites(category, dwebData)
      setCategoryWebsites(newWebsites)
      setCurrCardShown(Math.min(DEFAULT_NUMBER_OF_CARDS, newWebsites.length))
    }
  }, [category, isLoading, dwebData])

  const handleLoadModeClick = () => {
    const new_cards_number = Math.min(currCardShown + LOAD_MORE_CARDS, categoryWebsites.length)
    setCurrCardShown(new_cards_number)
  }

  if (isLoading || !categoryWebsites) {
    return (
      <div className='f-flex flex-row justify-content-center' id='browse_sites'>
        <LoadingEsteroidsIcon />
      </div>
    )
  }

  return (
    <div className='expanded-container' id='browse_sites'>
      <div className='row'>
        <div className='col-sm-12 category-navbar'>
          <CategoryTags category={category} />
          <RegularTags category={category} />
        </div>
      </div>

      <Cards
        hotCategory={category === 'hot'}
        websites={categoryWebsites}
        cards_number={currCardShown}
        defaultGatway={props.defaultGatway}
      />
      <ShowMoreBtn show={showLoadMore} handleLoadModeClick={handleLoadModeClick} />
    </div>
  )
}

export default Browse
