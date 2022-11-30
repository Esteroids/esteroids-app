import { dwebData } from '../data/ens_dict.js'
import React from 'react'
import Cards from './Cards/Cards.js'
import CategoryTags from './tags/CategoryTags.js'
import RegularTags from './tags/RegularTags.js'
import { searchResultsUtils } from './search/Search.js'
import { TAG_SEARCH_TERMS } from './constants/tags.js'
import { DEFAULT_NUMBER_OF_CARDS, LOAD_MORE_CARDS } from './constants/browse.js'
import ShowMoreBtn from './browse/ShowMoreBtn.js'

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

function getDwebsites(category) {
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

class Browse extends React.Component {
  constructor(props) {
    super(props)
    this.state = { category: false, websites: [], cards_number: 0 }

    this.onCategoryChanged = this.onCategoryChanged.bind(this)
    this.onLoadMore = this.onLoadMore.bind(this)
  }

  onCategoryChanged(e) {
    const new_cat = e.target.value
    if (this.props.category !== new_cat) {
      this.props.setCategory(new_cat)
    }
  }

  onLoadMore() {
    let new_cards_number = parseInt(this.state.cards_number) + LOAD_MORE_CARDS
    if (new_cards_number >= this.state.websites.length) {
      new_cards_number = this.state.websites.length
      this.setState({ load_more: false })
    }

    this.setState({ cards_number: new_cards_number })
  }

  static getDerivedStateFromProps(props, state) {
    let load_more = true

    let cards_number = DEFAULT_NUMBER_OF_CARDS
    if (props.category !== state.category) {
      let websites = getDwebsites(props.category)
      if (websites.length <= cards_number) {
        load_more = false
        cards_number = websites.length
      }
      return { cards_number: cards_number, load_more: load_more, websites: websites, category: props.category }
    }

    return null
  }

  render() {
    const showLoadMore = this.state.load_more

    return (
      <div className='expanded-container' id='browse_sites'>
        <div className='row'>
          <div className='col-sm-12 category-navbar'>
            <CategoryTags category={this.props.category} />
            <RegularTags category={this.props.category} />
          </div>
        </div>

        <Cards
          hotCategory={this.props.category === 'hot'}
          websites={this.state.websites}
          cards_number={this.state.cards_number}
          defaultGatway={this.props.defaultGatway}
        />

        <ShowMoreBtn show={showLoadMore} handleLoadModeClick={this.onLoadMore} />
      </div>
    )
  }
}

export default Browse
