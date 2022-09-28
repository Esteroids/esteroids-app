import { useState, useRef, useCallback, useEffect } from 'react'
import useIpfsFactory from './useIpfsFactory'

const sendEvents = async (ipfs, events, topic) => {
  const msg = JSON.stringify(events)
  return ipfs.pubsub.publish(topic, msg)
}

function useAnalytics({ ipfsNodeUrl, topic }) {
  const ipfsObj = useIpfsFactory(ipfsNodeUrl)

  const inFlight = useRef(false)
  const pending = useRef([])

  const [stats, setStats] = useState({
    numPending: 0,
    inFlight: true,
    numDone: 0,
  })

  useEffect(() => {
    while (inFlight.current === false && pending.current.length > 0 && ipfsObj.isIpfsReady) {
      inFlight.current = true

      const analyticsEvents = pending.current.splice(0, pending.current.length)
      setStats((stats) => {
        return {
          ...stats,
          numPending: stats.numPending - analyticsEvents.length,
          inFlight: true,
        }
      })
      const result = sendEvents(ipfsObj.ipfs, analyticsEvents, topic)
      result
        .then(() => {
          inFlight.current = false
          setStats((stats) => {
            return {
              ...stats,
              inFlight: false,
              numDone: stats.numDone + 1,
            }
          })
        })
        .catch(() => {
          inFlight.current = false
          setStats((stats) => {
            return {
              ...stats,
              inFlight: false,
              numDone: stats.numDone + 1,
            }
          })
        })
    }
  }, [stats, ipfsObj.isIpfsReady, topic])

  const add = useCallback((analyticsEvent) => {
    pending.current.push(analyticsEvent)
    setStats((stats) => {
      return {
        ...stats,
        numPending: stats.numPending + 1,
      }
    })
  }, [])

  return { add }
}

export default useAnalytics
