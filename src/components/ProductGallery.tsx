import React from 'react';
import ProductItem from './ProductItem';

const ProductGallery = () => {
  // Assumi di avere un array di prodotti da mostrare
  const products = [
    // ... i tuoi prodotti
  ];

  return (
    <div className="product-gallery">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGallery;
