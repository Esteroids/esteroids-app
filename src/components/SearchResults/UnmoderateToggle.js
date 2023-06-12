
import shieldSVG from '../../images/svg/shield.svg'
import unshieldSVG from '../../images/svg/unshield.svg'

const UnmoderateToggle = () => {

  return (
    <span className='wrapper wrapper-toggle-unmoderated ml-2 d-inline-flex h-18w-70'>
      <label className='switch unmoderated'>
        <input
          type='checkbox'
          id='checkbox-toggle'
          readOnly={true}
        />
        <span className='slider d-flex flex-row align-items-center unmoderated-slider'>
        <img className='ml-2' src={unshieldSVG} alt="unmoderated search"/>
        <img className='ml-2' src={shieldSVG} alt="moderated search"/>
        </span>
      </label>
    </span>
  )
}

export default UnmoderateToggle
