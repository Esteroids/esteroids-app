const ShowMoreBtn = (props) => {
  if (!props.show) {
    return null
  }
  return (
    <div className='text-center load-more-div'>
      <button type='button' onClick={props.handleLoadModeClick} className='btn btn-outline-secondary load-more-btn'>
        Load More
      </button>
    </div>
  )
}

export default ShowMoreBtn
