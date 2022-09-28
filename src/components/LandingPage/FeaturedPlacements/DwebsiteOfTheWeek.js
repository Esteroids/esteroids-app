
import EnsSite from "../../../utils/ens_sites";

const DWEBSITE_OF_THE_WEEK_DATA = require("../../../data/dwebsite_of_the_week.json")


function DWebSiteOfTheWeek({defaultGatway}){

    return (
      <div className="WotW">
        <a className="WotW-link" target="_blank" rel="noreferrer" href={EnsSite.getExternalLink(DWEBSITE_OF_THE_WEEK_DATA.name, defaultGatway)}>
          <img className="mw-100" src={DWEBSITE_OF_THE_WEEK_DATA.img} alt="TDW placeholder"/>
          <div className="WotW-background"></div>
          <div className="WotW-header"> .eth Website for March 2022 </div>
          <div className="WotW-details-frame">
            <div className="WotW-details-text">
              <div className="WotW-title"> {DWEBSITE_OF_THE_WEEK_DATA.title} </div>
              <div className="WotW-desc"> {DWEBSITE_OF_THE_WEEK_DATA.desc} </div>
            </div> 
          </div>
        </a>
      </div>
    );
}

export default DWebSiteOfTheWeek;