const DEFAULT_GATEWAY = 'limo'

const getOriginGateway = (originUrl) => {
  let choosenGateway = DEFAULT_GATEWAY
  if (originUrl) {
    try {
      const url = new URL(originUrl)
      if (url.hostname) {
        const domainParts = url.hostname.toLowerCase().split('.')
        const gateway_ending =
          (domainParts.length > 2 &&
            domainParts[domainParts.length - 2] === 'eth' &&
            domainParts[domainParts.length - 1]) ||
          ''
        if (gateway_ending) {
          choosenGateway = gateway_ending
        } else {
          choosenGateway = DEFAULT_GATEWAY
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  return choosenGateway
}

const EnsSite = {
  getExternalLink: function (ens_name, gateway) {
    return 'https://' + ens_name + '.eth.' + gateway
  },
  getGateway: (originUrl) => getOriginGateway(originUrl),
  getDisplaySiteName: function (ens_name) {
    return ens_name + '.eth'
  },
  getScreenshotUrl: function (ens_site) {
    if (
      (ens_site[this.HAS_SCREENSHOT] === undefined ||
        ens_site[this.HAS_SCREENSHOT] === 1) &&
      ens_site[this.NAME] !== undefined
    ) {
      return './images/ext/screenshots/' + ens_site[this.NAME] + '_screenshot.jpg'
    } else {
      return ''
    }
  },
  getScreenshotUrlSquare: function (ens_site) {
    if (
      (ens_site[this.HAS_SCREENSHOT] === undefined ||
        ens_site[this.HAS_SCREENSHOT] === 1) &&
      ens_site[this.NAME] !== undefined
    ) {
      return './images/ext/screenshots/' + ens_site[this.NAME] + '_square_screenshot.jpg'
    } else {
      return ''
    }
  },
  NAME: 'n',
  DESCRIPTION: 'd',
  TITLE: 't',
  UPDATE: 'u',
  HAS_SCREENSHOT: 'sc',
}

export default EnsSite
