import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.8.1/ethers.min.js";
import { useNavigate } from 'react-router-dom';

// Create a context for the signer
const SignerContext = createContext();

// Create a provider component for the signer
export function SignerProvider({ children }) {
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const navigate = useNavigate()


  const connectWallet = async () => {

    let signer = null;
    let provider;
    provider = new ethers.BrowserProvider(window.ethereum)
    signer = await provider.getSigner();
    setSigner(signer)
    setAddress(await signer.getAddress())
  };



  useEffect(() => {
    connectWallet();
  },[])
  useEffect(() => {
    let currentAccount = null;

    window.ethereum.request({ method: 'eth_accounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        console.error(err);
      });

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    function handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
      } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        connectWallet();
        navigate('/', {replace: true});
      }
    }
  }, []);

  return (
    <SignerContext.Provider value={{ signer, address, connectWallet }}>
      {children}
    </SignerContext.Provider>
  );
}


// Create a hook to use the signer context
export function useSigner() {
  const context = useContext(SignerContext);
  if (context === undefined) {
    throw new Error('useSigner must be used within a SignerProvider');
  }
  return context;
}
