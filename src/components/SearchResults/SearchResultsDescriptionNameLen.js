import { getNameLengthSearched } from '../search/SearchByNameLen'

const SearchResultsDescriptionNameLen = (props) => {
  const nameLength = getNameLengthSearched(props.searchTerm)
  return (
    <div className='search-results'>
      Returned <strong>{props.totalResults}</strong> results with{' '}
      <strong>
        <span className='fst-italic'>ENS name length equal {nameLength}</span>
      </strong>
    </div>
  )
}

export default SearchResultsDescriptionNameLen
