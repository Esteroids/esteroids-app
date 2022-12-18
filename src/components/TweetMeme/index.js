import MainLayout from '../MainLayout/MainLayout'
import { toJpeg } from 'html-to-image'
import React, { useCallback, useRef } from 'react'

import { useLocation } from 'react-router-dom'

function TweetMeme({ searchTerm, setSearchTerm }) {
  const memRef = useRef(null)
  let location = useLocation()
  let memeSite = new URLSearchParams(location.search).get('eth-site')

  //   const downloadMeme = () => {
  //     toJpeg(document.getElementById('meme-image'), { quality: 0.95 }).then(function (dataUrl) {
  //       var link = document.createElement('a')
  //       link.download = `${memeSite}-meme.jpeg`
  //       link.href = dataUrl
  //       link.click()
  //     })
  //   }

  const downloadMeme = useCallback(() => {
    if (memRef.current === null) {
      return
    }

    toJpeg(memRef.current, { cacheBust: true, quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `${memeSite}-meme.jpeg`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [memRef, memeSite])

  return (
    <MainLayout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      <div className='container d-flex flex-column justify-content-center'>
        <div className='w-100 d-flex flex-row justify-content-center'>
          <button type='button' onClick={downloadMeme} className='btn btn-outline-secondary'>
            Download Meme
          </button>
        </div>
        <div className='w-100 d-flex flex-row justify-content-center'>
          <div className='tweeter-meme' ref={memRef}>
            <span className='site-search'>{memeSite}</span>
            <span className='site-search-results'>{memeSite}</span>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default TweetMeme
