import ImagePlaceholder from './ImagePlaceholder'
import LazyLoad from 'react-lazyload'

const SiteCardImg = ({ screenshotUrl }) => {
  const screenshotExists = screenshotUrl !== undefined && screenshotUrl

  return (
    <LazyLoad
      className={'card-th-wrapper'}
      placeholder={<ImagePlaceholder className='card-img' width={120} height={120} />}
      once
    >
      {screenshotExists && <img className={'card-img card-img-round'} src={screenshotUrl} alt='' />}
      {!screenshotExists && <ImagePlaceholder className={'card-img card-img-round'} width={120} height={120} />}
    </LazyLoad>
  )
}

export default SiteCardImg
