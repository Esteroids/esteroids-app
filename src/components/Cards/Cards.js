import SiteCard from '../SiteCard/SiteCard'
import { dwebData } from '../../data/ens_dict.js'

const Cards = (props) => {
  var cards = []
  for (let i = 0; i < props.cards_number; i++) {
    cards.push(
      <SiteCard
        myIndex={i}
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
