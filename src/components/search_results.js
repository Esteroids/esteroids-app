import { dwebData } from "../data/ens_dict.js";
import SiteCard from "./site_card";
import React, { useState } from "react";
import {useLocation} from "react-router-dom";
import getSearchRank from '../utils/search_rank';
import { Helmet } from 'react-helmet'
import titleHandler from '../utils/page_title'


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


function SearchNFTPlaceholder(){
  return (
            <div className="col-md-3 v-100">
              <div className="NFTW-search-results d-flex flex-column justify-content-center align-items-center">
                <img className="card-img" src="./images/NFTW_placeholder.jpg" alt=""/>
                <div className="card-site-name"> This belongs to YOU! </div>
              </div>
            </div>);
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
          {SearchNFTPlaceholder()}
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


function SearchResults({originUrl}){

    const [currentResultsShown, setCurrentResultsShown] = useState(DEFAULT_SEARCH_RESULTS_NUMBER);
    let location = useLocation();
    let searchTerm = new URLSearchParams(location.search).get('term');

    const search_results = searchResults(searchTerm, dwebData['sites']);

    let resultsShown = Math.min(Math.max(DEFAULT_SEARCH_RESULTS_NUMBER, currentResultsShown), search_results.length);
    if (resultsShown!==currentResultsShown){
      setCurrentResultsShown(resultsShown);
    }
    


    const pageHeaderTitle = (<Helmet>
      <title>{titleHandler.getSearchTitle(searchTerm)}</title>
    </Helmet>)

    
    return (
      <div className="container">
        {pageHeaderTitle}
        <SearchResultsDetails totalResults = {search_results.length} searchTerm = {searchTerm}/>
        <Cards searchTerm = {searchTerm} searchResults={search_results} currentResultsShown={currentResultsShown} originUrl={originUrl} />
        <LoadMore totalResults={search_results.length} currentResultsShown={currentResultsShown}  setCurrentResultsShown={setCurrentResultsShown}/> 
      </div>
    );
}

export default SearchResults;