import { Link } from 'react-router-dom'

import logoName from '../../images/svg/logo_name.svg'
import logoCircle from '../../images/svg/logo_circle.svg'

export default function Logo() {
	return (
		<>
			<Link to={'/'} className=' d-none d-xl-block'>
				<img alt='Esteroids logo' src={logoName}/>
		    </Link>
			<Link to={'/'} className='  d-xl-none d-xxl-none'>
				<img alt='Esteroids logo' src={logoCircle}/>
			</Link>
		</>
	)
}