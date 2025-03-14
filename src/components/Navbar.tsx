import React, { useState, useEffect } from 'react';
import ConnectWalletButton from './ConnectWalletButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Gestione dello scroll per cambiare l'aspetto della navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Blocca lo scroll quando il menu mobile è aperto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Navbar principale */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 bg-white shadow-md' : 'py-4 bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.png" alt="dApp Travel" className="h-8 w-auto" />
            <span className="ml-2 font-bold text-lg text-gray-800">dApp Travel</span>
          </div>
          
          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
            <a href="#destinations" className="text-gray-700 hover:text-blue-600 font-medium">Destinazioni</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium">Come Funziona</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Chi Siamo</a>
            <ConnectWalletButton />
          </div>
          
          {/* Menu hamburger per mobile */}
          <div className="flex md:hidden items-center">
            <ConnectWalletButton />
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="ml-4 w-10 h-10 flex items-center justify-center rounded-md focus:outline-none"
            >
              <svg 
                className="w-6 h-6 text-gray-700" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile a schermo intero */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white pt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col space-y-6 text-center">
              <a 
                href="#" 
                className="text-2xl font-bold text-gray-800 py-3"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a 
                href="#destinations" 
                className="text-2xl font-bold text-gray-800 py-3"
                onClick={() => setIsOpen(false)}
              >
                Destinazioni
              </a>
              <a 
                href="#how-it-works" 
                className="text-2xl font-bold text-gray-800 py-3"
                onClick={() => setIsOpen(false)}
              >
                Come Funziona
              </a>
              <a 
                href="#" 
                className="text-2xl font-bold text-gray-800 py-3"
                onClick={() => setIsOpen(false)}
              >
                Chi Siamo
              </a>
            </div>
            
            <div className="mt-12 flex justify-center">
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all"
              >
                Chiudi Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;