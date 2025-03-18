import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 position-relative">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-4">
        
        <p className="text-s text-gray-200 p-2">
          &copy; {new Date().getFullYear()} HealthTracker. Alla rättigheter förbehållna.
        </p>

        <nav className="flex space-x-6 mt-3 md:mt-0 p-2">
          <a href="/privacy-policy" className="text-s text-gray-200 hover:text-white transition-colors duration-300">
            Integritetspolicy
          </a>
          <a href="/terms" className="text-m text-gray-200 hover:text-white transition-colors duration-300">
            Användarvillkor
          </a>
        </nav>

        
        <div className="flex space-x-4 mt-3 md:mt-0 p-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors duration-300">
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11 9.95V14.5H8v-3h3V9.5c0-3 2-4.5 4.8-4.5 1.4 0 2.5.1 2.5.1v2.9h-1.7c-1.7 0-2.1.8-2.1 2V11h3.6l-.5 3h-3.1v7A10 10 0 0022 12z"/></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors duration-300">
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.1.9 4.5 4.5 0 00-7.7 4.1A12.9 12.9 0 012 3s-4 9 5 13a13.1 13.1 0 01-7 2c9 5 20 0 20-11 0-.3 0-.6-.1-.9A7 7 0 0023 3z"/></svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors duration-300">
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm10 3a1 1 0 110 2 1 1 0 010-2zm-5 2a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
