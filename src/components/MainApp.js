import React, { useState, useEffect, useMemo } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Header from './header/Header'
import Footer from './footer'
import SearchResults from './search_results'
import PrivacyPolicy from './privacy_policy'
import About from './About/About'
import ScrollToTop from './scroll_to_top'
import LandingPage from './landing_page'
import Svgs from './Svgs/Svgs'
import { useAnalyticsContext } from './contexts/Analytics'
import EnsSite from '../utils/ens_sites'

const BROWSE_PATHS = ['/', '/hot', '/new', '/recent']

const MainApp = () => {
  const location = useLocation()
  const add = useAnalyticsContext()

  const [searchTerm, setSearchTerm] = useState('')
  const defaultGatway = useMemo(() => EnsSite.getGateway(window.location && window.location.href), [])

  useEffect(() => {
    const eType = 'page'
    const meta = {
      loc: (location.pathname || '') + (location.search || ''),
      host: window.location && window.location.host,
    }
    add({ eType, meta })
  }, [location?.pathname, location?.search, add])

  return (
    <>
      <Svgs />

      <Switch>
        <Route exact path={BROWSE_PATHS}>
          <LandingPage defaultGatway={defaultGatway} />
        </Route>
        <Route path='/search'>
          <ScrollToTop location={location} />
          <div className='container'>
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <SearchResults defaultGatway={defaultGatway} />
        </Route>
        <Route path='/privacy'>
          <div className='container'>
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <PrivacyPolicy />
        </Route>
        <Route path='/about'>
          <div className='container'>
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <About />
        </Route>
      </Switch>

      <Footer />
      <div className='bg-top'> </div>
      <div className='bg-bottom'> </div>
    </>
  )
}

export default MainApp
