import React from 'react';
import ProductItem from './ProductItem';

const products = [
  {
    id: 1,
    name: 'Viaggio alle Maldive',
    description: 'Esperienza indimenticabile nelle splendide isole delle Maldive.',
    imageUrl: 'https://picsum.photos/200/300?random=1',
    price: '0.01' // Prezzo in ETH
  },
  {
    id: 2,
    name: 'Avventura in Nuova Zelanda',
    description: 'Scopri la natura incontaminata e le avventure estreme in Nuova Zelanda.',
    imageUrl: 'https://picsum.photos/200/300?random=2',
    price: '1.2' // Prezzo in ETH
  }
];

const ProductGallery = ({ provider }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map(product => (
        <ProductItem key={product.id} product={product} provider={provider} />
      ))}
    </div>
  );
};

export default ProductGallery;
