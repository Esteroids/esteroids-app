import React, { useState } from 'react'
import ThemeToggle from '../../Theme/ThemeToggle'
import ConnectWalletButton from '../ConnectWalletButton'
import Logo from '../Logo'
import NavbarCategories from './NavbarCategories'
import NavbarSocial from './NavbarSocial'

function NavbarMainPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav className='navbar navbar-expand-xl'>
      <Logo />
      <ThemeToggle />
      <button
        className='ml-auto mx-2 navbar-toggler navbar-toggler-right collapsed'
        type='button'
        data-bs-toggle='collapse'
        data-bs-target='#navb'
        aria-expanded='false'
        onClick={() => {
          setMenuOpen(!menuOpen)
        }}
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div id='navb' className={'navbar-collapse collapse order-3' + (menuOpen && ' show') || ''}>
        <ul className='navbar-nav ms-auto'>
          <NavbarCategories menuOpen={menuOpen} />
          <NavbarSocial menuOpen={menuOpen} />
        </ul>
      </div>{' '}
      {/*-- navb */}
      <ConnectWalletButton />
    </nav>
  )
}

export default NavbarMainPage
