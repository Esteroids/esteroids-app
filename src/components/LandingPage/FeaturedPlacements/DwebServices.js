import DwebServicesImg from "../../../images/placements/dwebservices-placment.jpg"
import DwebServicesImgSmall from "../../../images/placements/dwebservices-placment-sm.jpg"



const DwebServicesPlacement = (props) => {

    const placementImgUrl = (props.size==='reg' && DwebServicesImg) || DwebServicesImgSmall;
    return (
        <div className="WotW">
          <a className="WotW-link" href="https://dwebservices.xyz">
            <img className="mw-100" src={placementImgUrl} alt="dWebServices" />
          </a>
        </div>
      );
}

export default DwebServicesPlacement;