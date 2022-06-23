import DWebSiteOfTheWeek from "./DwebsiteOfTheWeek"
import GitcoinCampaign from "./GitcoinCampaign";

const FEATURED_PLACEMENTS = [DWebSiteOfTheWeek, GitcoinCampaign];

const SHOW_STRATEGY = 'random';

const FeaturedPlacements = (props) => {

    let Placement = FEATURED_PLACEMENTS[Math.floor(Math.random()*FEATURED_PLACEMENTS.length)];

    return (
      <Placement  {...props} />
    );
}

export default FeaturedPlacements;

