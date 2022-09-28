import {isNameLengthSearch} from "../search/SearchByNameLen";
import SearchResultsDescriptionNameLen from "./SearchResultsDescriptionNameLen";

function SearchResultsDescription(props) {
    if (isNameLengthSearch(props.searchTerm)){
        return (<SearchResultsDescriptionNameLen totalResults={props.totalResults} searchTerm={props.searchTerm} />)
    }else{
        return (
        <div className="search-results">
            Returned <strong>{props.totalResults}</strong> results: <strong><span className="fst-italic">{props.searchTerm}</span></strong>
        </div>  
        )
        }
}

export default SearchResultsDescription;