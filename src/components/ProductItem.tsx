import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <img src={product.imageUrl} alt={product.name} />
      <div>{product.name}</div>
      <div>{product.price} ETH</div>
      {/* Qui potresti aggiungere un bottone per acquistare il prodotto */}
    </div>
  );
};

export default ProductItem;
