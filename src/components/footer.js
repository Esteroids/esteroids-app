import { Link } from 'react-router-dom'

function BlueArrowLeft() {
  return (
    <svg width='7' height='17' version='2.0' fill='currentColor'>
      <use href='#blue-arrow-left' />
    </svg>
  )
}

function Footer() {
  return (
    <div className='container'>
      <div className='row'>
        <div className='footer d-flex flex-row justify-content-between align-items-center'>
          <div className='d-flex flex-row footer-items'>
            <div className='footer-items'>
              <a
                href='https://twitter.com/e_steroids'
                target='_blank'
                rel='noreferrer'
                className='d-flex flex-row align-middle align-items-center'
              >
                <svg version='2.0' width='19' height='15' fill='currentColor' alt='Twitter'>
                  <use href='#twitter' />
                </svg>
                <span className='d-none d-lg-block'>
                  &nbsp;&nbsp; TWITTER &nbsp;&nbsp; <BlueArrowLeft />
                </span>
              </a>
            </div>

            <div className='footer-items'>
              <a
                href='https://discord.gg/9c2EWzjFzY'
                target='_blank'
                rel='noreferrer'
                className='d-flex flex-row align-middle align-items-center'
              >
                <svg version='2.0' width='19' height='15' fill='currentColor' alt='Discord'>
                  <use href='#discord' />
                </svg>
                <span className='d-none d-lg-block'>
                  &nbsp;&nbsp; DISCORD &nbsp;&nbsp;
                  <BlueArrowLeft />
                </span>
              </a>
            </div>

            <div className='footer-items '>
              <Link to='/about' className='d-flex flex-row align-middle align-items-center'>
                <svg width='7' height='17' version='2.0' fill='currentColor' alt='info'>
                  <use href='#info' />
                </svg>
                <span className='d-none d-lg-block'>
                  &nbsp;&nbsp; ABOUT &nbsp;&nbsp;
                  <BlueArrowLeft />
                </span>
              </Link>
            </div>
          </div>
          <div className='footer-items d-none d-lg-block'>
            <Link to='/'>
              <svg width='161' height='30' version='2.0' alt='Esteroids logo'>
                <use href='#esteroids-logo' />
              </svg>
            </Link>
          </div>
          <div className='footer-items d-none d-lg-block'>
            <Link to='/privacy'>
              PRIVACY POLICY&nbsp;&nbsp;
              <BlueArrowLeft />
            </Link>
          </div>
          <div className='footer-items m-0 d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none'>
            <Link to='/privacy' className='m-0'>
              PRIVACY POLICY&nbsp;&nbsp;
              <BlueArrowLeft />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
