import React from "react";
import EnsSite from "../utils/ens_sites";

// include the placeholder in build
import DEFAULT_PLACEHOLDER from '../images/logo_placeholder.png';



function isFirst(check) {
    const first = check ? "card-upper-rect-first-row-search-results" : "";

    return first;
}

class SiteCard extends React.Component{


    getScreenshotUrl(){ 
        
           
        let screenshot_url = EnsSite.getScreenshotUrl(this.props.site);
        if (screenshot_url===''){
            return DEFAULT_PLACEHOLDER;
        }else{
            return screenshot_url;
        }
    }

    getLink(){
        return EnsSite.getExternalLink(this.props.site[EnsSite.NAME], this.props.originUrl);
    }

    
    getAddress() {
        return EnsSite.getDisplaySiteName(this.props.site[EnsSite.NAME]);
    }


    getColumnSize(location) {
        if (location === "search_results") 
            return 'col-xl-4 col-lg-6 col-md-6 d-flex justify-content-center';
        else 
            return 'col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center';
    }

    render(){

        return(
            <div className={this.getColumnSize(this.props.location)}>
                <div className="card-esteroids">
                    <div className={"card-upper-rect " + isFirst(this.props.first) + " d-flex flex-column justify-content-center align-items-center"}>
                        <img className="card-img" src={this.getScreenshotUrl()} alt=""/>
                        <div className="card-site-name"> {this.props.site[EnsSite.TITLE]} </div>
                        </div> 
                        <div className="card-content d-flex flex-column justify-content-around align-items-center">
                        <div className="card-site-description">
                            {this.props.site.d}
                        </div>
                        <div className="card-site-link">
                            <a href={this.getLink()} target="_blank" rel="noreferrer" className="stretched-link">{this.getAddress()}</a>
                        </div>
                    </div>
                </div>
             </div>
        );
    }
}

export default SiteCard;