import {useState, useEffect} from 'react'; 
import { create } from 'ipfs-http-client';

let ipfs = null

/*
 * A quick demo using React hooks to create an ipfs instance.
 *
 * Hooks are brand new at the time of writing, and this pattern
 * is intended to show it is possible. I don't know if it is wise.
 *
 * Next steps would be to store the ipfs instance on the context
 * so use-ipfs calls can grab it from there rather than expecting
 * it to be passed in.
 */
export default function useIpfsFactory (ipfsHttpNode) {
  const [isIpfsReady, setIpfsReady] = useState(Boolean(ipfs))
  const [ipfsInitError, setIpfsInitError] = useState(null)

  useEffect(() => {
    // The fn to useEffect should not return anything other than a cleanup fn,
    // So it cannot be marked async, which causes it to return a promise,
    // Hence we delegate to a async fn rather than making the param an async fn.

    startIpfs(ipfsHttpNode)
    return function cleanup () {
      if (ipfs && ipfs.stop) {
        ipfs.stop().catch(err => console.error(err))
        ipfs = null
        setIpfsReady(false)
      }
    }
  }, [ipfsHttpNode])

  async function startIpfs (ipfsHttpNode) {
    if (ipfs) {
    } else if (window.ipfs && window.ipfs.enable) {
      ipfs = await window.ipfs.enable({ commands: ['id'] })
    } else {
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