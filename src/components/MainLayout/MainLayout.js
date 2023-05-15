import React from 'react'
import Header from '../header/Header'

const MainLayout = ({ children, searchTerm, setSearchTerm }) => {
  return (
    <span>
      <div className='expanded-container'>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      {children}
    </span>
  )
}

export default MainLayout
