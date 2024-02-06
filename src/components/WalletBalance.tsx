import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import ProductGallery from './ProductGallery';
import { ProviderContext } from './ProviderContext'; // Import solo ProviderContext, ProviderProvider non è necessario qui

const WalletBalance = ({ account }) => {
  const { provider } = useContext(ProviderContext); // Destruttura per ottenere solo la proprietà provider
  const [balance, setBalance] = useState('');

  const getBalance = async () => {
    if (provider && account) {
      // Accedi correttamente al provider per chiamare getBalance
      const balanceBigInt = await provider.getBalance(account);
      const balanceInEth = parseFloat(ethers.utils.formatEther(balanceBigInt)).toFixed(5);
      setBalance(balanceInEth);
    }
  };

  useEffect(() => {
    getBalance();
  }, [provider, account]);

  return (
    <div>
      {account && (
        <div className="bg-purple-600 text-white text-center py-2 px-4 rounded-lg shadow-2xl transition-all mr-8 p-4 rounded-lg transition-all">
          <p className="text-sm flex font-semibold justify-between items-center">SALDO DEL WALLET: {balance} ETH </p>       
        </div>
      )}
    </div>
  );
};

export default WalletBalance;


