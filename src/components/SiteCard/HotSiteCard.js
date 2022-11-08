import ImagePlaceholder from './ImagePlaceholder'
import LazyLoad from 'react-lazyload'
import EnsSite from '../../utils/ens_sites'

const dateDisplay = (unixtimestamp) => {
  try {
    const createDate = new Date(unixtimestamp * 1000)
    const currentDay = createDate.getDate()
    const currentYear = createDate.getFullYear()
    const nameOfMonthUS = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(createDate)

    return currentDay + '-' + nameOfMonthUS + '-' + currentYear
  } catch (e) {
    return ''
  }
}

const getScreenshotUrl = (site) => {
  return EnsSite.getScreenshotUrlSquare(site)
}

const HotSiteCardImg = (props) => {
  const screenshotExists = props.screenshotUrl !== undefined

  return (
    <LazyLoad
      height={120}
      placeholder={<ImagePlaceholder className='card-img card-img-hotsite' width={120} height={120} />}
      once
    >
      {screenshotExists && <img className={'card-img card-img-hotsite'} src={props.screenshotUrl} alt='' />}
      {!screenshotExists && <ImagePlaceholder className={'card-img card-img-hotsite'} width={120} height={120} />}
    </LazyLoad>
  )
}

const HotSiteCard = (props) => {
  const site = props.site
  const siteCreateDate = site[EnsSite.UPDATE]

  const screenshotUrl = getScreenshotUrl(site)

  return (
    <div className={'col-lg-4 col-sm-6 d-flex'}>
      <a
        href={props.siteLink}
        onClick={props.goToPage}
        target='_blank'
        rel='noreferrer'
        className={'full-site-card d-flex w-100'}
      >
        <div className='card-esteroids-hotsite card-esteroids'>
          <div className={'card-upper-rect pb-2 d-flex flex-column'}>
            <HotSiteCardImg screenshotUrl={screenshotUrl} />
            <div className={'card-site-name card-site-name-hotsite px-2 d-flex'}>{props.siteTitle}</div>
          </div>
          <div className='px-2 d-flex flex-column'>
            <div className='card-site-description card-site-description-hotsite'>{props.siteDescription}</div>
            <div className={'py-2 d-flex flex-row justify-content-between align-items-baseline'}>
              <div className='card-site-link align-items-baseline'>{props.siteAddress}</div>
              <div className='text-dark'>Added at {dateDisplay(siteCreateDate)}</div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default HotSiteCard
