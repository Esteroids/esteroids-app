import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { Web3Auth } from "@web3auth/web3auth"
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useDarkThemeContext } from "./DarkTheme";


const INFURA_ID = process.env.REACT_APP_INFURA_ID


const providerOptions = {
  
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID // required
    }
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Esteroids", // Required
      infuraId: INFURA_ID, // Required
      rpc: "", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 1, // Optional. It defaults to 1 if not provided
      darkMode: false // Optional. Use dark theme, defaults to false
    }
  },
  web3auth: {
    package: Web3Auth, // required
    options: {
      infuraId: INFURA_ID // required
    }
  }
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

const INITIAL_STATE = {
  library: null,
  account: "",
  network: null,
  isConnected: false,
  chainId: 1,
  error: null 
};

// Create two context:
// Web3InfoContext: to query the context state
// Web3DispatchContext: to mutate the context state
const Web3Context = createContext(undefined);
const Web3DispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function Web3ContextProvider({ children }) {

  const darkTheme = useDarkThemeContext()
  const [provider, setProvider] = useState();
  const [connectModalTheme, setConnectModalTheme] = useState('light');
  const [web3Info, setWeb3Info] = useState(INITIAL_STATE)



  const connectWallet = useCallback(async () => {
    try {
      let newWeb3Info = {...web3Info};
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      newWeb3Info.library = library;
      if (accounts) newWeb3Info.account = accounts[0];
      newWeb3Info.chainId = network.chainId
      newWeb3Info.isConnected = true
      setWeb3Info(newWeb3Info)
    } catch (error) {
      setWeb3Info({...web3Info, isConnect: false, error: null})
    }
  }, [web3Info]);

  // async function fetchWithTimeout(resource, options = {}) {
  //   const { timeout = 5000 } = options;
    
  //   const controller = new AbortController();
  //   const id = setTimeout(() => controller.abort(), timeout);
  //   const response = await fetch(resource, {
  //     ...options,
  //     signal: controller.signal  
  //   });
  //   clearTimeout(id);
  //   return response;
  // }


  // useEffect(() => {
  //   if (isConnected) {
  //     testGateways();
  //   }
  // }, [isConnected]);

 
  const refreshState = (web3InfoNow) => {
    console.log(web3InfoNow)
    setWeb3Info({...web3InfoNow, account: '',
    network: null,
    isConnected: false,
    chainId: 1,
    error: null })
  };

  const disconnectWallet = useCallback( () => {
    if(web3Info.isConnected){
      web3Modal.clearCachedProvider();
      refreshState(web3Info);
    }
    
  }, [web3Info]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);
  

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        if (accounts) setWeb3Info({...web3Info,account:accounts[0]});
      };

      const handleChainChanged = (_hexChainId) => {
        setWeb3Info({...web3Info, chainId:_hexChainId})
      };

      const handleDisconnect = () => {
        disconnectWallet();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  useEffect(() =>  {
    if (!setWeb3Info.isConnected){  
      const newTheme = (darkTheme && 'dark') || 'light'

      if (newTheme!==connectModalTheme) {
        web3Modal.updateTheme(newTheme);
        setConnectModalTheme(newTheme)
      }
    }
    
  }, [darkTheme, setWeb3Info.isConnected]);
  

  return (
    <Web3Context.Provider value={web3Info}>
      <Web3DispatchContext.Provider value={{connectWallet, disconnectWallet}}>
        {children}
      </Web3DispatchContext.Provider>
    </Web3Context.Provider>
  );
}

const useWeb3Context = () => { return useContext(Web3Context) }
const useWeb3DispatchContext = () => { return useContext(Web3DispatchContext) }


export { Web3ContextProvider, useWeb3Context, useWeb3DispatchContext };