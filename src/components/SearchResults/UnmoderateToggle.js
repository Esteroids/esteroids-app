
import shieldSVG from '../..//images/svg/shield.svg'
import unshieldSVG from '../..//images/svg/unshield.svg'

const UnmoderateToggle = () => {

  return (
    <span className='wrapper ml-2 d-inline-flex h-18w-70'>
      <label className='switch unmoderated'>
        <input
          type='checkbox'
          id='checkbox-toggle'
          readOnly={true}
        />
        <span className='slider d-flex flex-row align-items-center unmoderated-slider'>
        <img className='ml-2' src={unshieldSVG}/>
        <img className='ml-2' src={shieldSVG}/>
        </span>
      </label>
    </span>
  )
}

export default UnmoderateToggle
