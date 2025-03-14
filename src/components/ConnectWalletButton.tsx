import React, { useState, useContext, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { ProviderContext } from './ProviderContext';

const providerOptions = {};

const web3Modal = new Web3Modal({
  network: 'sepolia',
  cacheProvider: true,
  providerOptions,
});

const ConnectWalletButton = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const { provider, setProvider } = useContext(ProviderContext);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (provider && account) {
      const fetchBalance = async () => {
        const balanceBigInt = await provider.getBalance(account);
        const balanceInEth = parseFloat(ethers.utils.formatEther(balanceBigInt)).toFixed(4);
        setBalance(balanceInEth);
      };
      
      fetchBalance();
    }
  }, [provider, account]);

  const connectWallet = async () => {
    try {
      setConnecting(true);
      const modalProvider = await web3Modal.connect();
      const connectedProvider = new ethers.providers.Web3Provider(modalProvider);
      const userAccount = await connectedProvider.getSigner().getAddress();

      setProvider(connectedProvider);
      setAccount(userAccount);

      // Listen for disconnect
      modalProvider.on('disconnect', () => {
        resetApp();
      });
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();
    resetApp();
  };

  const resetApp = () => {
    setProvider(null);
    setAccount('');
    setBalance('');
  };

  return (
    <div className="flex items-center">
      {account ? (
        <div className="relative group">
          <button 
            onClick={disconnectWallet} 
            className="wallet-connected text-white rounded-xl py-2 px-4 flex items-center space-x-2 transition-all duration-300"
          >
            <span className="hidden md:inline">{balance} ETH</span>
            <span className="font-medium">
              {account.substring(0, 4)}...{account.substring(account.length - 4)}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 rounded-xl bg-white shadow-xl z-50">
            <div className="py-2 px-4 border-b border-gray-100">
              <p className="text-xs text-gray-500">Wallet</p>
              <p className="text-sm font-medium">{account.substring(0, 6)}...{account.substring(account.length - 4)}</p>
            </div>
            <div className="py-2 px-4 border-b border-gray-100">
              <p className="text-xs text-gray-500">Balance</p>
              <p className="text-sm font-medium">{balance} ETH</p>
            </div>
            <button 
              onClick={disconnectWallet}
              className="w-full text-left py-2 px-4 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={connectWallet} 
          disabled={connecting}
          className={`btn-primary flex items-center space-x-2 ${connecting ? 'opacity-75' : ''}`}
        >
          {connecting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              <span>Connect Wallet</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;