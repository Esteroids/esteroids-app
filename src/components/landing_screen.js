import React, { useState, useEffect } from 'react'
import Header from './header/Header'
import FeaturedPlacements from './LandingPage/FeaturedPlacements/FeaturedPlacements'
import { useHistory } from 'react-router-dom'

function MainSearchBar() {
  let history = useHistory()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (event) => {
    event.preventDefault()
    if (searchTerm !== '') {
      history.push({
        pathname: '/search',
        search: '?term=' + searchTerm,
      })
      setSearchTerm('')
    }
  }

  return (
    <form onSubmit={handleSearch}>
      <div className='input-group mt-4'>
        <input
          type='text'
          ref={(input) => input && input.focus()}
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value)
          }}
          className='form-control searchbox mainsearch'
          placeholder='Search dWebsites'
          aria-label='Search dWebsites'
          aria-describedby='basic-addon2'
        />
        <div className='input-group-append'>
          <button type='submit' className='input-group-text search-button' id='basic-addon2'>
            <svg version='2.0' alt='Search icon' height='40' width='40'>
              <use href='#search' />
            </svg>
          </button>
        </div>
      </div>
    </form>
  )
}

function MainSearchSpace(props) {
  return (
    <div className={props.classes}>
      <div className={props.landing_page_desc_classes}>A search engine for the decentralized web</div>

      <MainSearchBar />
    </div>
  )
}

const NFT_MAIN_CLASSES = {
  lxxl: 'col-xl-6 d-none d-xxl-block  my-auto',
  lgxl: 'col-lg-6 d-none d-lg-block d-xxl-none  my-auto',
  md: 'col-md-6 d-none d-sm-none d-md-block d-lg-none d-xl-none  d-xxl-none mw-50 my-auto',
  sm: 'col-md-6 d-none d-sm-block d-md-none d-lg-none d-xl-none  d-xxl-none mw-50 my-auto',
  nxs: 'col-6 d-none d-sm-block mw-50 my-auto',
}

function NFTMain({ screenSize, defaultGatway }) {
  return (
    <div className={NFT_MAIN_CLASSES[screenSize]}>
      <FeaturedPlacements defaultGatway={defaultGatway} size='reg' />
    </div>
  )
}

function SearchNFTMainXS({ defaultGatway }) {
  return (
    <div className='col-12 d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none mh-100 my-auto'>
      <MainSearchBar />
      <div className='text-center m-3'>
        <FeaturedPlacements defaultGatway={defaultGatway} size='sm' />
      </div>
    </div>
  )
}

function BrowseSitesHelper() {
  const [browseInView, setBrowseInView] = useState(false)

  useEffect(() => {
    var el = document.getElementById('browse_sites')

    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect()
      if (rect.top === 0 && rect.bottom === 0) {
        return false
      }
      return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top + 10 < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left + 10 < (window.innerWidth || document.documentElement.clientWidth)
      )
    }

    function onVisibilityChange(el, callback) {
      var old_visible
      return function () {
        var visible = isElementInViewport(el)
        if (visible !== old_visible) {
          old_visible = visible
          if (typeof callback === 'function') {
            callback(visible)
          }
        }
      }
    }

    const visibleSetTrue = setBrowseInView
    var handler = onVisibilityChange(el, function (visible) {
      visibleSetTrue(visible)
    })

    window.addEventListener('DOMContentLoaded', handler, false)
    window.addEventListener('load', handler, false)
    window.addEventListener('scroll', handler, false)
    window.addEventListener('resize', handler, false)

    return function cleanup() {
      window.removeEventListener('DOMContentLoaded', handler, false)
      window.removeEventListener('load', handler, false)
      window.removeEventListener('scroll', handler, false)
      window.removeEventListener('resize', handler, false)
    }
  }, [])

  let class_names = 'position-absolute bottom-0 w-95 text-center bounce btn mb-2'

  return (
    <>
      {!browseInView && (
        <div
          id='browse-more'
          className={class_names}
          onClick={() => {
            window.setTimeout(() => {
              const id = 'browse_sites'
              let element = document.getElementById(id)
              if (element) {
                element.scrollIntoView({ block: 'start', inline: 'center', behavior: 'smooth', alignToTop: true })
              }
            }, 200)
          }}
        >
          <svg width='21' height='21' version='2.0' fill='currentColor' alt='Browse dWebsites'>
            <use href='#black-arrow' />
          </svg>
          Browse dWebsites
        </div>
      )}
    </>
  )
}

const LandingScreen = ({ defaultGatway }) => {
  return (
    <div id='main-container' className='container d-flex flex-column vh-100 position-relative'>
      <Header />

      <div className='row main-section'>
        <MainSearchSpace
          classes='col-6 d-none d-sm-block mw-50 my-auto'
          landing_page_desc_classes='landing-page-description'
        />
        <NFTMain screenSize='nxs' defaultGatway={defaultGatway} />

        <SearchNFTMainXS defaultGatway={defaultGatway} />
      </div>
      <BrowseSitesHelper />
    </div>
  )
}

export default LandingScreen
