import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import ThemeToggle from '../Theme/ThemeToggle'
import Web3Button from './ConnectButton'

const MAIN_NAV_BAR_ITEMS = [
  { label: 'Hot', link: '/hot', id: 'nav-link-2' },
  { label: 'New', link: '/new', id: 'nav-link-1' },
  { label: 'Recently Updated', link: '/recent', id: 'nav-link-3' },
]

const MAIN_NAV_BAR_SOCIAL_ITEMS = [
  { link: 'https://twitter.com/dwebsitesbot', class: 'twitter-icon', altLabel: 'Latest dWebsites bot', svgId: 'robot' },
  { link: 'https://discord.gg/9c2EWzjFzY', class: 'discord-icon', altLabel: 'Our Discord', svgId: 'discord' },
  { link: 'https://twitter.com/e_steroids', class: 'twitter-icon', altLabel: 'Our Twitter', svgId: 'twitter' },
]

function NavBarItemMainPage(props) {
  let class_list = 'nav-link'
  if (props.menuOpen) {
    class_list += ' nav-link-collapsed'
  }
  return (
    <li className='nav-item'>
      <Link to={props.item.link} className={class_list}>
        {props.item.label}
        <svg version='2.0' alt='' className='green_dropdown_arrow'>
          <use href='#green-arrow' />
        </svg>
      </Link>
    </li>
  )
}

function NavBarMainPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav className='navbar navbar-expand-xl flex-grow-0'>
      <Link to={'/'} className=' d-none d-xl-block'>
        <svg className='navbar-brand' width='161' height='44' version='2.0' alt='Esteroids logo'>
          <use href='#esteroids-logo' />
        </svg>
      </Link>
      <Link to={'/'} className='  d-xl-none d-xxl-none'>
        <svg className='d-xl-none d-xxl-none ' height='44' width='44' version='2.0' alt='Esteroids logo'>
          <use href='#esteroids' />
        </svg>
      </Link>
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
          {MAIN_NAV_BAR_ITEMS.map((menu_item, index) => (
            <NavBarItemMainPage key={index} item={menu_item} menuOpen={menuOpen} />
          ))}

          {!menuOpen &&
            MAIN_NAV_BAR_SOCIAL_ITEMS.map((menu_item, index) => (
              <li className='nav-item' key={'social' + index.toString()}>
                <a
                  href={menu_item.link}
                  target='_blank'
                  rel='noreferrer'
                  className={'nav-link' + ((menuOpen && ' nav-link-collapsed') || '')}
                >
                  <svg width='24' height='24' version='2.0' fill='currentColor' alt={menu_item.altLabel}>
                    <use href={'#' + menu_item.svgId} />
                  </svg>
                </a>
              </li>
            ))}
        </ul>
      </div>{' '}
      {/*-- navb */}
      <div>
        <Web3Button />
      </div>
    </nav>
  )
}

export default NavBarMainPage
