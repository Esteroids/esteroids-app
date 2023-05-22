import { useHistory } from 'react-router-dom'

function NavBarSearchForm({ searchTerm, location, setSearchTerm }) {
  let history = useHistory()

  const handleSearch = (event) => {
    event.preventDefault()

    if (searchTerm === '') return

    if (location.pathname !== '/search' || location?.search !== '?term=' + searchTerm) {
      history.push({
        pathname: '/search',
        search: '?term=' + searchTerm,
      })
    }
  }

  return (
    <form id='search-bar' onSubmit={handleSearch} className='search-bar '>
      <div className='input-group'>
        <input
          type='text'
          className='form-control searchbox ps-2'
          placeholder='Search dWebsites'
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value)
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
  )
}

export default NavBarSearchForm
