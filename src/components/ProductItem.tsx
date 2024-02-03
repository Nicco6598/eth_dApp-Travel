// ProductItem.tsx (o .jsx)

import React, { useState } from 'react';
import { ethers } from 'ethers';
import ProductSaleABI from './ProductSaleABI.js'; // Assicurati che il percorso sia corretto

const ProductItem = ({ product, provider }) => {
    const contractAddress = "0xFA73c7c78392655ABa60FBFC004f31688a06Ef60";
    const [txHash, setTxHash] = useState('');
    const [txCompleted, setTxCompleted] = useState(false);
    
    const buyProduct = async () => {
        if (!provider) {
            console.error("Wallet non connesso!");
            return;
        }

        setTxHash('');
        setTxCompleted(false);

        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ProductSaleABI, signer);

        try {
            const tx = await contract.buyProduct({ value: ethers.utils.parseEther(product.price) });
            setTxHash(tx.hash);
            console.log(`Transazione inviata. Hash: ${tx.hash}`);
            await tx.wait();
            setTxCompleted(true);
            console.log("Acquisto completato!");
        } catch (error) {
            console.error("Errore nell'acquisto del prodotto:", error);
        }
    };
    return (
        <div className="mt-20 w-fit lg:flex shadow-2xl mr-12 ml-12 ">
            <div className="h-48 lg:w-48 object-contain flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${product.imageUrl})` }} title={product.name}>
            </div>
            <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">{product.name}</div>
                    <p className="text-gray-700 text-base">{product.description}</p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xl font-bold text-black-700">{product.price} ETH</span>
                    <button onClick={buyProduct} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        Acquista
                    </button>
                    {txHash && (
                        <div className="text-sm mt-2">
                            <p>Hash Transazione: {txHash}</p>
                            {txCompleted ? (
                                <p className="text-green-500">Transazione completata!</p>
                            ) : (
                                <p className="text-yellow-500">Transazione in corso...</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
