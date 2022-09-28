import SiteCard from '../site_card'
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
        competition={props.competition}
      />,
    )
  }

  return <div className='row'>{cards}</div>
}

export default Cards
