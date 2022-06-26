import { getValidUrl } from "../utils/url"

const ImageView = (props) =>{
    return (
<img className="WNFT-placement-preview-img w-100 v-100" src={props.imgSrc} alt="" />
)
}


const LinkedView = (props) => {

    const cleanedUrl = getValidUrl(props.link)
    return (
<a href={cleanedUrl} target="_blank">
    <ImageView imgSrc={props.imgSrc} />
</a>
    )
}

const WnftView = (props) => {

    const viewType = (props.link && 'LinkedView') || 'ImageView'

    return (
<div className="WNFT-placement-preview d-flex flex-column justify-content-center align-items-center">
    {viewType==='LinkedView' && (<LinkedView imgSrc={props.imgSrc} link={props.link} />)}
    {viewType==='ImageView' && (<ImageView imgSrc={props.imgSrc}  />)}
</div>
    )
}

export default WnftView;