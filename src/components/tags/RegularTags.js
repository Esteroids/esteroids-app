import { Link } from 'react-router-dom'

const getButtonClasses = (isActive) => (isActive && 'btn-primary') || 'btn-info'

const RegularTags = (props) => {
  const tagCategory = props.category.replace('tag/', '')
  return (
    <>
      <Link to='/tag/nft'>
        <button type='button' className={'br-20 me-1 mb-3 px-4 btn ' + getButtonClasses('nft' === tagCategory)}>
          NFT
        </button>
      </Link>
      <Link to='/tag/dao'>
        <button type='button' className={'br-20 me-1 mb-3 px-4 btn ' + getButtonClasses('dao' === tagCategory)}>
          DAOs
        </button>
      </Link>
      <Link to='/tag/blog'>
        <button type='button' className={'br-20 me-1 mb-3 px-4 btn ' + getButtonClasses('blog' === tagCategory)}>
          Blogs
        </button>
      </Link>
      <Link to='/tag/defi'>
        <button type='button' className={'br-20 me-1 mb-3 px-4 btn ' + getButtonClasses('defi' === tagCategory)}>
          DeFi
        </button>
      </Link>
      <Link to='/tag/nimi'>
        <button type='button' className={'br-20 me-1 mb-3 px-4 btn ' + getButtonClasses('nimi' === tagCategory)}>
          Nimi
        </button>
      </Link>
      <Link to='/tag/ens'>
        <button type='button' className={'br-20 me-1 mb-3 px-4 btn ' + getButtonClasses('ens' === tagCategory)}>
          ENS
        </button>
      </Link>
    </>
  )
}

export default RegularTags
