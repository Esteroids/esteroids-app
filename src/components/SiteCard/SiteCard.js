import React from 'react'
import EnsSite from '../../utils/ens_sites'

import { useAnalyticsContext } from '../contexts/Analytics'
import { useLocation } from 'react-router-dom'
import { useWeb3Context } from '../contexts/Web3'
import { getDModeUrl } from '../utils/DModeUtils'
import HotSiteCard from './HotSiteCard'

import SiteCardImg from './SiteCardImg'

function isFirst(check) {
  const first = check ? 'card-upper-rect-first-row-search-results' : ''

  return first
}

const getScreenshotUrl = (site) => {
  return EnsSite.getScreenshotUrl(site)
}

const getLink = (site, defaultGatway) => {
  return EnsSite.getExternalLink(site[EnsSite.NAME], defaultGatway)
}

const getAddress = (site) => {
  return EnsSite.getDisplaySiteName(site[EnsSite.NAME])
}

const getColumnSize = (location) => {
  if (location === 'search_results') return 'col-xl-4 col-lg-6 col-md-6'
  else return 'col-xl-3 col-lg-4 col-sm-6'
}

const SiteCard = (props) => {
  const defaultGatway = props.defaultGatway
  const { isConnected, library } = useWeb3Context()

  const location = props.location
  const site = props.site
  const first = props.first
  const hotCategory = props.hotCategory

  const siteAddress = getAddress(site)
  const siteLink = (!isConnected && getLink(site, defaultGatway)) || '#'
  const siteDescription = site[EnsSite.DESCRIPTION]
  const siteTitle = site[EnsSite.TITLE]

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

  if (hotCategory) {
    return (
      <HotSiteCard
        siteDescription={siteDescription}
        siteTitle={siteTitle}
        goToPage={goToPage}
        siteLink={siteLink}
        siteAddress={siteAddress}
        site={site}
      />
    )
  }

  return (
    <div className={getColumnSize(location) + ' d-flex justify-content-center'}>
      <a href={siteLink} onClick={goToPage} target='_blank' rel='noreferrer' className={'full-site-card d-flex w-100'}>
        <div className='card-esteroids'>
          <div className={'card-upper-rect py-2' + isFirst(first) + ' d-flex flex-column'}>
            <SiteCardImg screenshotUrl={screenshotUrl} />
            <div className={'card-site-name px-1'}>{siteTitle}</div>
          </div>
          <div className='card-content d-flex flex-column'>
            <div className='card-site-description'>{siteDescription}</div>
            <div className={'py-2 d-flex flex-row justify-content-center'}>
              <div className={'card-site-link'}>{siteAddress}</div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default SiteCard
