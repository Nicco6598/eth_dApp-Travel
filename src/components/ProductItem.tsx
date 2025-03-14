import React, { useState, useContext } from 'react';
import { ethers } from 'ethers';
import ContractABI from './ProductSaleABI';
import { ProviderContext } from './ProviderContext';
import { motion, AnimatePresence } from 'framer-motion';

const ProductItem = ({ product, onPurchase }) => {
  const { provider } = useContext(ProviderContext);
  const contractAddress = '0xC598C2A23076De237B489426363C10cf388EeaB7';
  const [txHash, setTxHash] = useState('');
  const [txCompleted, setTxCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [transactionFailed, setTransactionFailed] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const buyProduct = async () => {
    if (!provider) {
      alert("Connetti il tuo wallet per procedere con l'acquisto.");
      return;
    }

    const network = await provider.getNetwork();
    if (network.chainId !== 11155111) {
      alert("Per favore passa alla rete Sepolia Testnet per procedere.");
      return;
    }

    if (product.available <= 0) {
      alert("Questo prodotto non è più disponibile.");
      return;
    }

    setTxHash('');
    setTxCompleted(false);
    setTransactionFailed(false);
    setTransactionInProgress(true);
    setShowModal(true);

    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ContractABI, signer);

      const tx = await contract.buyProduct({ value: ethers.utils.parseEther(product.price) });
      setTxHash(tx.hash);
      console.log(`Transazione inviata. Hash: ${tx.hash}`);

      await tx.wait();

      setTxCompleted(true);
      setTransactionInProgress(false);
      console.log("Acquisto completato!");
      onPurchase(product.id);
    } catch (error) {
      console.error("Errore nell'acquisto del prodotto:", error);
      setTransactionFailed(true);
      setTransactionInProgress(false);
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
    if (!hash) return "";
    const prefix = hash.slice(0, 6);
    const suffix = hash.slice(-4);
    return (
      <a 
        href={`https://sepolia.etherscan.io/tx/${hash}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-secondary hover:underline"
      >
        {`${prefix}...${suffix}`}
      </a>
    );
  };

  return (
    <div className="h-full">
      <div className={`card h-full flex flex-col overflow-hidden bg-white`}>
        <div className="relative overflow-hidden">
          <div 
            className="h-52 bg-cover bg-center" 
            style={{ backgroundImage: `url(${product.imageUrl})` }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/40"></div>
          </div>
          
          <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
            <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-xs font-semibold">{product.rating}</span>
          </div>
          
          {product.available <= 2 && product.available > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Solo {product.available} rimasti!
            </div>
          )}
          
          {product.available === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <span className="text-white font-bold text-xl">Esaurito</span>
            </div>
          )}
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display font-semibold text-lg">{product.name}</h3>
            <div className="font-bold text-secondary">
              {product.price} ETH
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{product.location}</span>
            <span className="mx-2">•</span>
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{product.duration}</span>
          </div>
          
          <p className={`text-gray-600 text-sm mb-4 ${expanded ? '' : 'line-clamp-2'}`}>
            {product.description}
          </p>
          
          {product.description.length > 100 && (
            <button 
              onClick={() => setExpanded(!expanded)} 
              className="text-xs text-secondary font-medium mb-4 hover:underline"
            >
              {expanded ? 'Mostra meno' : 'Leggi di più'}
            </button>
          )}
          
          <div className="mt-auto">
            <button 
              onClick={buyProduct} 
              disabled={product.available <= 0}
              className={`w-full py-2.5 px-4 rounded-xl font-medium transition-all ${
                product.available <= 0 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'btn-primary'
              }`}
            >
              {product.available <= 0 ? 'Esaurito' : 'Prenota Ora'}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden"
            >
              <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: `url(${product.imageUrl})` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-display font-bold text-xl">{product.name}</h3>
                  <p>{product.location} • {product.duration}</p>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="font-display font-semibold text-lg mb-4">Dettagli del Pagamento</h4>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Prezzo del viaggio</span>
                    <span className="font-semibold">{product.price} ETH</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Rete</span>
                    <span className="font-semibold">Sepolia Testnet</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Stato</span>
                    {transactionInProgress ? (
                      <span className="flex items-center text-blue-500">
                        <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        In corso...
                      </span>
                    ) : txCompleted ? (
                      <span className="text-green-500 font-semibold flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Completato
                      </span>
                    ) : transactionFailed ? (
                      <span className="text-red-500 font-semibold flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Fallito
                      </span>
                    ) : (
                      <span className="text-gray-500">In attesa</span>
                    )}
                  </div>
                  
                  {txHash && (
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">TX Hash</span>
                      <span>{formatTxHash(txHash)}</span>
                    </div>
                  )}
                </div>
                
                {txCompleted && (
                  <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Pagamento completato con successo!</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Il tuo viaggio è stato prenotato. Riceverai i dettagli via email.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {transactionFailed && (
                  <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">La transazione non è andata a buon fine</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>Si è verificato un errore durante il processo di pagamento. Riprova più tardi o contatta l'assistenza.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <button 
                    onClick={closeModal} 
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-all"
                  >
                    Chiudi
                  </button>
                  
                  {txCompleted && (
                    <a 
                      href={`https://sepolia.etherscan.io/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-secondary text-white rounded-lg font-medium transition-all hover:bg-secondary-light"
                    >
                      Visualizza su Etherscan
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductItem;