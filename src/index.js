import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

/* CSS files */
import "./css/bootstrap.min.css"
import "./css/bevellier.css"
import "./css/alpino.css"
import "./css/main.css";
/* end of CSS files */

import Header from "./components/header";
import Footer from "./components/footer";
import SearchResults from "./components/search_results"
import PrivacyPolicy from "./components/privacy_policy"
import About from "./components/about"
import ScrollToTop from "./components/scroll_to_top";
import LandingPage from "./components/landing_page";
import Svgs from "./components/Svgs/Svgs";


const BROWSE_PATHS = ["/", "/popular", "/new", "/recent", "/all"]

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [originUrl, setOriginUrl] = useState('');

    useEffect(() => {  
        let url_local = window?.location?.href
        setOriginUrl(url_local);    
    }, [])
    
    
    return (
    <Router basename="/">
        <Svgs />
        <ScrollToTop />
        <Switch>
            <Route exact path={BROWSE_PATHS}>
                <LandingPage originUrl={originUrl} />
            </Route>
            <Route path="/search">
                <ScrollToTop />
                <div className="container">
                    <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                <SearchResults originUrl={originUrl} />
            </Route>
            <Route path="/privacy">
                <ScrollToTop />
                <div className="container">
                    <Header  searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </div>
                <PrivacyPolicy/>
            </Route>
            <Route path="/about">
                <ScrollToTop/>
                <div className="container">
                    <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </div>
                <About/>
            </Route>
        </Switch>

        <Footer/>
        <div className="bg-top"> </div>
        <div className="bg-bottom"> </div>
              
    </Router>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));