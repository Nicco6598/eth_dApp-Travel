import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useEthers = () => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    }
  }, []);

  return provider;
};

export default useEthers;
