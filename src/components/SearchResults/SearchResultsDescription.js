import ReactTooltip from 'react-tooltip'

import { isNameLengthSearch } from '../search/SearchByNameLen'
import SearchResultsDescriptionNameLen from './SearchResultsDescriptionNameLen'
import UnmoderateToggle from './UnmoderateToggle'

import questionMark from '../../images/svg/questionMarkInCircularShape.svg'

function SearchResultsDescription(props) {
  if (isNameLengthSearch(props.searchTerm)) {
    return <SearchResultsDescriptionNameLen totalResults={props.totalResults} searchTerm={props.searchTerm} />
  } else {
    return (
      <div className='search-results d-flex'>
        <div className="p-3">
          <strong>{props.totalResults}</strong> result{props.totalResults !== 1 ? 's' : ''}
          </div>
          <div className="ml-auto py-3 px-2">
            <UnmoderateToggle/>

            <a data-tip data-for='happyFace'> <img src={questionMark}/> </a>
            <ReactTooltip id='happyFace'>
              <p>Switches between moderated and unmoderated search results. </p> 
              <p> Unmoderated search contain more results but may be less safe.</p>
            </ReactTooltip> 
          </div>
      </div>
    )
  }
}

export default SearchResultsDescription
