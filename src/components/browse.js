import { dwebData } from '../data/ens_dict.js'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Cards from './Cards/Cards.js'

const DEFAULT_NUMBER_OF_CARDS = 12
const LOAD_MORE_CARDS = 8

function getDwebsites(category) {
  const categoryData = (category === 'hot' && 'popular') || category
  let websites
  if (categoryData === 'all') {
    websites = Object.keys(dwebData['sites'])
  } else {
    websites = dwebData[categoryData]
  }
  return websites
}

function BrowseMenuSelect(props) {
  let history = useHistory()

  const handleCategory = (event) => {
    if (props.category !== event.target.value) {
      history.push({
        pathname: '/' + event.target.value,
      })
    }
  }
  return (
    <select
      className='category-select'
      id='category-select'
      value={props.category}
      onChange={(e) => {
        e.preventDefault()
        props.onCategoryChanged(e)
        handleCategory(e)
      }}
    >
      <option value='hot'>Hot</option>
      <option value='new'>New</option>
      <option value='recent'>Recently Updated</option>
    </select>
  )
}

function BrowseMenu(props) {
  if (props.size === 'l') {
    return (
      <div className='d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none'>
        <div className='container text-center'>
          <BrowseMenuSelect onCategoryChanged={props.onCategoryChanged} category={props.category} />
        </div>
      </div>
    )
  } else if (props.size === 's') {
    return (
      <div className='d-none d-sm-block'>
        <div className='container'>
          <BrowseMenuSelect onCategoryChanged={props.onCategoryChanged} category={props.category} />
        </div>
      </div>
    )
  } else {
    return null
  }
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
      <div className='container' id='browse_sites'>
        {!this.props.hideBrowseMenu && (
          <>
            <BrowseMenu size='l' onCategoryChanged={this.onCategoryChanged} category={this.props.category} />
            <BrowseMenu size='s' onCategoryChanged={this.onCategoryChanged} category={this.props.category} />
          </>
        )}

        <Cards
          websites={this.state.websites}
          cards_number={this.state.cards_number}
          defaultGatway={this.props.defaultGatway}
        />
        {showLoadMore && (
          <div className='text-center load-more-div'>
            <button type='button' onClick={this.onLoadMore} className='btn btn-outline-secondary load-more-btn'>
              Load More
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default Browse
