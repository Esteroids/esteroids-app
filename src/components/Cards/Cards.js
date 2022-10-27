import SiteCard from '../SiteCard/SiteCard'
import useSitesData from '../hooks/useSitesData'

const Cards = (props) => {
  var cards = []

  const { dwebData }  = useSitesData()
  for (let i = 0; i < props.cards_number; i++) {
    cards.push(
      <SiteCard
        site={dwebData['sites'][props.websites[i]]}
        key={i}
        defaultGatway={props.defaultGatway}
        hotCategory={props.hotCategory}
      />,
    )
  }

  return <div className='cards row w-100 d-flex p-0'>{cards}</div>
}

export default Cards
