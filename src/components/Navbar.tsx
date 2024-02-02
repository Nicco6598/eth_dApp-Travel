import React from 'react';
import ConnectWalletButton from './ConnectWalletButton';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/path-to-your-logo.png" alt="Logo" className="h-8 mr-2" />
        </div>
        <ConnectWalletButton />
      </div>
    </nav>
  );
};

export default Navbar;
