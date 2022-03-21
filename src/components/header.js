import React, {useState} from "react";
import { Helmet } from 'react-helmet'
import titleHandler from '../utils/page_title'
import {Link, useHistory, useLocation} from "react-router-dom";

const MAIN_ROUTES = ["/", "/popular", "/new", "/recent", "/all"]

function Navbar(props) {
  const home = (MAIN_ROUTES.indexOf(props.location.pathname)!==-1) ? true : false
  let initSearchTerm = new URLSearchParams(props?.location?.search).get("term");
  if (!initSearchTerm){
    initSearchTerm = ''
  }
  
  const [searchTerm, setSearchTerm] = useState('');
  const [oldLocationPathname, setOldLocationPathname] = useState('');

  if (initSearchTerm!==searchTerm&&oldLocationPathname!==props.location.pathname){
    setSearchTerm(initSearchTerm);
    setOldLocationPathname(props.location.pathname);
  }

  if (home) {
    return <NavBarMainPage/>
  } else {
    return <NavBarSecondaryPage location={props.location} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
  }
}

function NavBarSecondaryPage(props){
  const menuOpen = true;
  
  

  let history = useHistory();

  const handleSearch = event =>{
      event.preventDefault();

      if (props.searchTerm === "")
          return;

      if (props.location.pathname!=='/search' || props.location?.search!==('?term=' + props.searchTerm)){
        history.push({
          pathname: '/search',
          search: '?term='+props.searchTerm
        });
      } 
  }

  return (
    <nav className="navbar navbar-expand-xl h-100 navbar-secondary">
      <Link to={'/'}>
        <svg className="navbar-brand h-100 d-none d-xl-block" width="161" height="44" version="2.0" alt="Esteroids logo">
          <use href="#esteroids-logo" />
        </svg>
      </Link>

      <Link to={'/'}>
        <svg className="navbar-brand h-100 d-xl-none d-xxl-none" width="161" height="44" version="2.0" alt="Esteroids logo">
          <use href="#esteroids-logo" />
        </svg>
      </Link>

      
      <form id="search-bar"  onSubmit={handleSearch} className={'navbar-nav w-45 navbar-collapse collapse search-bar '+(menuOpen&&' show pt-2')||''}>
        <div className="input-group mb-3">
          <input type="text" className="form-control searchbox" placeholder="Search dWebsites" value={props.searchTerm} onChange={event => {
                    props.setSearchTerm(event.target.value)
                }}
                aria-label="Search dWebsites" aria-describedby="basic-addon2"/>

          <div className="input-group-append">
            <button type="submit" id="basic-addon2" className="input-group-text search-button">
              <svg version="2.0" className="search-icon" alt="Search icon">
                <use href="#search" />
              </svg>
            </button>
          </div>
        </div>
      </form>

    </nav>
  )
}

const MAIN_NAV_BAR_ITEMS = [ 
  {label: 'New', link: '/new', id: 'nav-link-1'},
  {label: 'Popular', link: '/popular', id: 'nav-link-2'},
  {label: 'Recently Updated', link: '/recent', id: 'nav-link-3'}, 
  {label: 'All', link: '/all', id: 'nav-link-4'}
];

const MAIN_NAV_BAR_SOCIAL_ITEMS = [
  { link: "https://twitter.com/dwebsitesbot", class: "twitter-icon", altLabel: "Latest dWebsites bot", svgId: 'robot'},
  { link: "https://discord.gg/9c2EWzjFzY", class: "discord-icon", altLabel: "Our Discord", svgId: 'discord'},
  { link: "https://twitter.com/e_steroids", class: "twitter-icon", altLabel: "Our Twitter", svgId: 'twitter'},
];

function NavBarItemMainPage(props){
  let class_list = "nav-link" 
  if (props.menuOpen){
    class_list += ' nav-link-collapsed'
  }
  return (
    <li className="nav-item">
      <Link to={props.item.link} className={class_list} >{props.item.label}
        <svg version="2.0" alt="" className="green_dropdown_arrow">
          <use href="#green-arrow" />
        </svg>
      </Link>
    </li>
  )
}

function NavBarMainPage(props){
  
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar navbar-expand-xl flex-grow-0">
       <Link to={'/'}>
         <svg className="navbar-brand" width="161" height="44" version="2.0" alt="Esteroids logo">
            <use href="#esteroids-logo" />
          </svg>
       </Link>

      <button className="navbar-toggler navbar-toggler-right collapsed" 
        type="button" data-bs-toggle="collapse" data-bs-target="#navb" 
        aria-expanded="false" onClick={()=>{ 
          setMenuOpen(!menuOpen);
          }}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div id="navb" className={ 'navbar-collapse collapse order-3'+(menuOpen&&' show')||'' }>
        <ul className="navbar-nav ms-auto">
          {MAIN_NAV_BAR_ITEMS.map((menu_item, index) => (
                            <NavBarItemMainPage key={index} item={menu_item} menuOpen={menuOpen} />
                        ))}
          
          {!menuOpen && MAIN_NAV_BAR_SOCIAL_ITEMS.map((menu_item, index) => (
            <li className="nav-item" key={'social' + index.toString()}>
              <a href={menu_item.link} target="_blank" rel="noreferrer"  className={ "nav-link" + ((menuOpen && " nav-link-collapsed") || "")}>
                <svg width="24" height="24" version="2.0" fill="currentColor" alt={menu_item.altLabel}>
                    <use href={"#" + menu_item.svgId} />
                  </svg>
              </a>
            </li>
          ))}
          
        </ul>
      </div> {/*-- navb */}
    </nav>
  )
 
}



function Header(){

  let location = useLocation();

  let pageHeaderTitle = null;
  // search page will get special update
  if (!(location?.pathname) || (location?.pathname && location.pathname!=='/search')){
    pageHeaderTitle = (<Helmet>
      <title>{titleHandler.getTitle(location)}</title>
    </Helmet>)
  }

  return ( 
  <>
    {pageHeaderTitle}
    <Navbar location={location} />
  </>
  )

}


export default Header;
