//import GitcoinCampaign from './GitcoinCampaign'
// import DwebsitesBot from './DwebsitesBot'
// import DwebServicesPlacement from './DwebServices'
import HappyHolidays from './HappyHolidays'

const FEATURED_PLACEMENTS = [HappyHolidays]

const SHOW_STRATEGY = 'random'

const FeaturedPlacements = (props) => {
  const Placement =
    SHOW_STRATEGY === 'random' && FEATURED_PLACEMENTS[Math.floor(Math.random() * FEATURED_PLACEMENTS.length)]

  return <Placement {...props} />
}

export default FeaturedPlacements
