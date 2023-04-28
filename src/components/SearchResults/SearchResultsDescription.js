import { isNameLengthSearch } from '../search/SearchByNameLen'
import SearchResultsDescriptionNameLen from './SearchResultsDescriptionNameLen'
import UnmoderateToggle from './UnmoderateToggle'


function SearchResultsDescription(props) {
  if (isNameLengthSearch(props.searchTerm)) {
    return <SearchResultsDescriptionNameLen totalResults={props.totalResults} searchTerm={props.searchTerm} />
  } else {
    return (
      <div className='search-results d-flex'>
        <div className="p-2">
          Returned <strong>{props.totalResults}</strong> result{props.totalResults !== 1 ? 's' : ''}:{' '}
          <strong>
            <span className='fst-italic'>{props.searchTerm}</span>
          </strong>
          </div>
          <div className="ml-auto p-2">
            <UnmoderateToggle/>
          </div>
      </div>
    )
  }
}

export default SearchResultsDescription
