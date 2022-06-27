import {wnftKeyphraseNormalize, wnftKeyphraseHash} from './WnftHash'
import {getTokenData} from "./WnftActions"
import useAsync from "../hooks/useAsync"
import {useWeb3ProviderInfo} from "./hooks/Web3Context"
import { useEffect, useState } from 'react'
import WnftView from './WnftView'

const all = require('it-all')
const { concat: uint8ArrayConcat } = require('uint8arrays/concat')

const NoWnftPlacement = () => {

    return (
        <a href="https://keyphrase.esteroids.eth.limo/">
            <img className="w-100 v-100" src="./images/own-a-keyword-placement.png" alt=""/>
        </a>
);

}

const WnftPlacement = (props) =>{

    const tokenURI = props.tokenData?.tokenURI



    const [keyphraseInfo, setKeyphraseInfo] = useState(null)

    const keyphraseRender = keyphraseInfo?.placement?.renderInfo

    console.log('keyphraseInfo', keyphraseInfo)
    console.log('keyphraseRender', keyphraseRender)


    const fetchTokenUri = async () => {
          
        const cid = tokenURI.substr(7);
        const file_txt = new TextDecoder().decode(uint8ArrayConcat(await all(props.ipfs.cat(cid))));
        
        setKeyphraseInfo(JSON.parse(file_txt))
    }


    

    const { execute, status, value, error, setStatus } = useAsync(fetchTokenUri, false);


    useEffect(() =>{
        if (tokenURI){
            execute(); 
        }
    },
    [props.tokenData, props.isIpfsReady])

    return (<>
        {status == 'success' && keyphraseRender && (
        <WnftView link={keyphraseRender.link} imgSrc={keyphraseRender.imgSrc} />
        )
        }
        </>
            )

}


const SearchWnftPlacement = (props) => {

    const [wnftPlacementFound, setWnftPlacementFound] = useState('na')

    const [tokenData, setTokenData] = useState(null)

    //const wnftPlacementFound = props.searchTerm;

    const web3ProviderInfo = useWeb3ProviderInfo()


    console.log(wnftKeyphraseNormalize(props.searchTerm))
    console.log(wnftKeyphraseHash(props.searchTerm))

    const getAllTokenData = async () => {
        const wnftHash = wnftKeyphraseHash(props.searchTerm)

        getTokenData(web3ProviderInfo, wnftHash).then(async (resp)=>{ 

            console.log(resp)
            if (!resp.tokenExists){
                setWnftPlacementFound('not_found')
            }else{
                setWnftPlacementFound('found')
                setTokenData(resp)
            }
        })
    }

    const { execute, status, value, error } = useAsync(getAllTokenData, false);

    useEffect(() =>{
        if (web3ProviderInfo.active){
            execute(); 
        }
    },
    [props.searchTerm, web3ProviderInfo.active])

    return (
<div className="col-md-3 v-100">
    <div className="NFTW-search-results d-flex flex-column justify-content-center align-items-center">
        {wnftPlacementFound=='not_found' && (<NoWnftPlacement />)}
        {wnftPlacementFound=='found' && (<WnftPlacement tokenData={tokenData} ipfs={props.ipfs} isIpfsReady={props.isIpfsReady} />)}
    </div>
</div>);
  }

export default SearchWnftPlacement