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
              <img src={menu_item.icon} width='24' height='24' alt={menu_item.altLabel} />
            </a>
          </li>
        ))}
    </>
  )
}

export default NavbarSocial
