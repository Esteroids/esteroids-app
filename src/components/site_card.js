import React from 'react'
import EnsSite from '../utils/ens_sites'
import LazyLoad from 'react-lazyload'
import { useAnalyticsContext } from './contexts/Analytics'
import { useLocation } from 'react-router-dom'
import { useWeb3Context } from './contexts/Web3'
import { getDModeUrl } from './utils/DModeUtils'

function isFirst(check) {
  const first = check ? 'card-upper-rect-first-row-search-results' : ''

  return first
}

const PlaceholderComponent = (props) => {
  return (
    <svg version='2.0' {...props} fill='#0040a3'>
      <use href='#esteroids' />
    </svg>
  )
}

const SiteCard = (props) => {
  const defaultGatway = props.defaultGatway
  const { isConnected, library } = useWeb3Context()

  const getScreenshotUrl = (site) => {
    return EnsSite.getScreenshotUrl(site)
  }

  const getLink = (site) => {
    return (!isConnected && EnsSite.getExternalLink(site[EnsSite.NAME], defaultGatway)) || '#'
  }

  const getAddress = (site) => {
    return EnsSite.getDisplaySiteName(site[EnsSite.NAME])
  }

  const getColumnSize = (location) => {
    if (location === 'search_results') return 'col-xl-4 col-lg-6 col-md-6 d-flex justify-content-center'
    else return 'col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center'
  }

  const location = props.location
  const site = props.site
  const first = props.first

  const siteAddress = getAddress(site)

  const screenshotUrl = getScreenshotUrl(site)

  const pageLocation = useLocation()
  const add = useAnalyticsContext()

  const goToPage = async (event) => {
    if (isConnected) {
      event.stopPropagation()
      event.preventDefault()
      const dModeUrl = await getDModeUrl(library, siteAddress)
      if (dModeUrl) {
        window.open(dModeUrl, '_blank').focus()
      }
    }

    const eType = 'link'
    const meta = {
      site: siteAddress,
      host: window?.location?.host,
      from: (pageLocation?.pathname || '') + (pageLocation?.search || ''),
      d_surf: isConnected,
    }

    add({ eType, meta })
    return true
  }

  return (
    <a
      href={getLink(site, defaultGatway)}
      onClick={goToPage}
      target='_blank'
      rel='noreferrer'
      className={getColumnSize(location) + ' full-site-card'}
    >
      <div className={getColumnSize(location)}>
        <div className='card-esteroids'>
          <div
            className={
              'card-upper-rect py-2 ' + isFirst(first) + ' d-flex flex-column justify-content-center align-items-center'
            }
          >
            <LazyLoad
              height={100}
              placeholder={<PlaceholderComponent className='card-img' width={101} height={101} />}
              once
            >
              {screenshotUrl && <img className='card-img' src={screenshotUrl} alt='' width='100' height='100' />}
              {!screenshotUrl && <PlaceholderComponent className='card-img' width={101} height={101} />}
            </LazyLoad>
            <div className='card-site-name px-1'>{site[EnsSite.TITLE]}</div>
          </div>
          <div className='card-content d-flex flex-column justify-content-around align-items-center'>
            <div className='card-site-description'>{site[EnsSite.DESCRIPTION]}</div>
            <div className='py-2'>
              <div className='card-site-link'>{getAddress(site)}</div>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export default SiteCard
