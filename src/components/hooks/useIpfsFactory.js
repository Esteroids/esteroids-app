import { useState, useEffect } from 'react'
import { create } from 'ipfs-http-client'

let ipfs = null

export default function useIpfsFactory(ipfsHttpNode) {
  const [isIpfsReady, setIpfsReady] = useState(Boolean(ipfs))
  const [ipfsInitError, setIpfsInitError] = useState(null)

  useEffect(() => {
    // The fn to useEffect should not return anything other than a cleanup fn,
    // So it cannot be marked async, which causes it to return a promise,
    // Hence we delegate to a async fn rather than making the param an async fn.

    startIpfs(ipfsHttpNode)
    return function cleanup() {
      if (ipfs && ipfs.stop) {
        ipfs.stop().catch((err) => console.error(err))
        ipfs = null
        setIpfsReady(false)
      }
    }
  }, [ipfsHttpNode])

  async function startIpfs(ipfsHttpNode) {
    if (window.ipfs && window.ipfs.enable) {
      ipfs = await window.ipfs.enable({ commands: ['id'] })
    } else if (!ipfs) {
      try {
        ipfs = await create(ipfsHttpNode)
      } catch (error) {
        ipfs = null
        setIpfsInitError(error)
        console.error(error)
      }
    }

    setIpfsReady(Boolean(ipfs))
  }

  return { ipfs, isIpfsReady, ipfsInitError }
}
