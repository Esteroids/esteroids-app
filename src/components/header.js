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
        <img className="navbar-brand h-100 d-none d-xl-block" src="./images/logo.svg" alt="Esteroids logo and tagline"/>
      </Link>

      <Link to={'/'}>
        <img className="navbar-brand h-100 d-xl-none d-xxl-none" src="./images/logo.svg" alt="Esteroids logo and tagline"/>
      </Link>

      
      <form id="search-bar"  onSubmit={handleSearch} className={'navbar-nav w-45 navbar-collapse collapse search-bar '+(menuOpen&&' show pt-2')||''}>
        <div className="input-group mb-3 search-icon">
          <input type="text" className="form-control searchbox" placeholder="Search dWebsites" value={props.searchTerm} onChange={event => {
                    props.setSearchTerm(event.target.value)
                }}
                aria-label="Search dWebsites" aria-describedby="basic-addon2"/>

          <div className="input-group-append">
            <button type="submit" id="basic-addon2" className="input-group-text search-button">
              <img src="./images/search.svg" className="search-icon" alt="Search icon"/>
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

const NavBarLink = React.forwardRef((props, ref) => (
  <a ref={ref} {...props}> {props.children}</a>
))



function NavBarItemMainPage(props){
  let class_list = "nav-link" 
  if (props.menuOpen){
    class_list += ' nav-link-collapsed'
  }
  return (
    <li className="nav-item">
      <Link to={props.value.link} component={NavBarLink} className={class_list} >{props.value.label}
        <i className="green_dropdown_arrow"/>
      </Link>
    </li>
  )
}

const MAIN_NAV_BAR_SOCIAL_ITEMS = [
  { link: "https://discord.gg/9c2EWzjFzY", class: "discord-icon"},
  { link: "https://twitter.com/e_steroids", class: "twitter-icon"}
];

function NavBarMainPage(props){
  
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar navbar-expand-xl flex-grow-0">
       <Link to={'/'}>
         <img className="navbar-brand" src="./images/logo.svg" alt="Esteroids logo and tagline"/>
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
                            <NavBarItemMainPage key={index} value={menu_item} menuOpen={menuOpen} />
                        ))}
          {
          !menuOpen && MAIN_NAV_BAR_SOCIAL_ITEMS.map((menu_item, index) => (
            <li className="nav-item" key={'social' + index.toString()}>
              <a href={menu_item.link} target="_blank" rel="noreferrer"  className={ "nav-link" + ((menuOpen && " nav-link-collapsed") || "")}>
                <div className={menu_item.class} />
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