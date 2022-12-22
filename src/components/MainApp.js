import React, { useState, useEffect, useMemo } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Footer from './footer'
import SearchResults from './search_results'
import PrivacyPolicy from './privacy_policy'
import About from './About/About'
import LandingPage from './landing_page'
import Svgs from './Svgs/Svgs'
import { useAnalyticsContext } from './contexts/Analytics'
import EnsSite from '../utils/ens_sites'
import { MAIN_PAGE_ROUTES } from './constants/routes'
//import Snowfall from 'react-snowfall'

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
      {/* <Snowfall speed={[1.0, 2.0]} wind={[-0.5, 1]} radius={[0.5, 5.0]} /> */}
      <Switch>
        <Route exact path={MAIN_PAGE_ROUTES}>
          <LandingPage defaultGatway={defaultGatway} />
        </Route>
        <Route path='/search'>
          <SearchResults defaultGatway={defaultGatway} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Route>
        <Route path='/privacy'>
          <PrivacyPolicy searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Route>
        <Route path='/about'>
          <About searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Route>
      </Switch>

      <Footer />
      <div className='bg-top'> </div>
      <div className='bg-bottom'> </div>
    </>
  )
}

export default MainApp
