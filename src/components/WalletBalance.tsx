import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletBalance = ({ provider, account }) => {
  const [balance, setBalance] = useState('');

  const getBalance = async () => {
    try {
      if (provider && account) {
        const balanceBigInt = await provider.getBalance(account);
        const balanceInEth = parseFloat(ethers.utils.formatEther(balanceBigInt)).toFixed(5);
        setBalance(balanceInEth);
      }
    } catch (error) {
      console.error("Errore nel recuperare il saldo:", error);
    }
  };

  useEffect(() => {
    getBalance();
  }, [provider, account]); // Ricalcola il saldo quando cambiano il provider o l'account

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

