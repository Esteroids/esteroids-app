import React from "react";
import EnsSite from "../utils/ens_sites";
import ReactTooltip from 'react-tooltip';
import LazyLoad from 'react-lazyload';

// include the placeholder in build
import DEFAULT_PLACEHOLDER from '../images/logo_placeholder.png';


function isFirst(check) {
    const first = check ? "card-upper-rect-first-row-search-results" : "";

    return first;
}

const PlaceholderComponent = props => {
    return (
<svg version="2.0" {...props} fill="#a3c8ff"  >
    <use href="#esteroids" />
</svg>)
}


const SiteCard = props => {


    const getScreenshotUrl = (site) => {
        let screenshot_url = EnsSite.getScreenshotUrl(site);
        if (screenshot_url === '') {
            return DEFAULT_PLACEHOLDER;
        } else {
            return screenshot_url;
        }
    }

    const getLink = (site, originUrl) => {
        return EnsSite.getExternalLink(site[EnsSite.NAME], originUrl);
    }


    const getAddress = (site) => {
        return EnsSite.getDisplaySiteName(site[EnsSite.NAME]);
    }


    const getColumnSize = (location) => {
        if (location === "search_results")
            return 'col-xl-4 col-lg-6 col-md-6 d-flex justify-content-center';
        else
            return 'col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center';
    }

    const location = props.location;
    const site = props.site;
    const first = props?.first;
    const originUrl = props.originUrl;
    const cardIndex = props.myIndex;

    const siteAddress = getAddress(site)
    const showCompetitionSelect = props.competition && props.competition.votingEnded !== true
    const competition = props?.competition


    const siteSelectedCompetition = competition && competition?.selectedCandidates[siteAddress];

    const reachedMaxCandidates = competition && !siteSelectedCompetition && competition.reachedMaxCandidates

    const errorToolTip = (reachedMaxCandidates && 'You can only vote for ' + competition.maxCandidates + ' candidates') || ''


    const handleSelect = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (!siteSelectedCompetition) {
            if (!reachedMaxCandidates) {
                await competition.addSelectedCandidate(siteAddress);
            }

        } else {
            await competition.removeSelectedCandidate(siteAddress);
        }
        return false;
    }

    return (
        <a href={getLink(site, originUrl)} target="_blank" rel="noreferrer" className={getColumnSize(location) + " full-site-card"}>
            <div className={getColumnSize(location)}>
                <div className={"card-esteroids" + (siteSelectedCompetition ? " card-esteroids-competition-selected" : '')}>
                    <div className={"card-upper-rect py-2 " + isFirst(first) + " d-flex flex-column justify-content-center align-items-center"}>
                        <LazyLoad height={100} placeholder={(<PlaceholderComponent className="card-img" width={100} height={100} />)} once>
                            <img className="card-img" src={getScreenshotUrl(site)} alt="" width="100" height="100" />
                        </LazyLoad>
                        <div className="card-site-name px-1">
                            {site[EnsSite.TITLE]}
                        </div>
                    </div>
                    <div className="card-content d-flex flex-column justify-content-around align-items-center">
                        <div className="card-site-description">
                            {site.d}
                        </div>
                        <div className="py-2">
                            <div className="card-site-link">
                                {getAddress(site)}
                            </div>
                            {showCompetitionSelect && (<button className={((siteSelectedCompetition && "btn-info") || "btn-primary") + " py-1 px-3"} onClick={handleSelect} data-tip={errorToolTip} data-for={"error_tooltip" + cardIndex}>
                                {(siteSelectedCompetition && "UnSelect") || "Select"}
                                <ReactTooltip id={"error_tooltip" + cardIndex} />
                            </button>)}
                        </div>
                    </div>
                </div>
            </div>
        </a>

    );
}



export default SiteCard;