import { useState, useEffect } from 'react';
// Importa il client IPFS qui

const useIPFS = () => {
  const [ipfs, setIpfs] = useState(null);

  useEffect(() => {
    // Inizializza e imposta il client IPFS
  }, []);

  return ipfs;
};

export default useIPFS;
