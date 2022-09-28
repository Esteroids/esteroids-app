import {Link, useHistory} from "react-router-dom";
import ThemeToggle from "../Theme/ThemeToggle";
import Web3Button from "./ConnectButton";


function NavBarSecondaryPage(props){
  
  
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
      <nav className="navbar navbar-expand-xl h-100 navbar-secondary d-flex flex-row align-items-center justify-content-center justify-content-md-start">
        <div className="navbar-brand h-100 d-none d-xl-block">
          <Link to={'/'} className="navbar-brand h-100 d-none d-xl-block">
            <svg className="navbar-brand h-100" width="161" height="44" version="2.0" alt="Esteroids logo">
              <use href="#esteroids-logo" />
            </svg>
          </Link>
        </div>
  
        <div className="d-xl-none d-xxl-none mr-2">
          <Link to={'/'} className="  d-xl-none d-xxl-none  h-100">
            <svg className="d-xl-none d-xxl-none  h-100" height="44" width="44" version="2.0" alt="Esteroids logo">
              <use href="#esteroids" />
            </svg>
          </Link>
        </div>
        <div className="d-none d-xl-block mx-2">
          <ThemeToggle />
        </div>
        
        <div>
          <form id="search-bar"  onSubmit={handleSearch} className='search-bar '>
            <div className="input-group">
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
        </div>
        <div>
            <Web3Button />
        </div>
  
      </nav>
    )
  }

export default NavBarSecondaryPage;