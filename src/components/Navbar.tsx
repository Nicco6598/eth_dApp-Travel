import React from 'react';
import ConnectWalletButton from './ConnectWalletButton';

const Navbar = () => {
  return (
    <nav className="w-full sticky top-0 z-10 bg-neutral-300 rounded-lg shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div>
          <img src="/logo.png" alt="Logo" className="h-16" />
        </div>
        <ConnectWalletButton />
      </div>
    </nav>
  );
};

export default Navbar;