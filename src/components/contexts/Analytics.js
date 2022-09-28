import * as React from 'react'

import useAnalytics from '../hooks/useAnalytics'

const AnalyticsContext = React.createContext()

function AnalyticsContextProvider({
  children,
  topic = 'ESTEROIDS_ANALYTICS',
  ipfsNodeUrl = process.env.REACT_APP_IPFS_NODE,
}) {
  const { add } = useAnalytics({ ipfsNodeUrl, topic })

  return <AnalyticsContext.Provider value={add}>{children}</AnalyticsContext.Provider>
}

const useAnalyticsContext = () => {
  const context = React.useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within a AnalyticsContextProvider')
  }
  return context
}

export { AnalyticsContextProvider, useAnalyticsContext }
