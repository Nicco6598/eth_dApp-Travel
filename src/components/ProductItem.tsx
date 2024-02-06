import React, { useState, useContext } from 'react';
import { ethers } from 'ethers';
import ContractABI from './ProductSaleABI';
import { ProviderContext } from './ProviderContext';

const ProductItem = ({ product, onPurchase }) => {
  const { provider } = useContext(ProviderContext);
  const contractAddress = '0xFA73c7c78392655ABa60FBFC004f31688a06Ef60';
  const [txHash, setTxHash] = useState('');
  const [txCompleted, setTxCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [transactionFailed, setTransactionFailed] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false);

  const buyProduct = async () => {
    if (!provider) {
      console.error("Wallet non connesso!");
      return;
    }

    const network = await provider.getNetwork();
    if (network.chainId !== 11155111) {
      console.error("Non sei sulla rete Sepolia Testnet!");
      return;
    }

    if (product.available <= 0) {
      console.error("Prodotto non disponibile!");
      return;
    }

    setTxHash('');
    setTxCompleted(false);
    setTransactionFailed(false);
    setTransactionInProgress(true);

    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ContractABI, signer);

      setTransactionInProgress(true); // Imposta "Transazione in corso..." prima di inviare la transazione

      const tx = await contract.buyProduct({ value: ethers.utils.parseEther(product.price) });
      setTxHash(tx.hash);
      console.log(`Transazione inviata. Hash: ${tx.hash}`);

      // Attendere che la transazione venga completata prima di mostrare il modal
      await tx.wait();

      setTxCompleted(true);
      setTransactionInProgress(false);
      console.log("Acquisto completato!");
      onPurchase(product.id); // Notifica al genitore l'acquisto
      setShowModal(true); // Mostra il modal solo dopo il completamento della transazione
    } catch (error) {
      console.error("Errore nell'acquisto del prodotto:", error);
      setTransactionFailed(true);
      setTransactionInProgress(false); // Imposta a false in caso di errore
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTxHash('');
    setTxCompleted(false);
    setTransactionFailed(false);
    setTransactionInProgress(false);
  };

  const formatTxHash = (hash) => {
    const prefix = hash.slice(0, 10);
    const suffix = hash.slice(-4);
    return (
      <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer" className="underline text-blue-500">
        {`${prefix}...${suffix}`}
      </a>
    );
  };

  return (
    <div className="mt-5 lg:mt-20 hover:scale-105 w-full lg:w-fit transition duration-300 ease-in-out transform flex flex-col lg:flex-row rounded-3xl shadow-[0px_15px_25px_15px_#cbd5e0] hover:shadow-[0px_10px_15px_5px_#a0aec0] ">
      <div className="h-48 lg:h-auto lg:w-48 object-cover flex-none bg-cover rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none text-center overflow-hidden" style={{ backgroundImage: `url(${product.imageUrl})` }} title={product.name}>
      </div>
      <div className="bg-gray rounded-b lg:rounded-b-none lg:rounded-r-3xl p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">{product.name}</div>
          <p className="text-gray-700 text-base">{product.description}</p>
          <p> ---------------  </p>
          <p className="text-gray-700 font-bold text-base">Disponibili: {product.available}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-block px-3 py-1 text-sm lg:text-xl font-bold text-black-700">{product.price} ETH</span>
          {product.available > 0 ? (
            <button onClick={buyProduct} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Acquista
            </button>
          ) : (
            <button disabled className="bg-blue-500 text-white font-bold py-2 px-4 rounded-2xl opacity-50 cursor-not-allowed">
              Esaurito
            </button>
          )}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-3xl shadow-lg lg:w-48" style={{ width: '520px' }}>
                <div className="h-auto object-contain flex-none bg-cover rounded-3xl text-center overflow-hidden" style={{ backgroundImage: `url(${product.imageUrl})` }} title={product.name}></div>
                {transactionInProgress ? (
                  <div className="mt-6">
                    <p className="font-semibold">Prodotto: {product.name}</p>
                    <p className="font-semibold">Prezzo: {product.price} ETH</p>
                    <p className="font-semibold text-blue-500">Stato Transazione: Transazione in corso...</p>
                  </div>
                ) : txCompleted ? (
                  <div className="mt-6">
                    <p className="font-semibold">Prodotto: {product.name}</p>
                    <p className="font-semibold">Hash Transazione: {formatTxHash(txHash)}</p>
                    <p className="font-semibold text-amber-500">Prezzo: {product.price}</p>
                    <p className="font-semibold text-green-500">Stato Transazione: Completata</p>
                  </div>
                ) : transactionFailed ? (
                  <div className="mt-6">
                    <p className="font-semibold text-red-500">Transazione annullata o fallita.</p>
                  </div>
                ) : (
                  <div className="mt-6">
                    <p className="font-semibold">Prodotto: {product.name}</p>
                    <p className="font-semibold">Hash Transazione: {formatTxHash(txHash)}</p>
                  </div>
                )}
                <button onClick={closeModal} className="mt-4 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                  Chiudi
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

