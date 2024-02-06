import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductGallery from './components/ProductGallery';
import { ProviderProvider } from './components/ProviderContext';

function App() {

  return (
    <div className="App">
      <ProviderProvider>
        <Navbar />
        <ProductGallery />
      </ProviderProvider>
    </div>
  );
}

export default App;