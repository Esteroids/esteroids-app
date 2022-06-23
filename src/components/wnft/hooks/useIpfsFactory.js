import { create } from 'ipfs-http-client'
import { useEffect, useState } from 'react'

const IPFS_NODE = process.env.REACT_APP_IPFS_NODE
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
export default function useIpfsFactory () {
  const [isIpfsReady, setIpfsReady] = useState(Boolean(ipfs))
  const [ipfsInitError, setIpfsInitError] = useState(null)

  useEffect(() => {
    // The fn to useEffect should not return anything other than a cleanup fn,
    // So it cannot be marked async, which causes it to return a promise,
    // Hence we delegate to a async fn rather than making the param an async fn.

    startIpfs()
    // return function cleanup () {
    //   if (ipfs && ipfs.stop) {
    //     console.log('Stopping IPFS')
    //     ipfs.stop().catch(err => console.error(err))
    //     ipfs = null
    //     setIpfsReady(false)
    //   }
    // }
  }, [])

  async function startIpfs () {
    if (ipfs) {
      console.log('IPFS already started')
    }else{
      try {
        ipfs = create(IPFS_NODE)
        //console.log('before isOnline');
        const isOnline = ipfs.isOnline()
        //console.log('isOnline', isOnline);
  
        if (isOnline) {
          setIpfsReady(true)
        }else{
          ipfs = null
          setIpfsInitError('init error')
        }
      }
      catch(err) {
        ipfs = null
        setIpfsInitError(err)
      }
    }
    

  }

  

  return { ipfs, isIpfsReady, ipfsInitError }
}