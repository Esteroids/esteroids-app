import LandingPageImg from '../../../images/gitcoin_bg.jpg'

const GitcoinCampaign = () => {
  return (
    <div className='WotW'>
      <a className='WotW-link' href='https://gitcoin.co/grants/4708/esteroids-ethereum-asteroids-a-project-for-eth-web'>
        <img className='mw-100' src={LandingPageImg} alt='TDW placeholder' />
        <div className='WotW-background'></div>
        <div className='WotW-header'>Support Esteroids</div>
        <div className='WotW-details-frame'>
          <div className='WotW-details-text'>
            <div className='WotW-desc'>Like what we&apos;re doing? Support us on Gitcoin!</div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default GitcoinCampaign
