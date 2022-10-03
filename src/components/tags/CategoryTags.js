import { Link } from 'react-router-dom'

const getButtonClasses = (isActive) => (isActive && 'btn-dark') || 'btn-secondary'

const CategoryTags = (props) => {
  return (
    <>
      <Link to='/hot'>
        <button type='button' className={'br-20 me-1 mb-3 px-4 btn ' + getButtonClasses('hot' === props.category)}>
          Hot🌶️
        </button>
      </Link>
      <Link to='/new'>
        <button type='button' className={'br-20 me-1 mb-3 px-4 btn ' + getButtonClasses('new' === props.category)}>
          New
        </button>
      </Link>
    </>
  )
}

export default CategoryTags
