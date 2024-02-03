import React from 'react';
import ProductItem from './ProductItem';

const products = [
  {
    id: 1,
    name: 'Viaggio alle Maldive',
    description: 'Esperienza indimenticabile nelle splendide isole delle Maldive.',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Immagine casuale da Unsplash
    price: '0.8' // Prezzo in ETH
  },
  {
    id: 2,
    name: 'Avventura in Nuova Zelanda',
    description: 'Scopri la natura incontaminata e le avventure estreme in Nuova Zelanda.',
    imageUrl: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Immagine casuale da Unsplash
    price: '1.2' // Prezzo in ETH
  },
  {
    id: 3,
    name: 'Settimana negli Stati Uniti',
    description: 'Scopri la bellezza mozzafiato degli Stati Uniti',
    imageUrl: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2099&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Immagine casuale da Unsplash
    price: '2.12' // Prezzo in ETH
  },
  {
    id: 4,
    name: 'Alla scoperta del Giappone',
    description: 'Esperienza indementicabile nel Sol Levante',
    imageUrl: 'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Immagine casuale da Unsplash
    price: '3.55' // Prezzo in ETH
  }
];

const ProductGallery = ({ provider }) => {
  return (
    <div>
        <h2 className="text-3xl font-bold my-4 mt-24 text-center">VIAGGI DISPONIBILI</h2>
    <div className="grid grid-cols-3 gap-8">
      {products.map(product => (
        <ProductItem key={product.id} product={product} provider={provider} />
      ))}
    </div>
    </div>
  );
};

export default ProductGallery;
