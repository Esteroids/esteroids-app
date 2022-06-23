import {getRpcUrl, getWebSocketRpcUrl, getChainId} from "../utils/provider"
import { ethers } from "ethers";


const WNFTABI = require("./abi.json")


const WNFT_CONTRACT_ADDRESS = process.env.REACT_APP_WNFT_CONTRACT_ADDRESS
const CONTRACT_NETWORK = process.env.REACT_APP_CONTRACT_NETWORK
const USE_WEBSOCKETS = true


const getContract = (provider) => {
    return new ethers.Contract(WNFT_CONTRACT_ADDRESS, WNFTABI, provider);
}


export const getProvider = async () => {
    let isWallet = false;
    let provider;
    if (window.ethereum){
      provider = new ethers.providers.Web3Provider( window.ethereum )
      const { chainId } = await provider.getNetwork();
      if (chainId!==getChainId(CONTRACT_NETWORK)){
        provider = undefined;
      }else{
        isWallet = true;
      }
      
    }
    if (provider===undefined){
      if (USE_WEBSOCKETS){
        provider = new ethers.providers.WebSocketProvider( getWebSocketRpcUrl(CONTRACT_NETWORK) );
      }else{
        provider = new ethers.providers.JsonRpcProvider( getRpcUrl(CONTRACT_NETWORK) );
      }
    }
    return {'provider': provider}
  }



  export const getTokenData = async (providerInfo, tokenHash) => {

    const tokenId = ethers.BigNumber.from(tokenHash)
    const provider = providerInfo.provider
    const WNFT_contract = getContract(provider);
    const isWallet = providerInfo.wallet
    
    let tokenExistsData = {'id': tokenId}
    const tokenExists = await WNFT_contract.tokenExists(tokenId)
    tokenExistsData['tokenExists'] = tokenExists;
    if (tokenExists){
      

      let fetchedPromises = [];
      let fetchedOrder = [];
      let fetchedData = {};

      const addFetchPromise = (name, fetchPromise) => {
        fetchedPromises.push(fetchPromise);
        fetchedOrder.push(name);
      }
      
      addFetchPromise('owner', WNFT_contract.ownerOf(tokenId));
      addFetchPromise('tokenURI', WNFT_contract.tokenURI(tokenId));

    
      const results = await Promise.all(fetchedPromises);

      for (var i in results){
        if (typeof fetchedOrder[i]  === 'string') fetchedData[fetchedOrder[i]] = results[i];
        else if (typeof fetchedOrder[i] === 'function') fetchedOrder[i](results[i]);
      }

      fetchedData.isTokenOwner = false;
      const signer = provider.getSigner(0)

      if (isWallet && signer.getAddress){
        if (isWallet){
          try{
            const userAddress = await signer.getAddress();
            fetchedData.isTokenOwner = userAddress===fetchedData.owner;
          }catch{} 
        }
        
      }

      tokenExistsData = {...tokenExistsData, ...fetchedData}



    }
    return tokenExistsData;
  }


  export const mintToken = async (providerInfo, tokenHash, initTokenCID, withCID=true, mintPrice=1) => {
  
    const provider = providerInfo.provider
    const tokenId = ethers.BigNumber.from(tokenHash)
  
    
    try{
        const signer = provider.getSigner(0);
        const WNFT_contract = getContract(signer);
       

        const price = ethers.BigNumber.from(140330173736)
        const priceInETH = (mintPrice * 10 ** 8) / price
        const priceInWie = ethers.BigNumber.from((Math.ceil(priceInETH * 10 ** 18)).toString())
        let overrides = {
            value: priceInWie
        };
        const mintTo = signer.getAddress()
        let setMintTx
        if (!withCID){
            setMintTx = await WNFT_contract.mint(mintTo, tokenId, overrides)
        }else{
            setMintTx = await WNFT_contract.mintWithTokenURI(mintTo, tokenId, initTokenCID, overrides)
        }
        await setMintTx.wait()
        console.log('set done')

    }catch(e) {
    console.error('Error changing "mintToken" remote contract' + e.name + ': ' + e.message)
    throw e.message;
    }
  
    
  }


  export const setTokenURI = async (providerInfo, tokenHash, tokenURI) => {

    const provider = providerInfo.provider
    const tokenId = ethers.BigNumber.from(tokenHash)
  
    const signer = provider.getSigner(0);
  
    if (signer !== null) {
      try{
        const WNFT_contract = getContract(signer);
  
        const setTokenURITx = await WNFT_contract.setTokenURI(tokenId, tokenURI)
        await setTokenURITx.wait()
        console.log('set done')
  
      }catch(e) {
        console.error('Error changing "setTokenURI" remote contract' + e.name + ': ' + e.message)
        throw e.message;
      }
  
    }
  }
  
 