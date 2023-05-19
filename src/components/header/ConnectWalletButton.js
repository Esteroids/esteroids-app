import { useWeb3Context, useWeb3DispatchContext } from '../contexts/Web3'
import ReactTooltip from 'react-tooltip'
import React, { useRef, useEffect, useState } from 'react'

const DisconnectButton = () => {
  const { disconnectWallet } = useWeb3DispatchContext()

  const clickAction = () => {
    disconnectWallet()
  }

  return (
    <button type='button' className='btn-connect btn align-self-end btn-info rounded-pill' onClick={clickAction}>
      <strong>Disconnect</strong>
    </button>
  )
}

const ConnectButton = () => {
  const { connectWallet } = useWeb3DispatchContext()
  const { connectError } = useWeb3Context()
  const [errorTooltip, setErrorTooltip] = useState('')

  const errorTooltipRef = useRef(null)

  useEffect(() => {
    if (errorTooltipRef && errorTooltipRef.current) {
      setTimeout(() => {
        ReactTooltip.show(errorTooltipRef.current)
      }, 50)
    }
    setErrorTooltip(connectError)
  }, [connectError])

  const onClickAction = () => connectWallet()

  const tooltipText =
    'By connecting your wallet you can surf to .eth websites from the search engine,<br/> using your regular web3 provider'

  return (
    <>
      <div data-tip='' data-for='main-error' ref={errorTooltipRef} delay-hide='2000'>
        <button
          type='button'
          className='btn-connect btn align-self-end btn-secondary rounded-pill'
          onClick={onClickAction}
          data-tip={tooltipText}
          data-multiline={true}
        >
          <strong>Connect</strong>
          <ReactTooltip disable={errorTooltip !== '' && errorTooltip !== null} />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='12'
            height='12'
            className='ml-1 mb-2'
            fill='currentColor'
            viewBox='0 0 16 16'
          >
            <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z' />
          </svg>
        </button>
      </div>
      <ReactTooltip
        id='main-error'
        getContent={() => {
          return errorTooltip
        }}
        type='error'
        delayHide={2000}
        afterShow={() => {
          setTimeout(() => {
            setErrorTooltip('')
          }, 2000)
        }}
      />
    </>
  )
}

const ConnectWalletButton = () => {
  const { isConnected } = useWeb3Context()
  if (isConnected) {
    return <DisconnectButton />
  } else {
    return <ConnectButton />
  }
}

export default ConnectWalletButton
