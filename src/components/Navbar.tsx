import React,{useState} from 'react';
import ConnectWalletButton from './ConnectWalletButton';

const Navbar = ({provider}) => {
  return (
    <nav className="w-full h-auto sticky top-0 z-10 bg-neutral-300 border-1 rounded-lg shadow-lg">
      <div className="container mx-auto transition-all duration-300 flex justify-between items-center p-4">
        <div>
          <img src="/logo.png" alt="Logo" className="h-16" />
        </div>
        <ConnectWalletButton />
      </div>
    </nav>
  );
};

export default Navbar;