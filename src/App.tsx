import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductGallery from './components/ProductGallery';

function App() {
  const [provider] = useState(null);

  return (
    <div className="App">
      <Navbar />
      <ProductGallery provider={provider} />
    </div>
  );
}

export default App;