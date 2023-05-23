import ThemeToggle from '../../Theme/ThemeToggle'
import ConnectWalletButton from '../ConnectWalletButton'
import Logo from '../Logo'
import NavbarSearch from './NavbarSearch'

function NavbarSecondaryPage(props) {
  return (
    <nav className='navbar navbar-expand-xl h-100 navbar-secondary d-flex flex-row'>
      <Logo />

      <div className='ps-2'>
        <NavbarSearch searchTerm={props.searchTerm} location={props.location} setSearchTerm={props.setSearchTerm} />
      </div>
      <div className='d-none d-xl-flex w-100 justify-content-end'>
        <ThemeToggle />
        <ConnectWalletButton />
      </div>
    </nav>
  )
}

export default NavbarSecondaryPage
