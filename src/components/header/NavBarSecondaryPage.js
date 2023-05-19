import { useHistory } from 'react-router-dom'

import ThemeToggle from '../Theme/ThemeToggle'
import Web3Button from './ConnectButton'
import Logo from './Logo'

function NavBarSecondaryPage(props) {
  let history = useHistory()

  const handleSearch = (event) => {
    event.preventDefault()

    if (props.searchTerm === '') return

    if (props.location.pathname !== '/search' || props.location?.search !== '?term=' + props.searchTerm) {
      history.push({
        pathname: '/search',
        search: '?term=' + props.searchTerm,
      })
    }
  }

  return (
    <nav className='navbar navbar-expand-xl h-100 navbar-secondary d-flex flex-row align-items-center justify-content-center justify-content-md-start'>
      <Logo />
      <ThemeToggle />

      <div>
        <form id='search-bar' onSubmit={handleSearch} className='search-bar '>
          <div className='input-group'>
            <input
              type='text'
              className='form-control searchbox ps-2'
              placeholder='Search dWebsites'
              value={props.searchTerm}
              onChange={(event) => {
                props.setSearchTerm(event.target.value)
              }}
              aria-label='Search dWebsites'
              aria-describedby='basic-addon2'
            />

            <div className='input-group-append'>
              <button type='submit' id='basic-addon2' className='input-group-text search-button'>
                <svg version='2.0' className='search-icon' alt='Search icon'>
                  <use href='#search' />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='ms-auto'>
        <Web3Button />
      </div>
    </nav>
  )
}

export default NavBarSecondaryPage
