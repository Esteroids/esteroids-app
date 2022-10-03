import React, { useState } from 'react'
import NavBarMainPage from './NavBarMainPage'
import NavBarSecondaryPage from './NavBarSecondaryPage'
import { MAIN_PAGE_ROUTES } from '../constants/routes'

function Navbar(props) {
  const home = MAIN_PAGE_ROUTES.indexOf(props.location.pathname) !== -1 ? true : false
  let initSearchTerm = new URLSearchParams(props.location && props.location.search).get('term')
  if (!initSearchTerm) {
    initSearchTerm = ''
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [oldLocationPathname, setOldLocationPathname] = useState('')

  if (initSearchTerm !== searchTerm && oldLocationPathname !== props.location.pathname) {
    setSearchTerm(initSearchTerm)
    setOldLocationPathname(props.location.pathname)
  }

  if (home) {
    return <NavBarMainPage />
  } else {
    return <NavBarSecondaryPage location={props.location} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
  }
}

export default Navbar
