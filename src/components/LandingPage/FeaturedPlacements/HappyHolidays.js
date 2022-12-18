import LandingPageImg from '../../../images/placements/happy-holidays-big.jpg'
import LandingPageImgSm from '../../../images/placements/happy-holidays-mw.jpg'

const HappyHolidays = ({ size }) => {
  const placementImgUrl = (size === 'reg' && LandingPageImg) || LandingPageImgSm
  return (
    <div className='WotW'>
      <img className='mw-100' src={placementImgUrl} alt='Happy Holidays' />
    </div>
  )
}

export default HappyHolidays
