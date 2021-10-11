import { dwebData } from "../data/ens_dict.js";
import SiteCard from "./site_card";
import React from "react";
import {useHistory} from "react-router-dom";



const DEFAULT_NUMBER_OF_CARDS = 12;
const LOAD_MORE_CARDS = 8;

function Cards(props) {
  

  var cards = [];
  for (let i=0; i<props.cards_number; i++) {
    cards.push(<SiteCard  site = {dwebData['sites'][props.websites[i]]} key={i} originUrl={props.originUrl} />);
  }
  
  return (<div className="row" >
            {cards}
          </div>
      )
}


function shouldOrderRand(category){
  return (category === "popular")
}

function getDwebsites(category){
  let websites = dwebData[category] || (category==='all' && Object.keys(dwebData['sites']))
  if (shouldOrderRand(category)){
    websites = websites.sort(() => Math.random() - 0.5);
  }
  return websites;
}


function BrowseMenuSelect(props){
  let history = useHistory();

 const handleCategory = event =>{
    if (props.category!==event.target.value){
      history.push({
        pathname: '/' + event.target.value
      });
    }  
  }
  return ( <select className="category-select" id="category-select" 
              value={props.category} onChange={ e => {e.preventDefault();props.onCategoryChanged(e);handleCategory(e);}}>
            <option value="new">New</option>
            <option value="popular">Popular</option>
            <option value="recent">Recently Updated</option>
            <option value="all">All</option>
          </select>);

}

function BrowseMenu(props) {
  if (props.size === "l") {
    return (
        <div className="d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none">
          <div className="container text-center">
            
            <BrowseMenuSelect onCategoryChanged={props.onCategoryChanged} category={props.category} />
          </div>
      </div>
    );
  } else if (props.size === "s") {
      return (
        <div className="d-none d-sm-block">
          <div className="container">
          <BrowseMenuSelect onCategoryChanged={props.onCategoryChanged} category={props.category} />
          </div>
        </div>
      )
    } else {
      return (null)
    }
}



class Browse extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {category:false, websites: [], cards_number:0 };
    
    this.onCategoryChanged = this.onCategoryChanged.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
  }


  onCategoryChanged (e) {
    const new_cat = e.target.value;
    if (this.props.category!==new_cat){
      this.props.setCategory(new_cat);

    }
  }

  onLoadMore(e) {
    
    let new_cards_number = parseInt(this.state.cards_number) + LOAD_MORE_CARDS;
    if (new_cards_number >= this.state.websites.length) {
      new_cards_number = this.state.websites.length;
      this.setState({load_more: false});
    }

    this.setState({cards_number: new_cards_number});
  }

  

  static getDerivedStateFromProps(props, state) {
    
    let load_more = true;
    let cards_number = DEFAULT_NUMBER_OF_CARDS;
    if (props.category!==state.category){
    

      let websites = getDwebsites(props.category)
      if (websites.length <= cards_number) {
        load_more = false;
        cards_number = websites.length;
      }
      return {cards_number: cards_number, load_more: load_more, websites: websites, category: props.category};
    }

    return null;

  }

  render() { 

    
    let loadMoreButton;
    
    if (this.state.load_more) 
      loadMoreButton = "btn btn-outline-secondary load-more-btn";
    else
      loadMoreButton = "btn btn-outline-secondary load-more-btn invisible";

      

      return (
        <div className="container" id="browse_sites">

          <BrowseMenu size="l" onCategoryChanged={this.onCategoryChanged} category={this.props.category} />
          <BrowseMenu size="s" onCategoryChanged={this.onCategoryChanged} category={this.props.category} />

          <Cards websites={this.state.websites} cards_number = {this.state.cards_number} originUrl={this.props.originUrl} />
          <div className="text-center load-more-div">
            <button type="button" onClick={this.onLoadMore}
                    className={loadMoreButton}>Load More</button>
          </div>  
        </div>
      );
    }
}

export default Browse;