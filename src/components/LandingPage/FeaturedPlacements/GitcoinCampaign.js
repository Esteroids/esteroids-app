import LandingPageImg from '../../../images/gitcoin_bg.jpg'

const GitcoinCampaign = () => {
  return (
    <div className='WotW'>
      <a
        className='WotW-link'
        href='https://grant-explorer.gitcoin.co/#/round/1/0xd95a1969c41112cee9a2c931e849bcef36a16f4c/0x718ead66c1598336d76118607afea7d152b63b087e52f5b9c1f81398e4c06235-0xd95a1969c41112cee9a2c931e849bcef36a16f4c'
      >
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
