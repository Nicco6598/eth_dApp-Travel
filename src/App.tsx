import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductGallery from './components/ProductGallery';
import { ProviderProvider } from './components/ProviderContext';
import Footer from './components/Footer';

function App() {

  return (
    <div className="App">
      <ProviderProvider>
        <Navbar />
        <ProductGallery />
        <Footer />
      </ProviderProvider>
    </div>
  );
}

export default App;