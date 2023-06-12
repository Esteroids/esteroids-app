import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Navbar from './Navbar'
import titleHandler from '../../utils/page_title'

function Header() {
  let location = useLocation()

  let pageHeaderTitle = null
  // search page will get special update
  if (!location?.pathname || (location?.pathname && location.pathname !== '/search')) {
    let newTitle = titleHandler.getTitle(location)
    pageHeaderTitle = (
      <Helmet>
        <title>{newTitle}</title>
        <meta name='twitter:title' content={newTitle} />
        <meta property='og:title' content={newTitle} />
      </Helmet>
    )
  }

  return (
    <>
      {pageHeaderTitle}
      <Navbar location={location} />
    </>
  )
}

export default Header
