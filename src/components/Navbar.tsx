
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Produk & Layanan', path: '/layanan' },
    { name: 'Solusi', path: '/solusi' }, // New section
    { name: 'Klien', path: '/klien' },   // New section
    { name: 'Artikel', path: '/artikel' },
    { name: 'Kontak', path: '/kontak' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  className="h-8 w-auto" 
                  src="/assets/logo.png" 
                  alt="Antlia Logo" 
                />
                <div className="ml-2">
                  <span className="block text-xl font-bold text-gray-800">Antlia</span>
                  <span className="block text-xs text-gray-500">Inclusive by Design, Powerful by Nature</span>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-white bg-antlia-blue'
                    : 'text-gray-600 hover:text-antlia-blue hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/kontak"
              className="ml-4 px-4 py-2 rounded-md bg-antlia-blue text-white text-sm font-medium transition-colors hover:bg-opacity-90"
            >
              Demo Gratis
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Buka menu utama</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? 'bg-antlia-blue text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/kontak"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center mt-3 px-4 py-2 rounded-md bg-antlia-blue text-white text-base font-medium"
          >
            Demo Gratis
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
