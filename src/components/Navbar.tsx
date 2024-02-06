import React,{useState} from 'react';
import ConnectWalletButton from './ConnectWalletButton';

const Navbar = () => {
  return (
    <nav className="sticky top-4 justify-items-center z-10 bg-neutral-200 border-2 rounded-2xl shadow-[rgba(0,_0,_0,_0.4)_0px_20px_90px]">
      <div className="container mx-auto max-w-screen-xl transition-all duration-300 flex justify-between items-center p-4">
        <div>
          <img src="/logo.png" alt="Logo" className="w-24" />
        </div>
        <ConnectWalletButton />
      </div>
    </nav>
  );
};

export default Navbar;
