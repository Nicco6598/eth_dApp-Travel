import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { ethers } from 'ethers';
import ProductGallery from './components/ProductGallery';
import WalletBalance from './components/WalletBalance';
// ... (altro codice)

function App() {
  const [provider, setProvider] = useState(null);

  return (
    <div className="App">
      <Navbar />
      <ProductGallery provider={provider} />
    </div>
  );
}

export default App;