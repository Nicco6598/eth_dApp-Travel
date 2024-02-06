import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral-200 mt-24 mb-0 rounded-t-xl p-8">
      <div className="container mx-auto flex justify-center items-center">
        {/* Sezione dei social */}
        <div className="text-center mr-8">
          <h2 className="text-2xl font-semibold mb-4">Seguici sui social</h2>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-2xl text-primary-500 hover:text-primary-600 transition-all duration-300"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="#"
              className="text-2xl text-primary-500 hover:text-primary-600 transition-all duration-300"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-2xl text-primary-500 hover:text-primary-600 transition-all duration-300"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        
        {/* Riga verticale divisoria */}
        <div className="h-12 border-l border-neutral-400"></div>
        
        {/* Sezione dei contatti e newsletter */}
        <div className="text-center ml-8">
          <h2 className="text-2xl font-semibold mb-4">CONTATTI</h2>
          <p className="text-lg">Email: info@example.com</p>
          <p className="text-lg">Telefono: +123456789</p>
          <h2 className="text-2xl font-semibold mt-4 mb-4">Iscriviti alla Newsletter</h2>
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
