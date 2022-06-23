import React, { createContext, useState, useEffect, useContext } from "react";


import { getProvider } from "../WnftActions";

// Create two context:
// Web3InfoContext: to query the context state
// Web3InfoDispatchContext: to mutate the context state
const Web3InfoContext = createContext(undefined);
const Web3InfoDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function Web3ContextProvider({ children }) {
  const [web3ProviderInfo, setWeb3ProviderInfo] = useState({
    provider: null,
    wallet: null,
    active: false
  });
  useEffect(() => {
    if (web3ProviderInfo.provider===null){
        const providerDefault = getProvider()
        providerDefault.then((resp) => {setWeb3ProviderInfo({provider:resp.provider, wallet: null, active: true}); });
    }
    
  }, []);

  return (
    <Web3InfoContext.Provider value={web3ProviderInfo}>
      <Web3InfoDispatchContext.Provider value={setWeb3ProviderInfo}>
        {children}
      </Web3InfoDispatchContext.Provider>
    </Web3InfoContext.Provider>
  );
}

const useWeb3ProviderInfo = () => { return useContext(Web3InfoContext) }
const useWeb3InfoDispatchContext = () => { return useContext(Web3InfoDispatchContext) }


export { Web3ContextProvider, Web3InfoContext, Web3InfoDispatchContext, useWeb3ProviderInfo, useWeb3InfoDispatchContext };