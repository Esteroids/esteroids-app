import { Link } from 'react-router-dom'
import { TAGS } from '../constants/tags'

const getButtonClasses = (isActive) => (isActive && 'btn-primary') || 'btn-info'

const TagLink = ({ tag, isActive }) => {
  const tagUrl = '/tag/' + tag.url

  return (
    <Link to={tagUrl}>
      <button type='button' className={'br-20 me-1 mb-3 px-4 btn ' + getButtonClasses(isActive)}>
        {tag.label}
      </button>
    </Link>
  )
}

const RegularTags = (props) => {
  const tagCategory = props.category.replace('tag/', '')
  return (
    <>
      {TAGS.map((tag) => (
        <TagLink key={tag.url} tag={tag} isActive={tag.url === tagCategory} />
      ))}
    </>
  )
}

export default RegularTags
