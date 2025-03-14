import React, { useContext, useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import { ProviderContext } from './ProviderContext';
import { motion } from 'framer-motion';

const initialProducts = [
  {
    id: 1,
    name: 'Paradiso Maldiviano',
    description: 'Esperienza indimenticabile in un paradiso tropicale con acque cristalline e spiagge bianche.',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '1.3',
    available: 10,
    location: 'Maldive',
    duration: '7 giorni',
    rating: 4.9
  },
  {
    id: 2,
    name: 'Nuova Zelanda Estrema',
    description: 'Avventura nella terra di mezzo tra vette maestose, fiordi profondi e cultura Maori.',
    imageUrl: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '1.2',
    available: 3,
    location: 'Nuova Zelanda',
    duration: '12 giorni',
    rating: 4.7
  },
  {
    id: 3,
    name: 'Costa Ovest USA',
    description: 'Dalle spiagge di California ai parchi nazionali, scopri la bellezza selvaggia dell\'America.',
    imageUrl: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2099&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '2.12',
    available: 5,
    location: 'Stati Uniti',
    duration: '14 giorni',
    rating: 4.8
  },
  {
    id: 4,
    name: 'Scoperta del Giappone',
    description: 'Un viaggio tra tradizione e futuro, dalle antiche pagode di Kyoto ai grattacieli di Tokyo.',
    imageUrl: 'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '3.55',
    available: 2,
    location: 'Giappone',
    duration: '10 giorni',
    rating: 4.9
  }
];

const ProductGallery = () => {
  const { provider } = useContext(ProviderContext);
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('recommended');

  const handlePurchase = (productId) => {
    setProducts(currentProducts =>
      currentProducts.map(product =>
        product.id === productId ? { ...product, available: product.available - 1 } : product,
      ),
    );
  };

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true;
    if (filter === 'available') return product.available > 0;
    return product.location.toLowerCase() === filter.toLowerCase();
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'price-low') return parseFloat(a.price) - parseFloat(b.price);
    if (sortOrder === 'price-high') return parseFloat(b.price) - parseFloat(a.price);
    if (sortOrder === 'rating') return b.rating - a.rating;
    return 0; // Default is 'recommended'
  });

  const locations = [...new Set(products.map(p => p.location))];

  return (
    <section id="destinations" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="section-title">Esplora le Destinazioni</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Scopri esperienze di viaggio uniche pagabili con criptovalute. Ogni destinazione è stata selezionata con cura per offrirti un'avventura indimenticabile.
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tutti
          </button>
          <button 
            onClick={() => setFilter('available')} 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'available' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Disponibili
          </button>
          
          {locations.map(location => (
            <button 
              key={location}
              onClick={() => setFilter(location)} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === location ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {location}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-4 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          >
            <option value="recommended">Consigliati</option>
            <option value="price-low">Prezzo: Basso-Alto</option>
            <option value="price-high">Prezzo: Alto-Basso</option>
            <option value="rating">Valutazione</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {sortedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductItem product={product} onPurchase={handlePurchase} />
          </motion.div>
        ))}
      </div>
      
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nessun prodotto trovato con i filtri correnti.</p>
          <button 
            onClick={() => setFilter('all')}
            className="mt-4 btn-secondary"
          >
            Mostra Tutti
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductGallery;