import { MAIN_NAV_BAR_SOCIAL_ITEMS } from '../../constants/navbar'

function NavbarSocial({ menuOpen }) {
  if (menuOpen) {
    return null
  }
  return (
    <>
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
    </>
  )
}

export default NavbarSocial
