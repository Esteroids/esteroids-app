import { Link } from 'react-router-dom'
import { MAIN_NAV_BAR_ITEMS } from '../../constants/navbar'
import greenItemArrow from '../../../images/svg/helpers/green_item_arrow.svg'

function NavBarItemMainPage(props) {
  let class_list = 'nav-link'
  if (props.menuOpen) {
    class_list += ' nav-link-collapsed'
  }
  return (
    <li className='nav-item'>
      <Link to={props.item.link} className={class_list}>
        {props.item.label}
        <img alt={props.item.label} src={greenItemArrow} className='green_dropdown_arrow' />
      </Link>
    </li>
  )
}

function NavBarItems({ menuOpen }) {
  return (
    <>
      {MAIN_NAV_BAR_ITEMS.map((menu_item, index) => (
        <NavBarItemMainPage key={index} item={menu_item} menuOpen={menuOpen} />
      ))}
    </>
  )
}

export default NavBarItems
