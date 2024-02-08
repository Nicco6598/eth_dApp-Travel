import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral-200 mt-24 mb-0 rounded-t-xl p-8">
      <div className="container mx-auto flex justify-center items-center">
        {/* Sezione dei social */}
        <div className="text-center mr-8">
          <h2 className="text-2xl font-bold mb-4">Seguici Sui Social</h2>
          <div className="flex space-x-4 justify-center">
            <a
              href="#"
              className="text-2xl text-primary-500 hover:text-primary-600 transition-all duration-300"
            >
              <img src="https://cdn4.iconfinder.com/data/icons/miu-black-social-2/60/facebook-512.png" className="w-8 hover:animate-bounce transition-all duration-300" alt="Facebook" />
            </a>
            <a
              href="#"
              className="text-2xl text-primary-500 hover:text-primary-600 transition-all duration-300"
            >
              <img src="https://cdn2.iconfinder.com/data/icons/threads-by-instagram/24/x-logo-twitter-new-brand-contained-512.png" className="w-8 hover:animate-bounce transition-all duration-300" alt="X" />
            </a>
            <a
              href="#"
              className="text-2xl text-primary-500 hover:text-primary-600 transition-all duration-300"
            >
              <img src="https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Instagram_svg-512.png" className="w-8 hover:animate-bounce transition-all duration-300" alt="Instagram" />
            </a>
            <a
              href="#"
              className="text-2xl text-primary-500 hover:text-primary-600 transition-all duration-300"
            >
              <img src="https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Pinterest_svg-512.png" className="w-8 hover:animate-bounce transition-all duration-300" alt="Instagram" />
            </a>
          </div>
        </div>
        
        {/* Riga verticale divisoria */}
        <div className="h-12 border-l border-neutral-400"></div>
        
        {/* Sezione dei contatti e newsletter */}
        <div className="text-center ml-8">
          <h2 className="text-2xl font-bold mb-4">CONTATTI</h2>
          <p className="text-lg font-semibold text-gray-950">Email: esempio@esempio.com</p>
          <p className="text-lg font-semibold text-gray-950">Telefono: +3900000000</p>
          <h2 className="text-2xl font-bold mt-4 mb-4">NEWSLETTER</h2>
          <form>
            <input
              type="email"
              placeholder="Indirizzo Email"
              className="border border-amber-500 hover:border-amber-700 rounded-2xl py-2 px-4 w-40"
            />
            <button
              type="submit"
              className="bg-amber-500 mt-4 text-white py-2 px-4 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-amber-700 lg:mt-0 ml-4 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Iscriviti
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
