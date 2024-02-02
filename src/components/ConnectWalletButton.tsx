import React, { useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import '../../src/style.css';

const providerOptions = {
  /* qui puoi inserire altri provider se necessario */
};

const web3Modal = new Web3Modal({
  network: 'mainnet', // cambierai dinamicamente tra mainnet e sepolia
  cacheProvider: true, // se vero, web3modal ricorderà quale provider è stato selezionato
  providerOptions, // provider options
});

const ConnectWalletButton = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    try {
      const modalProvider = await web3Modal.connect();
      const connectedProvider = new ethers.providers.Web3Provider(
        modalProvider
      );
      const userAccount = await connectedProvider.getSigner().getAddress();

      // Imposta il provider e l'account nello stato
      setProvider(connectedProvider);
      setAccount(userAccount);

      // Ascolta l'evento di disconnessione
      modalProvider.on('disconnect', () => {
        resetApp();
      });
    } catch (error) {
      console.error('Connessione al wallet fallita:', error);
    }
  };

  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();
    if (provider?.disconnect && typeof provider.disconnect === 'function') {
      await provider.disconnect();
    }
    resetApp();
  };

  const resetApp = () => {
    setProvider(null);
    setAccount('');
  };

  return (
    <div>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <div>
            Wallet: {account.substring(0, 6)}...
            {account.substring(account.length - 4)}
          </div>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletButton;