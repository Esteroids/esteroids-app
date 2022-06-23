import { dwebData } from "../data/ens_dict.js";
import SiteCard from "./site_card";
import React, { useState } from "react";
import {useLocation} from "react-router-dom";
import getSearchRank from '../utils/search_rank';
import { Helmet } from 'react-helmet'
import titleHandler from '../utils/page_title'

import SearchWnftPlacement from "./wnft/SearchWnftPlacement.js";


const DEFAULT_SEARCH_RESULTS_NUMBER = 12;
const LOAD_MORE_SEARCH_RESULTS_NUMBER = 6;



function SearchResultsDetails(props) {
  return (
    <div className="search-results">
        Returned {props.totalResults} results: <span className="search-results-terms">{props.searchTerm}</span>
    </div>  
  )
}


const searchResults = (searchTerm, sites) => {

  let all_sites_search_rankings = sites.map( (x, index) => { return {'rank': getSearchRank(x, searchTerm), 'index': index }});

  //filter 0 rank (no matches)
  let positive_search_ranks = all_sites_search_rankings.filter(function(site_rank) {
    return ( 
            site_rank['rank']>0
          )
  });

  // sort results by rank
  positive_search_ranks.sort((a, b) =>  b.rank - a.rank);

  // we only need the names for browse results - maybe need optimization later
  let only_indexes_arr = positive_search_ranks.map(x => x.index);

  return only_indexes_arr;

}




function Cards(props) {

  var cards = [];
  for (let i=0; i<props.currentResultsShown; i++) {
    cards.push(<SiteCard key={i} location="search_results" site = {dwebData['sites'][props.searchResults[i]]} originUrl={props.originUrl} />);
  }

  return (
      <div>
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              { cards }
            </div>
          </div>
          <SearchWnftPlacement searchTerm={props.searchTerm} ipfs={props.ipfs} isIpfsReady={props.isIpfsReady} />
        </div>
      </div>
      )
}


const LoadMore = ({totalResults, currentResultsShown, setCurrentResultsShown}) => {
    if (totalResults>currentResultsShown){
      return (
      <div className="text-center load-more-div">
          <button type="button" className="btn btn-outline-secondary load-more-btn" onClick={() => {
                    setCurrentResultsShown(Math.min(currentResultsShown+LOAD_MORE_SEARCH_RESULTS_NUMBER, totalResults))
                }}>Load More</button>
      </div>
      )
    }else{
      return (null)
    }
}


function SearchResults(props){

    const [currentResultsShown, setCurrentResultsShown] = useState(DEFAULT_SEARCH_RESULTS_NUMBER);
    let location = useLocation();
    let searchTerm = new URLSearchParams(location.search).get('term');

    const search_results = searchResults(searchTerm, dwebData['sites']);

    let resultsShown = Math.min(Math.max(DEFAULT_SEARCH_RESULTS_NUMBER, currentResultsShown), search_results.length);
    if (resultsShown!==currentResultsShown){
      setCurrentResultsShown(resultsShown);
    }
    

    let newTitle = titleHandler.getSearchTitle(searchTerm)
    const pageHeaderTitle = (<Helmet>
      <title>{newTitle}</title>
      <meta name="twitter:title" content={newTitle} />
      <meta property="og:title" content={newTitle} />
    </Helmet>)

    
    return (
      <div className="container">
        {pageHeaderTitle}
        <SearchResultsDetails totalResults = {search_results.length} searchTerm = {searchTerm}/>
        <Cards searchTerm={searchTerm} searchResults={search_results} currentResultsShown={currentResultsShown} originUrl={props.originUrl} ipfs={props.ipfs} isIpfsReady={props.isIpfsReady} />
        <LoadMore totalResults={search_results.length} currentResultsShown={currentResultsShown}  setCurrentResultsShown={setCurrentResultsShown}/> 
      </div>
    );
}

export default SearchResults;