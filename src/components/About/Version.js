import { useState, useEffect } from 'react'
const DEFAULT_VERSION = ''

import versionFile from '../../data/current_version.txt'

const Version = () => {
  const [version, setVersion] = useState(DEFAULT_VERSION)

  useEffect(() => {
    fetch(versionFile)
      .then((response) => response.text())
      .then((text) => setVersion(text))
  }, [])

  if (version === '') {
    return null
  }

  return <div className='text-muted'>version {version}</div>
}

export default Version
