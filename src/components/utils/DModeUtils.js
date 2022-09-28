import { CID } from 'multiformats/cid'
import { getEnsContentHash } from "./Web3Utils"
import contentHash from '@ensdomains/content-hash'



const GATEWAY_SERVERS = [
    'cf-ipfs.com',
    'dweb.link',
    'ipfs-gateway.cloud',
    '4everland.io'
]

const getRandomGateway = () => {
    return GATEWAY_SERVERS[Math.floor(Math.random()*GATEWAY_SERVERS.length)]
}

export const getDModeUrl = async (library, ethAddress) =>{

    const nameContentHash = await getEnsContentHash(library, ethAddress);

    if (nameContentHash) {
        const gatewayServer = getRandomGateway();
        const [protocol, cid] = nameContentHash.toString().split('://')
        let redirectCid;
        let redirectProtocol;
        if(protocol.toLowerCase()==='ipfs'){
            const cidParsed = CID.parse(cid)
            redirectCid = cidParsed.toV1().toString()
            redirectProtocol = 'ipfs'
            //return `https://${redirectCid}.${redirectProtocol}.${gatewayServer}`;
            
        }else if(protocol.toLowerCase()==='ipns') {
            redirectCid = cid;
            redirectProtocol = 'ipns'
            const encodedCid = '0x' + contentHash.encode('ipns-ns', cid);
            redirectCid = contentHash.decode(encodedCid);
            //return `https://${gatewayServer}/${redirectProtocol}/${redirectCid}`;
        }else{
            return null;
        }

        return `https://${redirectCid}.${redirectProtocol}.${gatewayServer}`;
    }
    return null;
    
}
